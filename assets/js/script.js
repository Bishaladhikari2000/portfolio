"use strict";

// element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector(
      "[data-testimonials-title]"
    ).innerHTML;
    modalText.innerHTML = this.querySelector(
      "[data-testimonials-text]"
    ).innerHTML;

    testimonialsModalFunc();
  });
}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () {
  elementToggleFunc(this);
});

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
};

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}

/* Status Indicator Logic (Nepal Time) */
function updateStatus() {
  const statusDot = document.querySelector("[data-status-dot]");
  const statusText = document.querySelector("[data-status-text]");
  const timeDisplay = document.querySelector("[data-time-display]");

  if (!statusDot || !statusText || !timeDisplay) return;

  // Get current time in Nepal
  const options = {
    timeZone: "Asia/Kathmandu",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const nepalTimeStr = new Date().toLocaleString("en-US", options);

  // Get hour 0-23 for logic
  const hourOptions = {
    timeZone: "Asia/Kathmandu",
    hour: "numeric",
    hour12: false,
  };
  const nepalHour = parseInt(new Date().toLocaleString("en-US", hourOptions));

  // Logic: 6 AM to 10 PM (22) is Online
  const isOnline = nepalHour >= 6 && nepalHour < 22;

  if (isOnline) {
    statusDot.className = "status-dot online";
    statusText.textContent = "I'm Online! ";
  } else {
    statusDot.className = "status-dot sleeping";
    statusText.textContent = "I'm Sleeping 😴";
  }

  timeDisplay.textContent = `${nepalTimeStr} (Nepal)`;
}

// Update immediately and then every minute
updateStatus();
setInterval(updateStatus, 60000);

const videoWaiting = document.querySelector(".video-waiting");
const videoLookingDown = document.querySelector(".video-looking-down"); // Working
const videoDoIt = document.querySelector(".video-do-it");
const videoHeadshake = document.querySelector(".video-headshake");
const videoSmile = document.querySelector(".video-smile");
const videoMouthOpen = document.querySelector(".video-mouth-open");

const allVideos = [
  videoWaiting,
  videoLookingDown,
  videoDoIt,
  videoHeadshake,
  videoSmile,
  videoMouthOpen,
];
const socialList = document.querySelector(".social-list");
const contactArticle = document.querySelector('[data-page="contact"]');

let isIdle = false;
let idleTimer;
let isHoveringSocial = false;
let isContactPage = false;
let isFormError = false;
let isFormSuccess = false;
let isHoveringSpecial = false;

// New States
let isAtTop = true;
let isHoveringInteractive = false;
let isReading = false;

function activateVideo(videoToActivate) {
  if (!videoToActivate) return;
  if (videoToActivate.classList.contains("active")) return;

  allVideos.forEach((v) => {
    if (v) {
      v.classList.remove("active");
      v.pause();
    }
  });

  videoToActivate.classList.add("active");
  videoToActivate.currentTime = 0;
  videoToActivate.play().catch((e) => console.log("Autoplay prevented:", e));
}

function updateAvatarState() {
  // 1. Form Critical States
  if (isFormSuccess) {
    activateVideo(videoSmile);
    return;
  }
  if (isFormError) {
    activateVideo(videoHeadshake);
    return;
  }

  // 2. Contact / Social Encouragement
  if (isContactPage || isHoveringSocial) {
    activateVideo(videoDoIt);
    return;
  }

  // 3. High Interest (Hovering Links/Buttons)
  if (isHoveringInteractive || isHoveringSpecial) {
    activateVideo(videoMouthOpen);
    return;
  }

  // 4. Greeting (Top of Page)
  if (isAtTop && !isIdle) {
    activateVideo(videoSmile);
    return;
  }

  // 5. Reading (Hovering Text) -> Semantic "Listening/Waiting"
  if (isReading && !isIdle) {
    activateVideo(videoWaiting);
    return;
  }

  // 6. Working (Moving mouse in neutral areas)
  if (!isIdle) {
    activateVideo(videoLookingDown);
    return;
  }

  // 7. Idle Default
  activateVideo(videoWaiting);
}

// --- Event Listeners ---

// 1. Idle & Scroll Detection
function resetStateAndIdle() {
  if (isIdle) {
    isIdle = false;
    updateAvatarState();
  }
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => {
    isIdle = true;
    updateAvatarState();
  }, 1500);
}

window.addEventListener("mousemove", (e) => {
  resetStateAndIdle();

  // Smart Hover Detection
  const target = e.target;
  const tag = target.tagName.toLowerCase();
  const cls = target.className;

  // A: Interactive Elements -> Mouth Open
  if (
    tag === "a" ||
    tag === "button" ||
    tag === "input" ||
    tag === "textarea" ||
    target.closest("a") ||
    target.closest("button")
  ) {
    isHoveringInteractive = true;
    isReading = false;
  }
  // B: Text Elements -> Reading (Waiting)
  else if (
    tag === "p" ||
    tag === "h1" ||
    tag === "h2" ||
    tag === "h3" ||
    tag === "h4" ||
    tag === "h5" ||
    tag === "h6" ||
    tag === "li" ||
    tag === "span"
  ) {
    isHoveringInteractive = false;
    isReading = true;
  }
  // C: Neutral Area -> Working
  else {
    isHoveringInteractive = false;
    isReading = false;
  }
  updateAvatarState();
});

window.addEventListener("click", resetStateAndIdle);
window.addEventListener("keypress", resetStateAndIdle);

window.addEventListener("scroll", () => {
  resetStateAndIdle();
  // Check if at top (allow small buffer)
  isAtTop = window.scrollY < 100;
  updateAvatarState();
});

// Init Scroll State
isAtTop = window.scrollY < 100;

