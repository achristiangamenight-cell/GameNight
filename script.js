const demoMode = false;

const flowState = {
  agendaVisible: false,
  surveyVisible: false,
  teamVisible: true,
  precheckComplete: false,
  checkinComplete: false,
};

const unlockDate = new Date("2025-10-25T18:00:00-04:00");

document.addEventListener("DOMContentLoaded", () => {
  setupFloatingGallery();
  setupForm();
  setupPreForm();
  setupFeedbackForm();
  setupAnonymousQuestionForm();
  setupLightbox();
  setupCTAButtons();
  setupNav();
  setupPastMedia();
  forceHeadcountActive();
  checkTimeUnlocks();
  setupAgendaAccordion();
  if (demoMode) {
    enableDemoMode();
  }
});

const galleryImages = [
  "IMG-20251011-WA0011.jpg",
  "IMG-20251011-WA0014.jpg",
  "IMG-20251011-WA0017.jpg",
  "IMG-20251011-WA0018.jpg",
  "IMG-20251011-WA0019.jpg",
  "IMG-20251011-WA0020.jpg",
  "IMG-20251011-WA0021.jpg",
  "IMG-20251011-WA0022.jpg",
  "IMG-20251011-WA0023.jpg",
  "IMG-20251011-WA0024.jpg",
  "IMG-20251011-WA0025.jpg",
  "IMG-20251011-WA0026.jpg",
  "IMG-20251011-WA0027.jpg",
  "IMG-20251011-WA0028.jpg",
  "IMG-20251011-WA0029.jpg",
  "IMG-20251011-WA0030.jpg",
  "IMG-20251011-WA0031.jpg",
  "IMG-20251011-WA0032.jpg",
  "IMG-20251011-WA0033.jpg",
  "IMG-20251011-WA0034.jpg",
  "IMG-20251011-WA0035.jpg",
  "IMG-20251011-WA0036.jpg",
  "IMG-20251011-WA0037.jpg",
  "IMG-20251011-WA0038.jpg",
  "IMG-20251011-WA0039.jpg",
  "IMG-20251011-WA0040.jpg",
];

const pastMedia = [
  { type: "image", src: "IMG-20251011-WA0011.jpg" },
  { type: "image", src: "IMG-20251011-WA0014.jpg" },
  { type: "image", src: "IMG-20251011-WA0017.jpg" },
  { type: "image", src: "IMG-20251011-WA0018.jpg" },
  { type: "image", src: "IMG-20251011-WA0021.jpg" },
  { type: "image", src: "IMG-20251011-WA0022.jpg" },
  { type: "image", src: "IMG-20251011-WA0025.jpg" },
  { type: "image", src: "IMG-20251011-WA0026.jpg" },
  { type: "image", src: "IMG-20251011-WA0027.jpg" },
  { type: "image", src: "IMG-20251011-WA0028.jpg" },
  { type: "image", src: "IMG-20251011-WA0029.jpg" },
  { type: "image", src: "IMG-20251011-WA0033.jpg" },
  { type: "image", src: "IMG-20251011-WA0034.jpg" },
  { type: "image", src: "IMG-20251011-WA0035.jpg" },
  { type: "image", src: "IMG-20251011-WA0036.jpg" },
  { type: "image", src: "IMG-20251011-WA0037.jpg" },
  { type: "image", src: "IMG-20251011-WA0038.jpg" },
  { type: "image", src: "IMG-20251011-WA0039.jpg" },
  { type: "image", src: "IMG-20251011-WA0040.jpg" },
  { type: "video", src: "VID-20251011-WA0003.mp4" },
  { type: "video", src: "VID-20251011-WA0004.mp4" },
  { type: "video", src: "VID-20251011-WA0005.mp4" },
  { type: "video", src: "VID-20251011-WA0006.mp4" },
  { type: "video", src: "VID-20251011-WA0007.mp4" },
  { type: "video", src: "VID-20251011-WA0008.mp4" },
  { type: "video", src: "VID-20251011-WA0009.mp4" },
  { type: "video", src: "VID-20251011-WA0010.mp4" },
  { type: "video", src: "VID-20251011-WA0011.mp4" },
  { type: "video", src: "VID-20251011-WA0012.mp4" },
  { type: "video", src: "VID-20251011-WA0013.mp4" },
  { type: "video", src: "VID-20251011-WA0014.mp4" },
  { type: "video", src: "VID-20251011-WA0015.mp4" },
  { type: "video", src: "VID-20251011-WA0016.mp4" },
  { type: "video", src: "VID-20251011-WA0017.mp4" },
  { type: "image", src: "Walk picture.jpg" },
];

