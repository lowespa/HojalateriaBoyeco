/* =========================================================
   Hojalatería Temuco — main.js
   1. Datos: galería de productos (sin precio) y ofertas
   2. Render galería de productos
   3. Render ofertas con carrusel de 2 imágenes
   4. Header sticky
   5. Menú hamburguesa
   6. Link activo según scroll
   7. Año dinámico
   8. Lightbox de galería (bloquea scroll del body)
   9. Ocultar WhatsApp flotante al bajar (solo desktop)
========================================================= */

/* ============ 1. Galería de productos (sin precio) ============ */
const GALERIA_PRODUCTOS = [
  {
    id: 1,
    nombre: "Canaletas de zinc",
    descripcion: "Canaleta desarrollo 33 cm, zincalum 0.40 mm. Ideal para aguas lluvia.",
    imagen: "img/productos/producto-1.jpg"
  },
  {
    id: 2,
    nombre: "Caballetes metálicos",
    descripcion: "Caballetes de zinc para techumbres, refuerzo estructural.",
    imagen: "img/productos/producto-2.jpg"
  },
  {
    id: 3,
    nombre: "Campanas de quincho",
    descripcion: "Fabricadas a medida en zinc, según las dimensiones del proyecto.",
    imagen: "img/productos/producto-3.jpg"
  },
  {
    id: 4,
    nombre: "Campanas de horno",
    descripcion: "En acero galvanizado, con ducto de salida incluido.",
    imagen: "img/productos/producto-4.jpg"
  },
  {
    id: 5,
    nombre: "Cortagoteras",
    descripcion: "Remate de techumbre en zinc, largo 2 metros.",
    imagen: "img/productos/producto-5.jpg"
  },
  {
    id: 6,
    nombre: "Bajadas de agua",
    descripcion: "Bajada de agua de zinc 3 metros, con codo incluido.",
    imagen: "img/productos/producto-6.jpg"
  },
  {
    id: 7,
    nombre: "Cañones de combustión",
    descripcion: "En acero, para estufas y calderas.",
    imagen: "img/productos/producto-7.jpg"
  },
  {
    id: 8,
    nombre: "Cañones de cocina",
    descripcion: "En acero galvanizado, medidas a pedido.",
    imagen: "img/productos/producto-8.jpg"
  },
  {
    id: 9,
    nombre: "Ductos de aire",
    descripcion: "Para ventilación y extracción, diámetro 4''.",
    imagen: "img/productos/producto-9.jpg"
  },
  {
    id: 10,
    nombre: "Ductos flexibles",
    descripcion: "Ducto flexible para extracción de aire, varias medidas.",
    imagen: "img/productos/producto-10.jpg"
  },
  {
    id: 11,
    nombre: "Planchas galvanizadas",
    descripcion: "Plancha lisa de 1x2 metros, alta durabilidad.",
    imagen: "img/productos/producto-11.jpg"
  },
  {
    id: 12,
    nombre: "Planchas de cobre",
    descripcion: "Plancha de cobre de 0.5 mm, alta durabilidad y estética.",
    imagen: "img/productos/producto-12.jpg"
  }
];