// 2. Social Hover
if (socialList) {
  socialList.addEventListener("mouseenter", () => {
    isHoveringSocial = true;
    updateAvatarState();
  });
  socialList.addEventListener("mouseleave", () => {
    isHoveringSocial = false;
    updateAvatarState();
  });
}

// 3. Contact Page Detection
if (contactArticle) {
  isContactPage = contactArticle.classList.contains("active");
  updateAvatarState();
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === "class") {
        isContactPage = contactArticle.classList.contains("active");
        updateAvatarState();
      }
    });
  });
  observer.observe(contactArticle, { attributes: true });
}

// 4. Form Logic
const contactForm = document.querySelector("[data-form]");
if (contactForm) {
  const inputs = contactForm.querySelectorAll("[data-form-input]");
  const submitBtn = contactForm.querySelector("[data-form-btn]");

  inputs.forEach((input) => {
    input.addEventListener("focus", () => {
      isFormError = false;
      isFormSuccess = false;
      updateAvatarState();
    });
    input.addEventListener("blur", () => {
      if (!input.checkValidity() && input.value.trim() !== "") {
        isFormError = true;
        updateAvatarState();
        setTimeout(() => {
          isFormError = false;
          updateAvatarState();
        }, 2000);
      }
    });
  });

  submitBtn.addEventListener("mouseenter", () => {
    if (contactForm.checkValidity()) {
      isHoveringSpecial = true;
    } else {
      isFormError = true;
    }
    updateAvatarState();
  });

  submitBtn.addEventListener("mouseleave", () => {
    isHoveringSpecial = false;
    isFormError = false;
    updateAvatarState();
  });

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const submitBtnSpan = submitBtn.querySelector("span");
    const originalText = submitBtnSpan.innerText;

    const fullname = contactForm.querySelector('[name="fullname"]').value;
    const email = contactForm.querySelector('[name="email"]').value;
    const message = contactForm.querySelector('[name="message"]').value;

    submitBtnSpan.innerText = "Redirecting...";
    submitBtn.setAttribute("disabled", "true");

    const subject = "Contact from Portfolio";
    const body = `Name: ${fullname}\nEmail: ${email}\n\nMessage:\n${message}`;

    const mailtoLink = `mailto:bishaladhikariofficial@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;

    setTimeout(() => {
      submitBtnSpan.innerText = "Opened Mail App";
      contactForm.reset();
      setTimeout(() => {
        submitBtnSpan.innerText = originalText;
        submitBtn.removeAttribute("disabled");
      }, 3000);
    }, 1000);
  });
}

// Start default
updateAvatarState();

// --- More Section Tabs Logic ---

const moreTabBtns = document.querySelectorAll("[data-more-tab-btn]");
const moreTabContents = document.querySelectorAll("[data-more-tab-content]");

if (moreTabBtns.length > 0) {
  moreTabBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const targetCategory = this.dataset.moreTabBtn;

      // Remove active class from all buttons and add to clicked
      moreTabBtns.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");

      // Hide all contents and show target
      moreTabContents.forEach((content) => {
        if (content.dataset.moreTabContent === targetCategory) {
          content.style.display = "block";
          // Add small animation delay/class if needed, but display toggle is basic requirement
          content.classList.add("active");
        } else {
          content.style.display = "none";
          content.classList.remove("active");
        }
      });
    });
  });
}

// --- Medium Feed Fetcher ---

const mediumFeedContainer = document.getElementById("medium-feed");

if (mediumFeedContainer) {
  const rssUrl = "https://medium.com/feed/@bytebishal";
  const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
    rssUrl
  )}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "ok") {
        renderMediumPosts(data.items);
      } else {
        mediumFeedContainer.innerHTML =
          '<li class="blog-post-item active"><div class="blog-content"><h3 class="h3 blog-item-title">Failed to load Medium feed.</h3></div></li>';
      }
    })
    .catch((error) => {
      console.error("Error fetching Medium feed:", error);
      mediumFeedContainer.innerHTML =
        '<li class="blog-post-item active"><div class="blog-content"><h3 class="h3 blog-item-title">Error loading feed.</h3></div></li>';
    });
}

function renderMediumPosts(posts) {
  if (!mediumFeedContainer) return;

  let html = "";
  posts.forEach((post) => {
    // Extract a clearer snippet or use description
    // rss2json returns user-friendly content snippet in 'description' or 'content'

    // Create a temporary element to strip HTML from description for the preview text
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = post.description;
    const plainText = tempDiv.textContent || tempDiv.innerText || "";
    const previewText = plainText.substring(0, 120) + "...";

    // Format date
    const date = new Date(post.pubDate);
    const dateString = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    const dateTime = date.toISOString().split("T")[0];

    // Attempt to find an image
    // 1. Try 'thumbnail' from API
    // 2. Try to find first <img> in description
    let image = post.thumbnail;
    if (!image || image === "") {
      const imgMatch = post.description.match(/<img[^>]+src="([^">]+)"/);
      if (imgMatch) {
        image = imgMatch[1];
      } else {
        // Fallback placeholder or keep empty to be hidden by onerror
        image = "";
      }
    }

    html += `
      <li class="blog-post-item">
        <a href="${post.link}" target="_blank" rel="nofollow">

          <figure class="blog-banner-box">
            <img src="${image}" alt="${post.title}" loading="lazy" onerror="this.parentElement.style.display='none'">
          </figure>

          <div class="blog-content">

            <div class="blog-meta">
              <p class="blog-category">Medium</p>

              <span class="dot"></span>

              <time datetime="${dateTime}">${dateString}</time>
            </div>

            <h3 class="h3 blog-item-title">${post.title}</h3>

            <p class="blog-text">
              ${previewText}
            </p>

          </div>

        </a>
      </li>
    `;
  });

  mediumFeedContainer.innerHTML = html;
}