let pastMediaItems = [];
let currentMediaIndex = 0;

function setupFloatingGallery() {
  const gallery = document.getElementById("floatingGallery");
  if (!gallery) return;

  galleryImages.forEach((src) => {
    const button = document.createElement("button");
    button.type = "button";
    const img = document.createElement("img");
    img.src = src;
    img.alt = "Game night moment";
    button.appendChild(img);
    button.addEventListener("click", () => openLightbox(src));
    gallery.appendChild(button);
  });
}

function setupForm() {
  const form = document.getElementById("checkInForm");
  const churchSelect = document.getElementById("churchSelect");
  const otherChurchField = document.getElementById("otherChurchField");
  const formStatus = document.getElementById("formStatus");
  const agendaSection = document.getElementById("agenda");
  const agendaTrigger = document.getElementById("agendaTrigger");
  const surveySection = document.getElementById("survey");

  if (!form || !churchSelect || !otherChurchField) return;

  const toggleOtherField = () => {
    if (churchSelect.value === "other") {
      otherChurchField.classList.add("visible");
      otherChurchField.querySelector("input").setAttribute("required", "");
    } else {
      otherChurchField.classList.remove("visible");
      otherChurchField.querySelector("input").removeAttribute("required");
    }
  };

  churchSelect.addEventListener("change", toggleOtherField);
  toggleOtherField();

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    formStatus.textContent = "Thanks! Scroll to see tonight's agenda.";
    agendaSection.classList.remove("hidden");
    agendaSection.setAttribute("aria-hidden", "false");
    flowState.agendaVisible = true;

    agendaSection.scrollIntoView({ behavior: "smooth" });

    setTimeout(() => {
      form.reset();
      toggleOtherField();
    }, 400);
  });
}

function setupCTAButtons() {
  const agendaTrigger = document.getElementById("agendaTrigger");
  const surveyTrigger = document.getElementById("surveyTrigger");
  const surveySection = document.getElementById("survey");
  const teamSection = document.getElementById("team");

  if (agendaTrigger) {
    agendaTrigger.hidden = false;
    agendaTrigger.addEventListener("click", () => {
      surveySection.scrollIntoView({ behavior: "smooth" });
    });
  }

  if (surveyTrigger) {
    surveyTrigger.hidden = false;
    surveyTrigger.addEventListener("click", () => {
      teamSection.classList.remove("hidden");
      teamSection.setAttribute("aria-hidden", "false");
      teamSection.scrollIntoView({ behavior: "smooth" });
    });
  }
}

function setupNav() {
  const navLinks = document.querySelectorAll(".site-nav a");

  if (!navLinks.length) return;

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href").replace("#", "");

      if (!targetId) return;
      const destination = document.getElementById(targetId);
      if (!destination) return;
      event.preventDefault();
      destination.scrollIntoView({ behavior: "smooth" });
    });
  });
}

function setupAgendaAccordion() {
  const items = document.querySelectorAll(".agenda-item");
  if (!items.length) return;

  items.forEach((item, index) => {
    const summary = item.querySelector(".agenda-summary");
    if (!summary) return;

    summary.addEventListener("click", () => {
      const isActive = item.classList.contains("active");
      items.forEach((other) => other.classList.remove("active"));
      if (!isActive) {
        item.classList.add("active");
      }
    });

    if (index === 0) {
      item.classList.add("active");
    }
  });
}

function nudgeElement(element) {
  if (!element) return;
  element.classList.add("pulse");
  setTimeout(() => {
    element.classList.remove("pulse");
  }, 2400);
}

