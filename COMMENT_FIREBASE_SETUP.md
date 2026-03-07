# Comments: Firebase Auth + Firestore Setup

This guide gets the comments form using **Google (and Apple) sign-in** and **Firestore** for storage, with optional nickname and anonymous posting.

## 1. Create a Firebase project

1. Go to [Firebase Console](https://console.firebase.google.com/) and create a project (or use an existing one).
2. Add a **Web** app: Project settings → Your apps → Add app → Web. Copy the config object.

## 2. Enable Authentication

1. In the console, open **Build → Authentication** and click **Get started**.
2. **Sign-in method** tab:
   - Enable **Google** (no extra config needed for testing).
   - For **Apple**: enable Apple, add your Apple Developer Service ID and key as per [Firebase Apple docs](https://firebase.google.com/docs/auth/web/apple). Apple is optional; the form works with Google only.

## 3. Create Firestore database

1. **Build → Firestore Database** → Create database.
2. Choose **Start in test mode** for quick setup (restrict rules before going live).
3. Deploy the rules from this repo: copy the contents of `firestore.rules` into the Firestore **Rules** tab in the console, then Publish.

## 4. Wire config into the site

1. Open **Oct25thGameNight/firebase-config.js**.
2. Replace the placeholder values in `FIREBASE_CONFIG` with your project’s config from step 1.
3. Set **`FIREBASE_ENABLED = true`** when you’re ready to use Firebase.

```js
window.FIREBASE_CONFIG = {
  apiKey: "your-real-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123:web:abc",
};
window.FIREBASE_ENABLED = true;
```

## 5. Behavior summary

- **Anonymous**: Leave nickname blank and submit → comment is stored with nickname `"Anonymous"` and no `uid`.
- **With nickname**: User must sign in (Google or Apple). Nickname is checked for uniqueness in the `nicknames` collection; if taken by another user, they see: *"This nickname is already taken, please choose another."* Comments are stored with `uid` for a future “My Comments” dashboard.
- **Firestore**: Comments live in the `comments` collection; nickname claims in `nicknames`. See `firestore.rules` for read/write rules.

## 6. Optional: restrict Firestore before production

Tighten rules as needed (e.g. require auth for creating comments if you want to block anonymous writes). The provided rules allow public read and create for comments, and only authenticated users can claim nicknames.
