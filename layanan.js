document.addEventListener("DOMContentLoaded", () => {
  const fadeElements = document.querySelectorAll(".intro h1, .intro p, .card");
  fadeElements.forEach((el, i) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(25px)";
    setTimeout(() => {
      el.style.transition = "all 0.6s ease";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 200 * i);
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

const cards = document.querySelectorAll(".card");
cards.forEach(card => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-8px)";
    card.style.boxShadow = "0 10px 20px rgba(0,0,0,0.15)";
    card.style.transition = "all 0.3s ease";
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0)";
    card.style.boxShadow = "";
  });
});

const buttons = document.querySelectorAll(".btn-layanan");
buttons.forEach(btn => {
  btn.addEventListener("mousedown", () => {
    btn.style.transform = "scale(0.95)";
  });
  btn.addEventListener("mouseup", () => {
    btn.style.transform = "scale(1)";
  });
  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "scale(1)";
  });
});

window.addEventListener("scroll", () => {
  const scrollElements = document.querySelectorAll(".card");
  scrollElements.forEach(el => {
    const position = el.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (position < windowHeight - 100) {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
      el.style.transition = "all 0.6s ease";
    }
  });
});

const tombolLayanan = document.querySelectorAll(".btn-layanan");

tombolLayanan.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault(); 

    const teks = btn.textContent.toLowerCase();

    if (teks.includes("gunakan")) {
      window.location.href = "kalkulator.html"; 
    } else if (teks.includes("jelajahi")) {
      window.location.href = "statistik.html"; 
    } else if (teks.includes("coba")) {
      window.location.href = "konversi.html"; 
    }
  });
});
