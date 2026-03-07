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
  setupEventFlyers();
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
  { type: "image", src: "IMG-20251011-WA0019.jpg" },
  { type: "image", src: "IMG-20251011-WA0020.jpg" },
  { type: "image", src: "IMG-20251011-WA0021.jpg" },
  { type: "image", src: "IMG-20251011-WA0022.jpg" },
  { type: "image", src: "IMG-20251011-WA0023.jpg" },
  { type: "image", src: "IMG-20251011-WA0024.jpg" },
  { type: "image", src: "IMG-20251011-WA0025.jpg" },
  { type: "image", src: "IMG-20251011-WA0026.jpg" },
  { type: "image", src: "IMG-20251011-WA0027.jpg" },
  { type: "image", src: "IMG-20251011-WA0028.jpg" },
  { type: "image", src: "IMG-20251011-WA0029.jpg" },
  { type: "image", src: "IMG-20251011-WA0031.jpg" },
  { type: "image", src: "IMG-20251011-WA0032.jpg" },
  { type: "image", src: "IMG-20251011-WA0033.jpg" },
  { type: "image", src: "IMG-20251011-WA0034.jpg" },
  { type: "image", src: "IMG-20251011-WA0035.jpg" },
  { type: "image", src: "IMG-20251011-WA0036.jpg" },
  { type: "image", src: "IMG-20251011-WA0037.jpg" },
  { type: "image", src: "IMG-20251011-WA0038.jpg" },
  { type: "image", src: "IMG-20251011-WA0039.jpg" },
  { type: "image", src: "IMG-20251011-WA0040.jpg" },
  { type: "image", src: "WhatsApp_Image_2025-10-26_at_8.08.11_AM.png" },
  { type: "image", src: "WhatsApp_Image_2025-10-26_at_8.08.10_AM.png" },
  { type: "image", src: "WhatsApp_Image_2025-10-26_at_8.08.06_AM.png" },
  { type: "image", src: "WhatsApp_Image_2025-12-19_at_2.37.20_PM.png" },
  { type: "image", src: "WhatsApp_Image_2025-10-23_at_10.39.43_PM.png" },
  { type: "image", src: "WhatsApp_Image_2025-10-26_at_8.08.10_AM_1.png" },
  { type: "image", src: "WhatsApp_Image_2025-10-26_at_8.08.14_AM.png" },
  { type: "image", src: "WhatsApp_Image_2025-10-26_at_8.08.13_AM.png" },
  { type: "image", src: "WhatsApp_Image_2025-10-26_at_8.08.06_AM_1.png" },
  { type: "image", src: "WhatsApp_Image_2025-10-26_at_8.08.09_AM.png" },
  { type: "image", src: "WhatsApp_Image_2025-10-26_at_8.08.04_AM.png" },
  { type: "image", src: "WhatsApp_Image_2025-10-26_at_8.08.04_AM_1.png" },
  { type: "image", src: "game%20night%20flyer.png" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.11%20PM.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.12%20PM%20%281%29.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.12%20PM%20%282%29.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.12%20PM%20%283%29.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.12%20PM.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.13%20PM%20%281%29.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.13%20PM%20%282%29.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.13%20PM%20%283%29.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.13%20PM%20%284%29.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.13%20PM%20%285%29.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.13%20PM%20%286%29.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.13%20PM.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.14%20PM%20%281%29.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.14%20PM%20%282%29.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.14%20PM%20%283%29.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.14%20PM%20%284%29.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.14%20PM%20%285%29.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.14%20PM%20%286%29.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.14%20PM.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.15%20PM%20%281%29.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.15%20PM%20%282%29.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.15%20PM%20%283%29.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.15%20PM.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.20%20PM%20%281%29.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.20%20PM%20%282%29.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.20%20PM%20%283%29.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.20%20PM%20%284%29.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.20%20PM.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.21%20PM%20%281%29.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.21%20PM%20%282%29.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.21%20PM%20%283%29.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.21%20PM%20%284%29.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.21%20PM%20%285%29.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.21%20PM.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.22%20PM%20%281%29.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.22%20PM%20%282%29.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.22%20PM%20%283%29.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.22%20PM%20%284%29.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.22%20PM%20%285%29.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.22%20PM%20%286%29.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.22%20PM.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.34%20PM%20%281%29.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.34%20PM%20%282%29.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.34%20PM.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.36%20PM.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.37%20PM%20%281%29.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.37%20PM%20%282%29.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.37%20PM.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.38%20PM.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.39%20PM.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.42%20PM%20%281%29.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.42%20PM%20%282%29.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.42%20PM%20%283%29.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.42%20PM.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.43%20PM%20%281%29.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.43%20PM%20%282%29.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.43%20PM%20%283%29.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.43%20PM%20%284%29.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.43%20PM%20%285%29.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.43%20PM%20%286%29.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.43%20PM%20%287%29.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.43%20PM%20%288%29.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.43%20PM%20%289%29.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.43%20PM.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.44%20PM.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.47%20PM%20%281%29.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.47%20PM.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.48%20PM.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.49%20PM.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.50%20PM%20%281%29.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.50%20PM%20%282%29.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.50%20PM.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.51%20PM%20%281%29.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.51%20PM%20%282%29.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.51%20PM.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.54%20PM.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.59%20PM%20%281%29.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.14.59%20PM.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.15.04%20PM%20%281%29.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.15.04%20PM%20%282%29.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.15.04%20PM%20%283%29.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.15.04%20PM.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.15.05%20PM%20%281%29.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.15.05%20PM%20%282%29.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.15.05%20PM.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.15.50%20PM%20%281%29.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.15.50%20PM.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.15.51%20PM%20%281%29.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.15.51%20PM%20%282%29.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.15.51%20PM%20%283%29.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.15.51%20PM.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.15.54%20PM.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.16.01%20PM%20%281%29.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.16.01%20PM.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.16.02%20PM%20%281%29.jpeg" },
  { type: "image", src: "WhatsApp%20Image%202026-01-31%20at%205.16.02%20PM.jpeg" },
  { type: "video", src: "WhatsApp%20Video%202026-01-31%20at%205.14.09%20PM.mp4" },
  { type: "video", src: "WhatsApp%20Video%202026-01-31%20at%205.14.11%20PM.mp4" },
  { type: "video", src: "WhatsApp%20Video%202026-01-31%20at%205.14.23%20PM.mp4" },
  { type: "video", src: "WhatsApp%20Video%202026-01-31%20at%205.14.25%20PM.mp4" },
  { type: "video", src: "WhatsApp%20Video%202026-01-31%20at%205.14.33%20PM.mp4" },
  { type: "video", src: "WhatsApp%20Video%202026-01-31%20at%205.14.36%20PM.mp4" },
  { type: "video", src: "WhatsApp%20Video%202026-01-31%20at%205.14.44%20PM.mp4" },
  { type: "video", src: "WhatsApp%20Video%202026-01-31%20at%205.14.47%20PM.mp4" },
  { type: "video", src: "WhatsApp%20Video%202026-01-31%20at%205.14.53%20PM.mp4" },
  { type: "video", src: "WhatsApp%20Video%202026-01-31%20at%205.14.58%20PM.mp4" },
  { type: "video", src: "WhatsApp%20Video%202026-01-31%20at%205.15.04%20PM.mp4" },
  { type: "video", src: "WhatsApp%20Video%202026-01-31%20at%205.15.53%20PM.mp4" },
  { type: "video", src: "WhatsApp%20Video%202026-01-31%20at%205.15.56%20PM.mp4" },
  { type: "video", src: "WhatsApp%20Video%202026-01-31%20at%205.15.58%20PM.mp4" },
  { type: "video", src: "WhatsApp%20Video%202026-01-31%20at%205.16.00%20PM.mp4" },
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

const eventFlyers = [
  // Five dedicated event flyers (as requested)
  { type: "flyer", src: "IMG-20251011-WA0036.jpg" },
  { type: "flyer", src: "IMG-20251011-WA0037.jpg" },
  { type: "flyer", src: "IMG-20251011-WA0038.jpg" },
  { type: "flyer", src: "IMG-20251011-WA0040.jpg" },
  { type: "flyer", src: "WhatsApp_Image_2025-12-19_at_2.37.20_PM.png" },
];

let pastMediaItems = [];
let currentMediaIndex = 0;
let activeMediaFilter = "all";
/** When the lightbox is open, this is the list used for prev/next (flyers or past media). */
let lightboxItems = [];

function setupFloatingGallery() {
  const gallery = document.getElementById("floatingGallery");
  if (!gallery) return;

  galleryImages.forEach((src, index) => {
    const button = document.createElement("button");
    button.type = "button";
    const img = document.createElement("img");
    img.src = src;
    img.alt = "Game night moment";
    button.appendChild(img);
    const item = { type: "image", src };
    button.addEventListener("click", () => {
      lightboxItems = galleryImages.map((s) => ({ type: "image", src: s }));
      openMediaViewer(item, index);
    });
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
  const submitButton = feedbackForm?.querySelector('button[type="submit"]');
  let isLoading = false;

  if (!feedbackForm) return;

  feedbackForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    
    if (!feedbackForm.checkValidity()) {
      feedbackForm.reportValidity();
      return;
    }

    if (isLoading) return;
    isLoading = true;

    // Get form data
    const formData = new FormData(feedbackForm);
    const rating1 = formData.get("rating1");
    const rating2 = formData.get("rating2");
    const comment = formData.get("comment") || "";

    // Validate ratings are between 1-5
    if (!rating1 || !["1","2","3","4","5"].includes(rating1)) {
      if (formStatus) {
        formStatus.textContent = "Please select a rating for Overall Experience.";
        formStatus.style.color = "var(--accent-red)";
      }
      isLoading = false;
      return;
    }

    if (!rating2 || !["1","2","3","4","5"].includes(rating2)) {
      if (formStatus) {
        formStatus.textContent = "Please select a rating for Games Played.";
        formStatus.style.color = "var(--accent-red)";
      }
      isLoading = false;
      return;
    }

    // Prepare JSON payload with exact keys required by backend
    const payload = {
      rating1: rating1,
      rating2: rating2,
      comment: comment.trim()
    };

    // Log the payload being sent
    console.log("Submitting feedback with payload:", payload);
    console.log("JSON string:", JSON.stringify(payload));

    // Show loading state - disable button and show "Sending..." status
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
      submitButton.style.opacity = "0.6";
      submitButton.style.cursor = "not-allowed";
    }

    if (formStatus) {
      formStatus.textContent = "Sending...";
      formStatus.style.color = "var(--accent-gold)";
      formStatus.style.fontSize = "1rem";
      formStatus.style.fontWeight = "600";
      formStatus.style.padding = "1rem";
      formStatus.style.backgroundColor = "rgba(246, 204, 101, 0.1)";
      formStatus.style.borderRadius = "8px";
      formStatus.style.display = "block";
      formStatus.style.opacity = "1";
    }

    // Submit to Google Apps Script Web App
    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbx-WzOeIITSzCRFySQ6ArJ1UG3UlBgJ3Qu2g9GNSYqnfa1bWnL6QVp2cRY4q74AeKY9/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      console.log("✓ Successfully submitted feedback!");
      console.log("Submitted data:", payload);
      
      // Reset form on success
      feedbackForm.reset();
      
      // Re-enable button
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Submit Feedback";
        submitButton.style.opacity = "1";
        submitButton.style.cursor = "pointer";
      }
      
      // Show prominent success message
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
        formStatus.style.display = "block";
        formStatus.style.opacity = "1";
        
        // Scroll to status message
        formStatus.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    } catch (error) {
      console.error("✗ Error submitting feedback");
      console.error("Error details:", error);
      console.error("Failed data:", payload);
      
      // Re-enable button on error
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Submit Feedback";
        submitButton.style.opacity = "1";
        submitButton.style.cursor = "pointer";
      }
      
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
    } finally {
      isLoading = false;
    }
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