function enableDemoMode() {
  flowState.agendaVisible = true;
  flowState.surveyVisible = true;
  flowState.teamVisible = true;
  flowState.precheckComplete = true;
  flowState.checkinComplete = true;

  const formStatus = document.getElementById("formStatus");
  const preFormStatus = document.getElementById("preFormStatus");
  const preCheckSection = document.getElementById("pre-check");
  const agendaSection = document.getElementById("agenda");
  const surveySection = document.getElementById("survey");
  const teamSection = document.getElementById("team");
  const agendaTrigger = document.getElementById("agendaTrigger");
  const surveyTrigger = document.getElementById("surveyTrigger");

  unlockSection(preCheckSection);
  [agendaSection, surveySection, teamSection].forEach((section) => {
    if (!section) return;
    unlockSection(section);
  });

  if (agendaTrigger) agendaTrigger.hidden = false;
  if (surveyTrigger) surveyTrigger.hidden = false;
  if (preFormStatus) {
    preFormStatus.textContent = "Demo mode: sections unlocked for preview.";
  }
  if (formStatus) {
    formStatus.textContent = "Demo mode: all sections unlocked for preview.";
  }
}

function setupPreForm() {
  const preForm = document.getElementById("preCheckForm");
  const preStatus = document.getElementById("preFormStatus");
  const checkInSection = document.getElementById("check-in");
  const countdown = document.getElementById("eventCountdown");

  if (!preForm) return;

  startCountdown(countdown);

  preForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!preForm.checkValidity()) {
      preForm.reportValidity();
      return;
    }

    const payload = new FormData(preForm);

    fetch(
      "https://docs.google.com/forms/d/e/1FAIpQLScJrmJPsAhbVvI9aB312jEgprBz4IGrid7bIGaZBZuvF90PNQ/formResponse",
      {
        method: "POST",
        mode: "no-cors",
        body: payload,
      }
    )
      .then(() => {
        preForm.reset();
        flowState.precheckComplete = true;
        if (preStatus) {
          preStatus.textContent = "Thanks for pre-checking! Scroll down when you arrive.";
        }
      })
      .catch(() => {
        if (preStatus) {
          preStatus.textContent = "We couldn’t submit. Please try again.";
        }
      });
  });
}