/* ============ 2. Productos en oferta (con precio) ============ */
/* Cada oferta tiene 2 imágenes: imagenes: [principal, secundaria] */
const OFERTAS = [
  {
    id: 1,
    nombre: "Canaleta estándar 1 metro",
    descripcion: "Canaleta para agua lluvia, desarrollo 33 cm, zincalum 0.40 mm.",
    precio: "$4.500",
    precioAnterior: "$6.000",
    descuento: "-25%",
    imagenes: [
      "img/productos/producto-1.jpg",
      "img/productos/producto-1b.jpg"
    ],
    masVendido: true
  },
  {
    id: 2,
    nombre: "Cañón de combustión 1 metro",
    descripcion: "Cañon de acero inoxidable de 5'' para combustión lenta",
    precio: "$89.900",
    precioAnterior: "$109.900",
    descuento: "-18%",
    imagenes: [
      "img/productos/producto-3.jpg",
      "img/productos/producto-3b.jpg"
    ],
    masVendido: false
  },
  {
    id: 3,
    nombre: "Cañón galvanizado para cocina a leña",
    descripcion: "Cañón galvanizado para cocina de 4.5''.",
    precio: "$24.900",
    precioAnterior: "$29.900",
    descuento: "-17%",
    imagenes: [
      "img/productos/producto-7.jpg",
      "img/productos/producto-7b.jpg"
    ],
    masVendido: false
  },
  {
    id: 4,
    nombre: "Gorro de cocina o combustión lenta",
    descripcion: "Gorro galvanizado para cocina o combustion lenta de 5''.",
    precio: "$15.900",
    precioAnterior: "$19.900",
    descuento: "-20%",
    imagenes: [
      "img/productos/producto-9.jpg",
      "img/productos/producto-9b.jpg"
    ],
    masVendido: false
  }
];

/* ============ 3. Render galería de productos ============ */
const productGrid = document.getElementById("productGrid");

function renderGaleria() {
  if (!productGrid) return;
  productGrid.innerHTML = GALERIA_PRODUCTOS.map(p => `
    <article class="product product--gallery">
      <div class="product__media">
        <img src="${p.imagen}" alt="${p.nombre} - Hojalatería Temuco" loading="lazy">
      </div>
      <div class="product__body">
        <h3 class="product__title">${p.nombre}</h3>
        <p class="product__desc">${p.descripcion}</p>
      </div>
    </article>
  `).join("");

  // Fallback si una imagen falla
  productGrid.querySelectorAll("img").forEach(img => {
    img.addEventListener("error", () => {
      img.style.display = "none";
      img.parentElement.style.background =
        "linear-gradient(135deg,#0d5c63,#f4a300)";
    });
  });
}
renderGaleria();

/* ============ 4. Render ofertas con carrusel ============ */
const offerGrid = document.getElementById("offerGrid");

function renderOfertas() {
  if (!offerGrid) return;

  offerGrid.innerHTML = OFERTAS.map(p => `
    <article class="offer ${p.masVendido ? 'offer--featured' : ''}">
      <div class="offer__media">
        <div class="offer__carousel" data-carousel>
          ${p.imagenes.map((img, i) => `
            <div class="offer__slide">
              <img src="${img}" alt="${p.nombre} - Hojalatería Temuco (${i + 1})" loading="lazy">
            </div>
          `).join("")}
        </div>

        <span class="offer__discount">${p.descuento}</span>
        ${p.masVendido ? `<span class="offer__best">⭐ Más vendido</span>` : ""}

        ${p.imagenes.length > 1 ? `
          <div class="offer__dots" role="tablist" aria-label="Imágenes de ${p.nombre}">
            ${p.imagenes.map((_, i) => `
              <button type="button"
                      class="offer__dot ${i === 0 ? 'is-active' : ''}"
                      role="tab"
                      aria-selected="${i === 0}"
                      aria-label="Imagen ${i + 1} de ${p.imagenes.length}"
                      data-index="${i}"></button>
            `).join("")}
          </div>
        ` : ""}
      </div>

      <div class="offer__body">
        <h3 class="offer__title">${p.nombre}</h3>
        <p class="offer__desc">${p.descripcion}</p>
        <div class="offer__prices">
          <span class="offer__price-old">${p.precioAnterior}</span>
          <span class="offer__price">${p.precio}</span>
        </div>
        <a href="https://wa.me/56912345678?text=Hola,%20quiero%20consultar%20por%20${encodeURIComponent(p.nombre)}"
           target="_blank" rel="noopener noreferrer" class="offer__btn">
          Consultar oferta
        </a>
      </div>
    </article>
  `).join("");

  // Inicializa cada carrusel
  offerGrid.querySelectorAll("[data-carousel]").forEach(initCarousel);
}