const ANONYMOUS_COMMENTS_KEY = "gameNightAnonymousComments";
const DISCUSSION_PAGE_SIZE = 5;
window.__discussionPage = 1;
window.__discussionSortMode = "recent";
window.__lastDiscussionList = [];

function getDiscussionGuestId() {
  try {
    var id = localStorage.getItem("discussionGuestId");
    if (id) return id;
    id = "guest-" + Date.now() + "-" + Math.random().toString(36).slice(2, 11);
    localStorage.setItem("discussionGuestId", id);
    return id;
  } catch {
    return "guest-" + Date.now();
  }
}

function getAnonymousComments() {
  try {
    const raw = localStorage.getItem(ANONYMOUS_COMMENTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveAnonymousComments(comments) {
  try {
    localStorage.setItem(ANONYMOUS_COMMENTS_KEY, JSON.stringify(comments));
  } catch (e) {
    console.warn("Could not save comments to localStorage", e);
  }
}

function formatDiscussionTime(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" });
  } catch {
    return "";
  }
}

function avgRating(ratings) {
  if (!ratings || typeof ratings !== "object" || Array.isArray(ratings)) return 0;
  const vals = Object.values(ratings).filter((n) => typeof n === "number" && n >= 1 && n <= 5);
  if (vals.length === 0) return 0;
  return vals.reduce((a, b) => a + b, 0) / vals.length;
}

function renderDiscussionList(comments, useFirebase) {
  const listEl = document.getElementById("anonymousCommentsList");
  const paginationEl = document.getElementById("discussionPagination");
  if (!listEl) return;

  const searchInput = document.getElementById("discussionSearch");
  const searchQuery = (searchInput && searchInput.value) ? searchInput.value.trim() : "";
  let page = Math.max(1, parseInt(window.__discussionPage, 10) || 1);

  const list = (comments || []).map((c) => ({ ...c, ratings: c.ratings && typeof c.ratings === "object" && !Array.isArray(c.ratings) ? { ...c.ratings } : {} }));
  const byId = new Map(list.map((c) => [c.id, c]));
  const childrenOf = (id) => list.filter((c) => c.parentId === id);
  function lastActivityTime(root) {
    const kids = childrenOf(root.id);
    const times = [new Date(root.time || 0).getTime()].concat(kids.map((k) => new Date(k.time || 0).getTime()));
    return Math.max.apply(null, times);
  }
  let roots = list.filter((c) => !c.parentId || !byId.get(c.parentId));
  roots = roots.map((r) => ({ ...r, avgRating: avgRating(r.ratings), lastActivity: lastActivityTime(r) }));
  const sortMode = window.__discussionSortMode || "recent";
  if (sortMode === "recent") {
    roots.sort((a, b) => new Date(b.time || 0).getTime() - new Date(a.time || 0).getTime());
  } else if (sortMode === "recentCommented") {
    roots.sort((a, b) => (b.lastActivity || 0) - (a.lastActivity || 0));
  } else {
    roots.sort((a, b) => {
      const diff = (b.avgRating || 0) - (a.avgRating || 0);
      if (diff !== 0) return diff;
      return new Date(b.time || 0).getTime() - new Date(a.time || 0).getTime();
    });
  }
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    roots = roots.filter((r) => ((r.nickname || "") + " " + (r.text || "")).toLowerCase().includes(q));
  }
  const totalFiltered = roots.length;
  const totalPages = Math.max(1, Math.ceil(totalFiltered / DISCUSSION_PAGE_SIZE));
  page = Math.min(page, totalPages);
  window.__discussionPage = page;
  const start = (page - 1) * DISCUSSION_PAGE_SIZE;
  const pageRoots = roots.slice(start, start + DISCUSSION_PAGE_SIZE);

  function buildCommentNode(c, depth, isRoot) {
    const wrap = document.createElement("div");
    wrap.className = "comment-item" + (depth > 0 ? " comment-item--reply" : "");
    wrap.dataset.commentId = c.id;

    const header = document.createElement("div");
    header.className = "comment-header";
    const nameSpan = document.createElement("span");
    nameSpan.className = "comment-author";
    nameSpan.textContent = (c.nickname || "Anonymous").trim() || "Anonymous";
    const timeSpan = document.createElement("span");
    timeSpan.className = "comment-time";
    timeSpan.textContent = formatDiscussionTime(c.time);
    header.appendChild(nameSpan);
    header.appendChild(timeSpan);

    const rateInHeader = document.createElement("div");
    rateInHeader.className = "comment-rate-inline";
    const curAvg = avgRating(c.ratings);
    const avgSpan = document.createElement("span");
    avgSpan.className = "comment-rate-avg";
    avgSpan.textContent = curAvg > 0 ? "Avg: " + curAvg.toFixed(1) : "";
    rateInHeader.appendChild(avgSpan);
    for (let s = 1; s <= 5; s++) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "comment-rate-btn-inline";
      btn.textContent = s;
      btn.setAttribute("aria-label", "Rate " + s + " out of 5");
      (function (score) {
        btn.addEventListener("click", () => {
          if (useFirebase) {
            if (window.CommentsAuth && window.CommentsAuth.rateDiscussion) {
              window.CommentsAuth.rateDiscussion(c.id, score).catch(function (err) {
                if (window.showCommentsError) window.showCommentsError(err.message || "Could not submit rating.");
              });
            }
          } else {
            const all = getAnonymousComments();
            const comment = all.find((x) => x.id === c.id);
            if (comment) {
              comment.ratings = comment.ratings || {};
              comment.ratings[getDiscussionGuestId()] = score;
              saveAnonymousComments(all);
              renderAnonymousComments();
            }
          }
        });
      })(s);
      rateInHeader.appendChild(btn);
    }
    header.appendChild(rateInHeader);

    const textEl = document.createElement("div");
    textEl.className = "comment-text";
    textEl.textContent = c.text;

    const actions = document.createElement("div");
    actions.className = "comment-actions";
    const replyBtn = document.createElement("button");
    replyBtn.type = "button";
    replyBtn.className = "comment-reply-btn";
    replyBtn.textContent = "Reply";
    replyBtn.setAttribute("aria-label", "Reply to this comment");
    actions.appendChild(replyBtn);

    wrap.appendChild(header);
    wrap.appendChild(textEl);
    wrap.appendChild(actions);

    const repliesContainer = document.createElement("div");
    repliesContainer.className = "comment-replies";
    const kids = childrenOf(c.id);
    kids.forEach((child) => repliesContainer.appendChild(buildCommentNode(child, depth + 1, false)));
    if (kids.length) wrap.appendChild(repliesContainer);

    replyBtn.addEventListener("click", () => {
      const parentInput = document.getElementById("anonymousParentId");
      const replyingToEl = document.getElementById("replyingTo");
      if (parentInput) parentInput.value = c.id;
      if (replyingToEl) {
        replyingToEl.innerHTML = "";
        const span = document.createElement("span");
        span.textContent = "Replying to " + (nameSpan.textContent);
        replyingToEl.appendChild(span);
        const cancel = document.createElement("button");
        cancel.type = "button";
        cancel.className = "replying-to-cancel";
        cancel.textContent = "Cancel";
        cancel.addEventListener("click", () => {
          if (parentInput) parentInput.value = "";
          replyingToEl.innerHTML = "";
          replyingToEl.classList.remove("is-visible");
        });
        replyingToEl.appendChild(cancel);
        replyingToEl.classList.add("is-visible");
      }
      const q = document.getElementById("anonymousQuestion");
      if (q) q.focus();
    });

    return wrap;
  }

  listEl.innerHTML = "";
  if (pageRoots.length === 0) {
    listEl.classList.add("is-empty");
    const empty = document.createElement("p");
    empty.className = "comments-empty";
    empty.textContent = searchQuery ? "No discussions match your search." : "No comments yet. Be the first to start the conversation.";
    listEl.appendChild(empty);
    if (paginationEl) paginationEl.innerHTML = "";
    return;
  }
  listEl.classList.remove("is-empty");
  const heading = document.createElement("h2");
  heading.className = "comments-list-heading";
  heading.textContent = "Discussion";
  listEl.appendChild(heading);
  pageRoots.forEach((c) => listEl.appendChild(buildCommentNode(c, 0, true)));

  if (paginationEl) {
    paginationEl.innerHTML = "";
    if (totalPages > 1) {
      const wrap = document.createElement("div");
      wrap.className = "discussion-pagination-inner";
      for (let i = 1; i <= totalPages; i++) {
        const link = document.createElement("button");
        link.type = "button";
        link.className = "discussion-page-btn" + (i === page ? " is-current" : "");
        link.textContent = i;
        link.setAttribute("aria-label", "Page " + i);
        link.setAttribute("aria-current", i === page ? "page" : "false");
        (function (p) {
          link.addEventListener("click", () => {
            window.__discussionPage = p;
            window.refreshDiscussionList();
          });
        })(i);
        wrap.appendChild(link);
      }
      paginationEl.appendChild(wrap);
    }
  }
}