function setupFeedbackForm() {
  const feedbackForm = document.getElementById("feedbackForm");
  const formStatus = document.getElementById("feedbackFormStatus");

  if (!feedbackForm) return;

  feedbackForm.addEventListener("submit", (event) => {
    event.preventDefault();
    
    if (!feedbackForm.checkValidity()) {
      feedbackForm.reportValidity();
      return;
    }

    // Get form data
    const formData = new FormData(feedbackForm);

    // Extract values and convert ratings to integers
    const overallRating = parseInt(formData.get("entry.123456789"), 10);
    const gamesRating = parseInt(formData.get("entry.987654321"), 10);
    const adviceRating = parseInt(formData.get("entry.456789123"), 10);
    const suggestions = formData.get("entry.789123456") || "";

    // Validate ratings are between 1-5
    if (!overallRating || overallRating < 1 || overallRating > 5) {
      if (formStatus) {
        formStatus.textContent = "Please select a rating for all required questions.";
        formStatus.style.color = "var(--accent-red)";
      }
      return;
    }

    if (!gamesRating || gamesRating < 1 || gamesRating > 5) {
      if (formStatus) {
        formStatus.textContent = "Please select a rating for all required questions.";
        formStatus.style.color = "var(--accent-red)";
      }
      return;
    }

    if (!adviceRating || adviceRating < 1 || adviceRating > 5) {
      if (formStatus) {
        formStatus.textContent = "Please select a rating for all required questions.";
        formStatus.style.color = "var(--accent-red)";
      }
      return;
    }

    // Prepare JSON payload with keyword matching
    // The API uses keyword matching, so keys must match words in your Google Form questions
    const payload = {
      // Map ratings - adjust keys to match your form question keywords
      overallRating: overallRating.toString(),
      gamesRating: gamesRating.toString(),
      adviceRating: adviceRating.toString(),
      // Map suggestions - use "suggestion" (singular) to match your form
      suggestion: suggestions.trim()
      // Add other fields if your form has them:
      // test: "...", // If form has "Test" question
      // email: "...", // If form has "Email" question
    };

    // Log the payload being sent
    console.log("Submitting feedback with payload:", payload);
    console.log("JSON string:", JSON.stringify(payload));

    // Show loading state
    if (formStatus) {
      formStatus.textContent = "Submitting...";
      formStatus.style.color = "var(--accent-gold)";
    }

    // Submit to Google Apps Script Web App
    fetch(
      "https://script.google.com/macros/s/AKfycbz85O_VsHcgKhDJXEXHvhuK76rmiOIHo4ehI_z70BwLF0nZor8tQxC-SHUxIm9aHZu6zg/exec",
      {
        method: "POST",
        mode: "no-cors", // distinct mode for testing from console
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    )
      .then(() => {
        console.log("✓ Successfully submitted feedback!");
        console.log("Submitted data:", payload);
        
        // Reset form
        feedbackForm.reset();
        
        // Show success message
        if (formStatus) {
          formStatus.textContent = "✓ Thank you for your feedback!";
          formStatus.style.color = "var(--accent-gold)";
          formStatus.style.fontSize = "1.1rem";
          formStatus.style.fontWeight = "700";
          formStatus.style.padding = "1.2rem";
          formStatus.style.backgroundColor = "rgba(246, 204, 101, 0.15)";
          formStatus.style.borderRadius = "12px";
          formStatus.style.border = "2px solid var(--accent-gold)";
          formStatus.style.boxShadow = "0 4px 12px rgba(246, 204, 101, 0.3)";
        }
        
        // Reset status message after 8 seconds
        setTimeout(() => {
          if (formStatus) {
            formStatus.textContent = "";
            formStatus.style.backgroundColor = "";
            formStatus.style.border = "";
            formStatus.style.padding = "";
            formStatus.style.boxShadow = "";
          }
        }, 8000);
      })
      .catch((error) => {
        console.error("✗ Error submitting feedback");
        console.error("Error details:", error);
        console.error("Failed data:", payload);
        
        if (formStatus) {
          formStatus.textContent = "We couldn't submit. Please try again.";
          formStatus.style.color = "var(--accent-red)";
          formStatus.style.fontSize = "1.1rem";
          formStatus.style.fontWeight = "700";
          formStatus.style.padding = "1.2rem";
          formStatus.style.backgroundColor = "rgba(255, 77, 79, 0.15)";
          formStatus.style.borderRadius = "12px";
          formStatus.style.border = "2px solid var(--accent-red)";
          formStatus.style.boxShadow = "0 4px 12px rgba(255, 77, 79, 0.3)";
        }
      });
  });
}

/**
 * Submit data to Google Apps Script Web App using keyword matching
 * The script uses keyword matching to find the right questions.
 * For example, {"test": "..."} will find the question containing 'test'
 * 
 * @param {Object} data - JSON object with keys matching form question keywords
 *   Example: { test: "user input", email: "user@example.com" }
 * @returns {Promise} - Promise that resolves/rejects based on submission result
 */
function submitToNewForm(data) {
  const apiEndpoint = "https://script.google.com/macros/s/AKfycbyaurrLEIMThfBMhFRDssAkRDejY9kqEWySNnak7cJJoz_aj78GzH6qBtXD1CtRh2NCgw/exec";

  // Log the data being sent
  console.log("Submitting to form with data:", data);
  console.log("JSON payload:", JSON.stringify(data));

  return fetch(apiEndpoint, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(() => {
      // Success - log the successful submission
      console.log("✓ Successfully submitted to form");
      console.log("Submitted data:", data);
      return { success: true, data };
    })
    .catch((error) => {
      // Error - log the error details
      console.error("✗ Error submitting to form");
      console.error("Error details:", error);
      console.error("Failed data:", data);
      throw error;
    });
}

/**
 * Submit form data to Google Apps Script Web App
 * @param {string} userInput - The user's input text
 * @returns {Promise} - Promise that resolves/rejects based on submission result
 */
function submitForm(userInput) {
  const apiEndpoint = "https://script.google.com/macros/s/AKfycbz8JxQF7nuqKoQjMF_6AanhQhzaduEsGbXASpuNTvt2a9TLxLTBBa5n4wUEtUIZ13KQ/exec";

  // Prepare JSON payload with myInput key (CRITICAL: must use exact key "myInput")
  const payload = {
    myInput: userInput.trim()
  };

  // Log the submission/debug step
  console.log("Starting submission with:", payload);
  console.log("JSON string:", JSON.stringify(payload));

  // Send POST request with no-cors mode to avoid browser cross-origin errors
  return fetch(apiEndpoint, {
    method: "POST",
    mode: "no-cors", // Prevents browser cross-origin errors
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then(() => {
      console.log("Request sent successfully!");
      console.log("Submitted data:", payload);
      return { success: true, data: payload };
    })
    .catch((error) => {
      console.error("✗ Error submitting form");
      console.error("Error details:", error);
      console.error("Failed data:", payload);
      throw error;
    });
}

function setupAnonymousQuestionForm() {
  const anonymousForm = document.getElementById("anonymousQuestionForm");
  const formStatus = document.getElementById("anonymousFormStatus");
  const submitButton = anonymousForm?.querySelector('button[type="submit"]');
  const textarea = document.getElementById("anonymousQuestion");
  let isLoading = false;

  if (!anonymousForm) return;

  anonymousForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    
    if (!anonymousForm.checkValidity()) {
      anonymousForm.reportValidity();
      return;
    }

    if (isLoading) return;
    isLoading = true;

    // Get form data
    const formData = new FormData(anonymousForm);
    const userInput = formData.get("entry.111111111") || "";

    // Validate that input is not empty
    if (!userInput.trim()) {
      if (formStatus) {
        formStatus.textContent = "Please enter your comment before submitting.";
        formStatus.style.color = "var(--accent-red)";
      }
      return;
    }

    // Disable button and show loading state
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.style.opacity = "0.6";
      submitButton.style.cursor = "not-allowed";
      const originalText = submitButton.textContent;
      submitButton.textContent = "Sending...";
    }

    // Show loading message
    if (formStatus) {
      formStatus.textContent = "Submitting your comment...";
      formStatus.style.color = "var(--accent-gold)";
      formStatus.style.fontSize = "1rem";
      formStatus.style.fontWeight = "600";
      formStatus.style.padding = "1rem";
      formStatus.style.backgroundColor = "rgba(246, 204, 101, 0.1)";
      formStatus.style.borderRadius = "8px";
      formStatus.style.display = "block";
      formStatus.style.visibility = "visible";
      formStatus.style.opacity = "1";
    }

    // Debug log before submission
    console.log("Starting submission with:", userInput.trim());

    try {
      // Submit using the submitForm function
      await submitForm(userInput);
      
      // Reset form on success
      anonymousForm.reset();
      
      // Re-enable button
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.style.opacity = "1";
        submitButton.style.cursor = "pointer";
        submitButton.textContent = "Submit Comment";
      }
      
      // Show success message
      if (formStatus) {
        formStatus.textContent = "✓ Success! Your comment has been submitted anonymously.";
        formStatus.style.color = "var(--accent-gold)";
        formStatus.style.fontSize = "1.1rem";
        formStatus.style.fontWeight = "700";
        formStatus.style.padding = "1.2rem";
        formStatus.style.backgroundColor = "rgba(246, 204, 101, 0.15)";
        formStatus.style.borderRadius = "12px";
        formStatus.style.border = "2px solid var(--accent-gold)";
        formStatus.style.boxShadow = "0 4px 12px rgba(246, 204, 101, 0.3)";
        
        // Scroll to status message to ensure it's visible
        formStatus.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
      
      // Success message is shown on-page, no pop-up needed
      
        // Keep message visible for 8 seconds, then fade out
      setTimeout(() => {
        if (formStatus) {
          formStatus.style.transition = "opacity 0.5s ease, transform 0.5s ease";
          formStatus.style.opacity = "0";
          formStatus.style.transform = "translateY(-10px)";
          setTimeout(() => {
            if (formStatus) {
              formStatus.textContent = "";
              formStatus.style.opacity = "1";
              formStatus.style.transform = "translateY(0)";
              formStatus.style.backgroundColor = "";
              formStatus.style.border = "";
              formStatus.style.padding = "";
              formStatus.style.boxShadow = "";
            }
          }, 500);
        }
      }, 8000);
      
    } catch (error) {
      console.error("Error submitting anonymous question:", error);
      
      // Re-enable button on error
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.style.opacity = "1";
        submitButton.style.cursor = "pointer";
        submitButton.textContent = "Submit Comment";
      }
      
      // Show error message
      if (formStatus) {
        formStatus.textContent = "✗ Error: We couldn't submit your comment. Please try again.";
        formStatus.style.color = "var(--accent-red)";
        formStatus.style.fontSize = "1.1rem";
        formStatus.style.fontWeight = "700";
        formStatus.style.padding = "1.2rem";
        formStatus.style.backgroundColor = "rgba(255, 77, 79, 0.15)";
        formStatus.style.borderRadius = "12px";
        formStatus.style.border = "2px solid var(--accent-red)";
        formStatus.style.boxShadow = "0 4px 12px rgba(255, 77, 79, 0.3)";
        
        // Scroll to status message
        formStatus.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    } finally {
      isLoading = false;
    }
  });
}

function unlockSection(section) {
  if (!section) return;
  section.classList.remove("hidden");
  section.setAttribute("aria-hidden", "false");
  if (section.hasAttribute("data-gated")) {
    section.classList.remove("locked", "locked-active");
  }
}

const formReveal = (section) => {
  if (!section) return;
  section.classList.remove("locked");
};

const lockSection = (section, message) => {
  if (!section) return;
  if (message) {
    section.setAttribute("data-locked-message", message);
  }
  section.classList.add("locked", "locked-active");
  section.setAttribute("aria-hidden", "true");
};

function forceHeadcountActive() {
  const pre = document.getElementById("pre-check");
  if (!pre) return;
  pre.classList.remove("locked", "locked-active");
  pre.removeAttribute("data-locked-message");
  pre.setAttribute("aria-hidden", "false");
}

function checkTimeUnlocks() {
  if (localStorage.getItem("unlockTimeReached") === "true") {
    unlockAfterEvent();
    return;
  }
  const now = new Date();
  if (now >= unlockDate) {
    unlockAfterEvent();
    return;
  }

  const msUntilUnlock = unlockDate.getTime() - now.getTime();
  setTimeout(unlockAfterEvent, msUntilUnlock);

  const sections = [
    document.getElementById("check-in"),
    document.getElementById("agenda"),
    document.getElementById("survey"),
  ];

  sections.forEach((section) => {
    if (!section) return;
    // Explicitly exclude pre-check from locking
    if (section.id === "pre-check") return;
    lockSection(section, "Unlocks at 6:00 PM on Oct 25");
  });
}

function unlockAfterEvent() {
  const sectionsToUnlock = [
    document.getElementById("check-in"),
    document.getElementById("agenda"),
    document.getElementById("survey"),
  ];

  sectionsToUnlock.forEach((section) => {
    if (!section) return;
    section.classList.remove("locked", "locked-active");
    section.setAttribute("aria-hidden", "false");
    section.removeAttribute("data-locked-message");
  });

  flowState.agendaVisible = true;
  flowState.surveyVisible = true;
  flowState.precheckComplete = true;
  flowState.checkinComplete = true;

  localStorage.setItem("unlockTimeReached", "true");
}

function startCountdown(display) {
  if (!display) return;
  const eventDate = new Date("2025-10-25T18:00:00-04:00").getTime();
  const valueEl = display.querySelector(".countdown-value");

  const updateCountdown = () => {
    const now = Date.now();
    const distance = eventDate - now;

    if (distance <= 0) {
      if (valueEl) {
        valueEl.textContent = "It’s Game Night!";
      } else {
        display.textContent = "It’s Game Night!";
      }
      clearInterval(timer);
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const formatted = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    if (valueEl) {
      valueEl.textContent = formatted;
    } else {
      display.textContent = formatted;
    }
  };

  updateCountdown();
  const timer = setInterval(updateCountdown, 1000);
}

function setupPastMedia() {
  const grid = document.getElementById("pastMediaGrid");
  if (!grid) return;

  pastMediaItems = pastMedia;

  pastMedia.forEach((item, index) => {
    if (item.type === "image") {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "media-item";
      button.setAttribute("aria-label", `View past event photo ${index + 1}`);

      const img = document.createElement("img");
      img.src = item.src;
      img.alt = "Past event highlight";
      button.appendChild(img);
      button.addEventListener("click", () => openMediaViewer(item, index));
      grid.appendChild(button);
    } else if (item.type === "video") {
      const wrapper = document.createElement("div");
      wrapper.className = "media-item media-item--video";

      const video = document.createElement("video");
      video.src = item.src;
      video.controls = true;
      video.preload = "metadata";
      video.setAttribute("playsinline", "");
      wrapper.appendChild(video);
      wrapper.addEventListener("click", () => openMediaViewer(item, index));
      grid.appendChild(wrapper);
    }
  });
}

function setupLightbox() {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;

  const img = lightbox.querySelector("img");
  const video = lightbox.querySelector("video");
  const closeBtn = lightbox.querySelector(".lightbox-close");
  const prevBtn = lightbox.querySelector(".lightbox-prev");
  const nextBtn = lightbox.querySelector(".lightbox-next");

  const close = () => {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    img.src = "";
    video.pause();
    video.currentTime = 0;
    video.src = "";
  };

  closeBtn.addEventListener("click", close);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      close();
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("open")) {
      close();
    } else if (event.key === "ArrowRight" && lightbox.classList.contains("open")) {
      showNextMedia();
    } else if (event.key === "ArrowLeft" && lightbox.classList.contains("open")) {
      showPrevMedia();
    }
  });

  if (prevBtn) prevBtn.addEventListener("click", showPrevMedia);
  if (nextBtn) nextBtn.addEventListener("click", showNextMedia);
}

