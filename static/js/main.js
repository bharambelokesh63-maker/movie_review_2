// main.js — page behaviour only. All NLP analysis happens in the Python backend.

// Mobile nav toggle
function toggleNav() {
  document.getElementById("navlinks").classList.toggle("open");
}

// Mark the active nav link based on current path
(function markActiveNav() {
  const path = window.location.pathname;
  document.querySelectorAll(".nav nav a").forEach(function(a) {
    const href = a.getAttribute("href");
    if (href && path === href) {
      a.classList.add("active");
    }
  });
})();

// Fill the home page form with an example review.
function fillExample() {
  const movie = document.getElementById("movie");
  const review = document.getElementById("review");
  if (movie) movie.value = "Inception";
  if (review) {
    review.value =
      "Christopher Nolan has crafted something genuinely remarkable here. " +
      "The performances are layered and convincing — DiCaprio carries the film with restraint, " +
      "never overselling the emotional weight. The score by Hans Zimmer is relentless in the best " +
      "possible way. My only complaint is the exposition-heavy first act, which slows an otherwise " +
      "breakneck narrative. The ending is deliberately ambiguous and I think it earns it. " +
      "Overall a dense, rewarding watch.";
    review.dispatchEvent(new Event("input"));
  }
}

// Character counter on the home page.
(function initCharCounter() {
  const reviewBox = document.getElementById("review");
  const counter = document.getElementById("charcount");
  if (!reviewBox || !counter) return;
  function update() {
    const len = reviewBox.value.length;
    counter.textContent = len.toLocaleString();
    counter.style.color = len > 18000 ? "var(--neg)" : "";
  }
  reviewBox.addEventListener("input", update);
  update();
})();

// Show the loading overlay when a form is submitted.
document.querySelectorAll("form.js-loading").forEach(function(form) {
  form.addEventListener("submit", function() {
    var box = document.getElementById("loading");
    if (box) box.hidden = false;
  });
});
// Hide the spinner if the user returns via the browser back button.
window.addEventListener("pageshow", function() {
  var box = document.getElementById("loading");
  if (box) box.hidden = true;
});

// NLP Lab tabs.
(function initTabs() {
  var tabBar = document.getElementById("labtabs");
  if (!tabBar) return;
  var buttons = tabBar.querySelectorAll("button");
  var panels = document.querySelectorAll("[data-panel]");

  function show(name) {
    buttons.forEach(function(b) {
      b.classList.toggle("active", b.dataset.tab === name);
    });
    panels.forEach(function(p) {
      p.classList.toggle("active", p.dataset.panel === name);
    });
    // Update URL hash without scrolling
    if (history.replaceState) {
      history.replaceState(null, "", "#" + name);
    }
  }

  buttons.forEach(function(b) {
    b.addEventListener("click", function() { show(b.dataset.tab); });
  });

  // Honor URL hash if present
  var hash = window.location.hash.replace("#", "");
  var initial = hash || tabBar.dataset.active || "preprocess";
  show(initial);
})();