function renderAnonymousComments() {
  const comments = getAnonymousComments().map((c) => ({ ...c, ratings: c.ratings || {} }));
  renderDiscussionList(comments, false);
}

function setupAnonymousQuestionForm() {
  const anonymousForm = document.getElementById("anonymousQuestionForm");
  const formStatus = document.getElementById("anonymousFormStatus");
  const submitButton = anonymousForm?.querySelector('button[type="submit"]');
  const nicknameInput = document.getElementById("anonymousNickname");
  const textarea = document.getElementById("anonymousQuestion");
  const parentInput = document.getElementById("anonymousParentId");
  const replyingToEl = document.getElementById("replyingTo");
  let isLoading = false;

  if (!anonymousForm) return;

  if (window.CommentsAuth && window.CommentsAuth.init) window.CommentsAuth.init();
  if (!(window.CommentsAuth && window.CommentsAuth.isConfigured && window.CommentsAuth.isConfigured())) {
    renderAnonymousComments();
  }

  function showStatus(message, isError) {
    if (!formStatus) return;
    formStatus.textContent = message;
    formStatus.style.color = isError ? "var(--accent-red)" : "var(--accent-gold)";
    formStatus.style.fontSize = "1.1rem";
    formStatus.style.fontWeight = "700";
    formStatus.style.padding = "1.2rem";
    formStatus.style.backgroundColor = isError ? "rgba(255, 77, 79, 0.15)" : "rgba(246, 204, 101, 0.15)";
    formStatus.style.borderRadius = "12px";
    formStatus.style.border = isError ? "2px solid var(--accent-red)" : "2px solid var(--accent-gold)";
    formStatus.style.boxShadow = isError ? "0 4px 12px rgba(255, 77, 79, 0.3)" : "0 4px 12px rgba(246, 204, 101, 0.3)";
    formStatus.style.display = "block";
    formStatus.style.visibility = "visible";
    formStatus.style.opacity = "1";
    formStatus.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  window.showCommentsError = function (message) {
    showStatus(message || "Something went wrong.", true);
  };

  window.onCommentsAuthReady = function () {
    if (window.CommentsAuth && window.CommentsAuth.isConfigured && window.CommentsAuth.loadComments) {
      window.CommentsAuth.loadComments(function (list) {
        renderAnonymousCommentsFromList(list);
      });
    }
  };

  var searchInput = document.getElementById("discussionSearch");
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      window.__discussionPage = 1;
      window.refreshDiscussionList();
    });
  }
  var tabList = document.querySelector(".discussion-tabs");
  if (tabList) {
    tabList.addEventListener("click", function (e) {
      var tab = e.target.closest(".discussion-tab");
      if (!tab || !tab.dataset.sort) return;
      window.__discussionSortMode = tab.dataset.sort;
      window.__discussionPage = 1;
      tabList.querySelectorAll(".discussion-tab").forEach(function (t) {
        t.classList.toggle("is-active", t === tab);
        t.setAttribute("aria-selected", t === tab ? "true" : "false");
      });
      window.refreshDiscussionList();
    });
  }
  function setDiscussionTabActive() {
    var sortMode = window.__discussionSortMode || "recent";
    var tabList = document.querySelector(".discussion-tabs");
    if (tabList) {
      tabList.querySelectorAll(".discussion-tab").forEach(function (t) {
        var isActive = (t.dataset.sort || "") === sortMode;
        t.classList.toggle("is-active", isActive);
        t.setAttribute("aria-selected", isActive ? "true" : "false");
      });
    }
  }
  window.setDiscussionTabActive = setDiscussionTabActive;
  setDiscussionTabActive();

  anonymousForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!anonymousForm.checkValidity()) {
      formStatus && (formStatus.textContent = "Please enter your comment.");
      formStatus && (formStatus.style.color = "var(--accent-red)");
      anonymousForm.reportValidity();
      return;
    }

    if (isLoading) return;
    isLoading = true;

    const nickname = (nicknameInput?.value || "").trim();
    const userInput = (textarea?.value || "").trim();
    const parentId = (parentInput?.value || "").trim();

    if (!userInput) {
      if (formStatus) {
        formStatus.textContent = "Please enter your comment before submitting.";
        formStatus.style.color = "var(--accent-red)";
      }
      isLoading = false;
      return;
    }

    const useFirebase = window.CommentsAuth && window.CommentsAuth.isConfigured && window.CommentsAuth.isConfigured();
    if (useFirebase) {
      if (nickname.length > 0 && !window.CommentsAuth.getCurrentUser()) {
        showStatus("Log in to claim this nickname and track your comment.", false);
        isLoading = false;
        return;
      }
    }

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.style.opacity = "0.6";
      submitButton.style.cursor = "not-allowed";
      submitButton.textContent = "Sending...";
    }
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

    try {
      if (useFirebase) {
        await window.CommentsAuth.submitComment({ nickname, text: userInput, parentId: parentId || null });
      } else {
        const displayName = nickname || "Anonymous";
        const comments = getAnonymousComments();
        const parentComment = parentId ? comments.find((c) => c.id === parentId) : null;
        const payloadForApi = parentComment
          ? `[${displayName}] (Reply to ${(parentComment.nickname || "Anonymous").trim()}) ${userInput}`
          : `[${displayName}] ${userInput}`;
        await submitForm(payloadForApi);
        const newComment = {
          id: "c-" + Date.now() + "-" + Math.random().toString(36).slice(2, 9),
          parentId: parentId || null,
          nickname: displayName,
          text: userInput,
          time: new Date().toISOString(),
        };
        comments.push(newComment);
        saveAnonymousComments(comments);
        renderAnonymousComments();
      }

      anonymousForm.reset();
      if (parentInput) parentInput.value = "";
      if (replyingToEl) {
        replyingToEl.innerHTML = "";
        replyingToEl.classList.remove("is-visible");
      }

      if (submitButton) {
        submitButton.disabled = false;
        submitButton.style.opacity = "1";
        submitButton.style.cursor = "pointer";
        submitButton.textContent = "Submit";
      }

      showStatus(nickname ? "✓ Your comment was posted. You can find it below by your nickname." : "✓ Your comment was posted as Anonymous.", false);

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
      }, 6000);
    } catch (error) {
      console.error("Error submitting comment:", error);
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.style.opacity = "1";
        submitButton.style.cursor = "pointer";
        submitButton.textContent = "Submit";
      }
      const msg = error && error.message ? error.message : "We couldn't submit your comment. Please try again.";
      showStatus(msg, true);
    } finally {
      isLoading = false;
    }
  });
}

