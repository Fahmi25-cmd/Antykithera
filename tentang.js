document.addEventListener("DOMContentLoaded", () => {
  const fadeElements = document.querySelectorAll(
    ".hero-content, .sejarah .text, .sejarah .image, .visi-misi h2, .feature-box, .team h2, .team-member, footer"
  );

  fadeElements.forEach((el, i) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    setTimeout(() => {
      el.style.transition = "all 0.7s ease";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 250 * i);
  });
});

const navLinks = document.querySelectorAll(".nav-links a");
navLinks.forEach(link => {
  link.addEventListener("mouseenter", () => {
    link.style.color = "#f0c000";
    link.style.transition = "color 0.3s ease";
  });
  link.addEventListener("mouseleave", () => {
    if (!link.classList.contains("active")) link.style.color = "";
  });
});

const sejarahImage = document.querySelector(".sejarah .image img");
if (sejarahImage) {
  sejarahImage.addEventListener("mouseenter", () => {
    sejarahImage.style.transform = "scale(1.05)";
    sejarahImage.style.transition = "transform 0.4s ease";
  });
  sejarahImage.addEventListener("mouseleave", () => {
    sejarahImage.style.transform = "scale(1)";
  });
}

const teamMembers = document.querySelectorAll(".team-member");
teamMembers.forEach(member => {
  member.addEventListener("mouseenter", () => {
    member.style.transform = "translateY(-5px)";
    member.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.15)";
    member.style.transition = "all 0.3s ease";
  });
  member.addEventListener("mouseleave", () => {
    member.style.transform = "translateY(0)";
    member.style.boxShadow = "";
  });
});

window.addEventListener("scroll", () => {
  const revealElements = document.querySelectorAll(".feature-box, .team-member");
  revealElements.forEach(el => {
    const position = el.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (position < windowHeight - 100) {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
      el.style.transition = "all 0.6s ease";
    }
  });
});