function openLightbox(src) {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;
  const img = lightbox.querySelector("img");
  img.src = src;
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
}

function openMediaViewer(item, index) {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;

  if (!pastMediaItems.length) {
    pastMediaItems = pastMedia;
  }

  currentMediaIndex = index;

  const img = lightbox.querySelector("img");
  const video = lightbox.querySelector("video");

  img.style.display = "none";
  video.style.display = "none";
  video.pause();
  video.currentTime = 0;

  if (item.type === "image") {
    img.src = item.src;
    img.style.display = "block";
  } else {
    video.src = item.src;
    video.style.display = "block";
    video.play();
  }

  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
}

function showNextMedia() {
  if (!pastMediaItems.length) return;
  currentMediaIndex = (currentMediaIndex + 1) % pastMediaItems.length;
  openMediaViewer(pastMediaItems[currentMediaIndex], currentMediaIndex);
}

function showPrevMedia() {
  if (!pastMediaItems.length) return;
  currentMediaIndex = (currentMediaIndex - 1 + pastMediaItems.length) % pastMediaItems.length;
  openMediaViewer(pastMediaItems[currentMediaIndex], currentMediaIndex);
}

// Auto-unlock at 6pm Oct 25
function checkTimeUnlocks() {
  const unlockDate = new Date("2025-10-25T18:00:00-04:00");
  const now = new Date();
  
  if (now >= unlockDate) {
    unlockSections();
    return;
  }

  const msUntilUnlock = unlockDate.getTime() - now.getTime();
  setTimeout(unlockSections, msUntilUnlock);
}

function unlockSections() {
  const sectionsToUnlock = ["#check-in", "#agenda", "#survey"];
  const sectionsToHide = ["#pre-check"];
  
  // Unlock check-in, agenda, survey
  sectionsToUnlock.forEach(selector => {
    const section = document.querySelector(selector);
    if (section) {
      section.style.filter = "none";
      section.style.pointerEvents = "auto";
      section.style.position = "static";
      section.classList.add("unlocked");
    }
  });
  
  // Hide pre-check completely after 6pm
  sectionsToHide.forEach(selector => {
    const section = document.querySelector(selector);
    if (section) {
      section.style.display = "none";
    }
  });
}

// Add CSS to remove ::before when unlocked
const style = document.createElement("style");
style.textContent = `
  #check-in.unlocked::before,
  #agenda.unlocked::before,
  #survey.unlocked::before {
    display: none !important;
  }
  #pre-check.locked::before {
    display: flex !important;
  }
`;
document.head.appendChild(style);

// Initialize time check
checkTimeUnlocks();