function renderAnonymousCommentsFromList(list) {
  window.__lastDiscussionList = list || [];
  renderDiscussionList(window.__lastDiscussionList, true);
}

window.refreshDiscussionList = function () {
  if (window.CommentsAuth && window.CommentsAuth.isConfigured && window.CommentsAuth.isConfigured()) {
    renderAnonymousCommentsFromList(window.__lastDiscussionList || []);
  } else {
    renderAnonymousComments();
  }
};

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

  const tabs = document.querySelectorAll(".media-tab");

  const setActiveTab = (filter) => {
    tabs.forEach((tab) => {
      const isActive = tab.dataset.filter === filter;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", isActive ? "true" : "false");
    });
  };

  const renderMediaGrid = (filter) => {
    grid.innerHTML = "";
    pastMediaItems = getFilteredMedia(filter);

    pastMediaItems.forEach((item, index) => {
      if (item.type === "image" || item.type === "flyer") {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "media-item";
        button.setAttribute("aria-label", `View past event photo ${index + 1}`);

        const img = document.createElement("img");
        img.src = item.src;
        img.alt = "Past event highlight";
        button.appendChild(img);
        button.addEventListener("click", () => {
          lightboxItems = pastMediaItems;
          openMediaViewer(item, index);
        });
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
        wrapper.addEventListener("click", () => {
          lightboxItems = pastMediaItems;
          openMediaViewer(item, index);
        });
        grid.appendChild(wrapper);
      }
    });
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const filter = tab.dataset.filter || "all";
      activeMediaFilter = filter;
      setActiveTab(filter);
      renderMediaGrid(filter);
    });
  });

  setActiveTab(activeMediaFilter);
  renderMediaGrid(activeMediaFilter);
}

