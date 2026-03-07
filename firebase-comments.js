/**
 * Firebase Comments: Auth (Google + Apple) and Firestore for comments with optional nickname and uniqueness.
 */
(function () {
  var app = null;
  var auth = null;
  var db = null;

  function isConfigured() {
    return (
      window.FIREBASE_ENABLED &&
      window.FIREBASE_CONFIG &&
      window.FIREBASE_CONFIG.apiKey &&
      window.FIREBASE_CONFIG.apiKey !== "YOUR_API_KEY"
    );
  }

  function init() {
    if (!isConfigured()) return Promise.resolve(false);
    try {
      app = firebase.app();
      auth = firebase.auth();
      db = firebase.firestore();
    } catch (e) {
      app = firebase.initializeApp(window.FIREBASE_CONFIG);
      auth = firebase.auth();
      db = firebase.firestore();
    }
    setupAuthUI();
    if (typeof window.onCommentsAuthReady === "function") window.onCommentsAuthReady();
    return Promise.resolve(true);
  }

  function setupAuthUI() {
    var claimPrompt = document.getElementById("authClaimPrompt");
    var authStatus = document.getElementById("authStatus");
    var authStatusText = document.getElementById("authStatusText");
    var nicknameInput = document.getElementById("anonymousNickname");
    var googleBtn = document.getElementById("authGoogleBtn");
    var appleBtn = document.getElementById("authAppleBtn");
    var signOutBtn = document.getElementById("authSignOutBtn");

    function updateAuthUI(user) {
      if (!claimPrompt || !authStatus) return;
      var hasNickname = nicknameInput && nicknameInput.value.trim().length > 0;
      if (user) {
        claimPrompt.hidden = true;
        authStatus.hidden = false;
        if (authStatusText) authStatusText.textContent = "Signed in as " + (user.displayName || user.email || "you");
      } else {
        authStatus.hidden = true;
        claimPrompt.hidden = !hasNickname;
      }
    }

    if (auth) {
      auth.onAuthStateChanged(function (user) {
        updateAuthUI(user);
      });
    }

    if (nicknameInput) {
      nicknameInput.addEventListener("input", function () {
        var user = auth ? auth.currentUser : null;
        var hasNickname = nicknameInput.value.trim().length > 0;
        if (!user && hasNickname && claimPrompt) claimPrompt.hidden = false;
        else if (user || !hasNickname) if (claimPrompt) claimPrompt.hidden = true;
        if (user && authStatus) {
          authStatus.hidden = false;
          if (authStatusText) authStatusText.textContent = "Signed in as " + (user.displayName || user.email || "you");
        }
      });
    }

    if (googleBtn && auth) {
      googleBtn.addEventListener("click", function () {
        var provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider).catch(function (err) {
          console.error("Google sign-in error", err);
          if (typeof window.showCommentsError === "function") window.showCommentsError(err.message || "Sign-in failed.");
        });
      });
    }

    if (appleBtn && auth) {
      appleBtn.addEventListener("click", function () {
        var provider = new firebase.auth.OAuthProvider("apple.com");
        auth.signInWithPopup(provider).catch(function (err) {
          console.error("Apple sign-in error", err);
          if (typeof window.showCommentsError === "function") window.showCommentsError(err.message || "Sign-in failed.");
        });
      });
    }

    if (signOutBtn && auth) {
      signOutBtn.addEventListener("click", function () {
        auth.signOut();
      });
    }
  }

  function normalizeNickname(str) {
    return (str || "").trim().toLowerCase().replace(/\s+/g, "");
  }

  function submitComment(payload) {
    if (!db || !auth) return Promise.reject(new Error("Firebase not initialized"));
    var nickname = (payload.nickname || "").trim();
    var text = (payload.text || "").trim();
    var parentId = payload.parentId || null;
    var user = auth.currentUser;

    if (!text) return Promise.reject(new Error("Comment text is required."));

    var isAnonymous = nickname.length === 0;
    if (isAnonymous) {
      return addCommentToFirestore({
        nickname: "Anonymous",
        text: text,
        parentId: parentId,
        uid: null,
      });
    }

    if (!user) {
      return Promise.reject(new Error("Log in to claim this nickname and track your comment."));
    }

    var normalized = normalizeNickname(nickname);
    if (!normalized) return Promise.reject(new Error("Please enter a valid nickname."));

    var nickRef = db.collection("nicknames").doc(normalized);
    return nickRef.get().then(function (snap) {
      if (snap.exists) {
        var existingUid = snap.data().uid;
        if (existingUid !== user.uid) {
          return Promise.reject(new Error("This nickname is already taken, please choose another."));
        }
      } else {
        return nickRef.set({ uid: user.uid, nickname: nickname.trim() });
      }
    }).then(function () {
      return addCommentToFirestore({
        nickname: nickname.trim(),
        text: text,
        parentId: parentId,
        uid: user.uid,
      });
    });
  }

  function addCommentToFirestore(data) {
    var ref = db.collection("comments").doc();
    var doc = {
      id: ref.id,
      parentId: data.parentId || null,
      nickname: data.nickname || "Anonymous",
      text: data.text,
      time: firebase.firestore.FieldValue.serverTimestamp(),
      uid: data.uid || null,
    };
    return ref.set(doc).then(function () {
      return { id: ref.id, ...doc, time: new Date().toISOString() };
    });
  }

  function loadComments(callback) {
    if (!db || typeof callback !== "function") return;
    db.collection("comments")
      .orderBy("time", "asc")
      .onSnapshot(
        function (snap) {
          var list = [];
          snap.docs.forEach(function (d) {
            var data = d.data();
            var ratings = data.ratings;
            if (ratings && typeof ratings === "object" && !Array.isArray(ratings)) {
              ratings = Object.assign({}, ratings);
            } else {
              ratings = {};
            }
            list.push({
              id: data.id || d.id,
              parentId: data.parentId || null,
              nickname: data.nickname || "Anonymous",
              text: data.text || "",
              time: data.time && data.time.toDate ? data.time.toDate().toISOString() : new Date().toISOString(),
              ratings: ratings,
            });
          });
          callback(list);
        },
        function (err) {
          console.error("Firestore comments snapshot error", err);
          callback([]);
        }
      );
  }

  function rateDiscussion(commentId, score) {
    if (!db || !auth) return Promise.reject(new Error("Firebase not initialized"));
    var user = auth.currentUser;
    if (!user) return Promise.reject(new Error("Sign in to rate discussions."));
    var num = Math.max(1, Math.min(5, parseInt(score, 10)));
    if (num !== num) return Promise.reject(new Error("Invalid rating."));
    var ref = db.collection("comments").doc(commentId);
    var key = "ratings." + user.uid;
    var update = {};
    update[key] = num;
    return ref.set(update, { merge: true });
  }

  window.CommentsAuth = {
    init: init,
    isConfigured: isConfigured,
    submitComment: submitComment,
    loadComments: loadComments,
    rateDiscussion: rateDiscussion,
    getCurrentUser: function () {
      return auth ? auth.currentUser : null;
    },
  };
})();
