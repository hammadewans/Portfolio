document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const menuBtn = document.getElementById("menuBtn");
  const navMenu = document.getElementById("navMenu");

  window.addEventListener("scroll", () => navbar.classList.toggle("scrolled", window.scrollY > 20));

  menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("open");
    menuBtn.innerHTML = navMenu.classList.contains("open")
      ? '<i class="ri-close-line"></i>'
      : '<i class="ri-menu-3-line"></i>';
  });

  navMenu.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuBtn.innerHTML = '<i class="ri-menu-3-line"></i>';
  }));

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  const filterButtons = document.querySelectorAll("#filters button");
  const cards = document.querySelectorAll(".project-card");
  filterButtons.forEach(btn => btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    cards.forEach(card => {
      const show = filter === "all" || card.dataset.category.split(" ").includes(filter);
      card.style.display = show ? "" : "none";
    });
  }));

  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(".hero .reveal", { opacity: 1, y: 0, duration: .9, stagger: .12, ease: "power3.out" });
    gsap.utils.toArray(".section .reveal").forEach(el => {
      gsap.to(el, {
        opacity: 1, y: 0, duration: .7, ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true }
      });
    });
  } else {
    document.querySelectorAll(".reveal").forEach(el => { el.style.opacity = 1; el.style.transform = "none"; });
  }

  if (window.Typed) {
    const hero = document.querySelector(".hero-copy");
    const original = hero.textContent;
    hero.innerHTML = '<span id="typed"></span>';
    new Typed("#typed", {
      strings: [
        original,
        "I build practical web applications, APIs and database-driven systems.",
        "Currently open to entry-level and junior developer opportunities."
      ],
      typeSpeed: 18,
      backSpeed: 8,
      backDelay: 2200,
      loop: true
    });
  }
});

// Certificate / diploma click-to-preview lightbox
document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("documentLightbox");
  const preview = document.getElementById("documentLightboxImage");
  const closeBtn = lightbox?.querySelector(".document-lightbox-close");
  const backdrop = lightbox?.querySelector(".document-lightbox-backdrop");

  if (!lightbox || !preview) return;

  document.querySelectorAll(".document-view-link").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      preview.src = link.getAttribute("href");
      preview.alt = link.getAttribute("aria-label") || "Certificate preview";
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.classList.add("lightbox-open");
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");
    preview.removeAttribute("src");
  };

  closeBtn?.addEventListener("click", closeLightbox);
  backdrop?.addEventListener("click", closeLightbox);
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && lightbox.classList.contains("is-open")) closeLightbox();
  });
});


// Subtle cursor-following background shine
(function(){
  const root = document.documentElement;
  let raf = null;
  let x = window.innerWidth * .5;
  let y = window.innerHeight * .5;
  function paint(){
    root.style.setProperty('--cursor-x', x + 'px');
    root.style.setProperty('--cursor-y', y + 'px');
    raf = null;
  }
  window.addEventListener('pointermove', function(e){
    x = e.clientX;
    y = e.clientY;
    if(!raf) raf = requestAnimationFrame(paint);
  }, {passive:true});
})();