function setupEventFlyers() {
  const track = document.getElementById("eventFlyersGrid");
  const dotsContainer = document.getElementById("eventFlyersDots");
  const prevButton = document.querySelector(".flyer-carousel__nav--prev");
  const nextButton = document.querySelector(".flyer-carousel__nav--next");

  if (!track) return;

  track.innerHTML = "";
  if (dotsContainer) dotsContainer.innerHTML = "";

  const slides = [];
  const dots = [];
  let activeIndex = 0;
  let autoAdvance;

  const updateDots = () => {
    dots.forEach((dot, i) => {
      const isActive = i === activeIndex;
      dot.classList.toggle("is-active", isActive);
      dot.setAttribute("aria-current", isActive ? "true" : "false");
    });
  };

  const showSlide = (index) => {
    if (!slides.length) return;
    const maxIndex = slides.length - 1;
    if (index < 0) {
      activeIndex = maxIndex;
    } else if (index > maxIndex) {
      activeIndex = 0;
    } else {
      activeIndex = index;
    }

    const target = slides[activeIndex];
    const targetOffset = target.offsetLeft;

    track.scrollTo({
      left: targetOffset,
      behavior: "smooth",
    });

    slides.forEach((slide, i) => {
      slide.classList.toggle("is-active", i === activeIndex);
    });

    updateDots();
  };

  eventFlyers.forEach((item, index) => {
    if (item.type !== "image" && item.type !== "flyer") return;

    const slide = document.createElement("button");
    slide.type = "button";
    slide.className = "media-item flyer-slide";
    slide.setAttribute("aria-label", `View event flyer ${index + 1}`);

    const img = document.createElement("img");
    img.src = item.src;
    img.alt = "Event flyer";
    slide.appendChild(img);

    slide.addEventListener("click", () => {
      lightboxItems = eventFlyers.filter((i) => i.type === "image" || i.type === "flyer");
      openMediaViewer(item, index);
    });
    track.appendChild(slide);
    slides.push(slide);

    if (dotsContainer) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "flyer-carousel__dot";
      dot.setAttribute("aria-label", `Go to flyer ${index + 1}`);
      dot.addEventListener("click", () => {
        showSlide(index);
        resetAutoAdvance();
      });
      dotsContainer.appendChild(dot);
      dots.push(dot);
    }
  });

  if (!slides.length) return;

  const goToNext = () => {
    showSlide(activeIndex + 1);
  };

  const goToPrev = () => {
    showSlide(activeIndex - 1);
  };

  const resetAutoAdvance = () => {
    if (autoAdvance) {
      clearInterval(autoAdvance);
    }
    autoAdvance = setInterval(goToNext, 8000);
  };

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      goToNext();
      resetAutoAdvance();
    });
  }

  if (prevButton) {
    prevButton.addEventListener("click", () => {
      goToPrev();
      resetAutoAdvance();
    });
  }

  resetAutoAdvance();

  // Ensure layout is ready before the initial scroll
  requestAnimationFrame(() => {
    showSlide(0);
  });
}

