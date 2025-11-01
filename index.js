document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll("h1, p, .subject-box");
  elements.forEach((el, index) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    setTimeout(() => {
      el.style.transition = "all 0.6s ease";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 200 * index);
  });
});

const navLinks = document.querySelectorAll(".nav-links a");
navLinks.forEach(link => {
  link.addEventListener("mouseenter", () => {
    link.style.color = "#ffcc00";
    link.style.transition = "color 0.3s ease";
  });
  link.addEventListener("mouseleave", () => {
    link.style.color = "";
  });
});

const subjects = document.querySelectorAll(".subject-box");
subjects.forEach(box => {
  box.addEventListener("click", () => {
    box.style.transform = "scale(0.95)";
    setTimeout(() => {
      box.style.transform = "scale(1)";
    }, 150);
  });
});

const menuButton = document.querySelector(".menu-toggle");
if (menuButton) {
  const navLinksContainer = document.querySelector(".nav-links");
  menuButton.addEventListener("click", () => {
    navLinksContainer.classList.toggle("active");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const fadeElements = document.querySelectorAll("h1, .subject-box");
  fadeElements.forEach((el, i) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(40px)";
    setTimeout(() => {
      el.style.transition = "all 0.8s ease";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 200 * i);
  });
});

const subjectBoxes = document.querySelectorAll(".subject-box");

subjectBoxes.forEach(box => {
  box.addEventListener("mousedown", () => {
    box.style.transform = "scale(0.93)";
    box.style.transition = "transform 0.15s ease";
  });

  box.addEventListener("mouseup", () => {
    box.style.transform = "scale(1)";
    box.style.transition = "transform 0.25s ease";
  });

  box.addEventListener("mouseleave", () => {
    box.style.transform = "scale(1)";
  });

  box.addEventListener("mouseenter", () => {
    box.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.15)";
    box.style.transform = "translateY(-6px)";
    box.style.transition = "all 0.3s ease";
  });

  box.addEventListener("mouseleave", () => {
    box.style.boxShadow = "";
    box.style.transform = "translateY(0)";
  });
});