/* ---- Carrusel horizontal con snap + dots sincronizados ---- */
function initCarousel(carousel) {
  const slides = carousel.querySelectorAll(".offer__slide");
  const card = carousel.closest(".offer");
  const dots = card.querySelectorAll(".offer__dot");
  if (slides.length <= 1 || !dots.length) return;

  // Click en dot → mover scroll
  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      const i = Number(dot.dataset.index);
      carousel.scrollTo({
        left: slides[i].offsetLeft - carousel.offsetLeft,
        behavior: "smooth"
      });
    });
  });

  // Actualiza dots al hacer scroll
  let raf;
  carousel.addEventListener("scroll", () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const index = Math.round(carousel.scrollLeft / carousel.clientWidth);
      dots.forEach((d, i) => {
        const active = i === index;
        d.classList.toggle("is-active", active);
        d.setAttribute("aria-selected", active);
      });
    });
  }, { passive: true });

  // Fallback si una imagen falla
  carousel.querySelectorAll("img").forEach(img => {
    img.addEventListener("error", () => {
      img.style.display = "none";
      img.parentElement.style.background =
        "linear-gradient(135deg,#0d5c63,#f4a300)";
    });
  });
}

renderOfertas();

/* ============ 5. Header sticky ============ */
const header = document.getElementById("header");
const onScrollHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 20);
};
window.addEventListener("scroll", onScrollHeader, { passive: true });
onScrollHeader();

/* ============ 6. Menú hamburguesa ============ */
const burger = document.getElementById("burger");
const nav = document.getElementById("nav");
burger.addEventListener("click", () => {
  burger.classList.toggle("is-open");
  nav.classList.toggle("is-open");
});
nav.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => {
    burger.classList.remove("is-open");
    nav.classList.remove("is-open");
  });
});

/* ============ 7. Link activo según scroll ============ */
const sections = [...document.querySelectorAll("section[id]")];
const navLinks = [...document.querySelectorAll(".nav__link")];

const activateLink = () => {
  const y = window.scrollY + 120;
  let current = sections[0]?.id;
  sections.forEach(sec => {
    if (sec.offsetTop <= y) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${current}`);
  });
};
window.addEventListener("scroll", activateLink, { passive: true });
activateLink();

/* ============ 8. Año dinámico ============ */
document.getElementById("year").textContent = new Date().getFullYear();

/* ============ 9. Lightbox de galería (bloquea scroll del body) ============ */
document.querySelectorAll(".gallery__item").forEach(item => {
  item.addEventListener("click", e => {
    e.preventDefault();
    const src = item.getAttribute("href");
    const alt = item.querySelector("img")?.alt || "Imagen ampliada";

    const overlay = document.createElement("div");
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", alt);
    overlay.style.cssText = `
      position:fixed; inset:0; background:rgba(0,0,0,.85);
      display:grid; place-items:center; z-index:999; cursor:zoom-out;
      padding:2rem;
    `;
    overlay.innerHTML = `<img src="${src}" alt="${alt}" style="max-width:90vw;max-height:85vh;border-radius:12px;box-shadow:0 20px 60px rgba(0,0,0,.5)">`;

    const close = () => {
      overlay.remove();
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
    const onKey = ev => { if (ev.key === "Escape") close(); };

    overlay.addEventListener("click", close);
    document.addEventListener("keydown", onKey);

    document.body.style.overflow = "hidden";
    document.body.appendChild(overlay);
  });
});

/* ============ 10. Ocultar WhatsApp flotante al bajar (SOLO desktop) ============ */
const waFloat = document.querySelector(".wa-float");
let lastY = window.scrollY;

window.addEventListener("scroll", () => {
  const y = window.scrollY;
  const goingDown = y > lastY && y > 120;
  const isMobile = window.matchMedia("(max-width: 720px)").matches;

  if (waFloat && !isMobile) {
    waFloat.classList.toggle("is-hidden-scroll", goingDown);
  }

  lastY = y;
}, { passive: true });