function getFilteredMedia(filter) {
  if (filter === "photos") {
    return pastMedia.filter((item) => item.type === "image");
  }
  if (filter === "videos") {
    return pastMedia.filter((item) => item.type === "video");
  }
  return pastMedia;
}

function lockBodyScroll() {
  document.body.classList.add("lightbox-open");
}

function unlockBodyScroll() {
  document.body.classList.remove("lightbox-open");
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
    unlockBodyScroll();
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
  lightboxItems = [{ type: "image", src }];
  openMediaViewer(lightboxItems[0], 0);
}

function openMediaViewer(item, index) {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;

  currentMediaIndex = index;

  const img = lightbox.querySelector("img");
  const video = lightbox.querySelector("video");

  img.style.display = "none";
  video.style.display = "none";
  video.pause();
  video.currentTime = 0;

  if (item.type === "image" || item.type === "flyer") {
    img.src = item.src;
    img.style.display = "block";
  } else {
    video.src = item.src;
    video.style.display = "block";
    video.play();
  }

  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  lockBodyScroll();
}

function showNextMedia() {
  if (!lightboxItems.length) return;
  currentMediaIndex = (currentMediaIndex + 1) % lightboxItems.length;
  openMediaViewer(lightboxItems[currentMediaIndex], currentMediaIndex);
}

function showPrevMedia() {
  if (!lightboxItems.length) return;
  currentMediaIndex = (currentMediaIndex - 1 + lightboxItems.length) % lightboxItems.length;
  openMediaViewer(lightboxItems[currentMediaIndex], currentMediaIndex);
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

