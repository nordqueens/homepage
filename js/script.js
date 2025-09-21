const body = document.body;
document.querySelectorAll('.news-card').forEach(card=>{
  card.addEventListener('click', ()=>{
    const id = card.getAttribute('data-modal');
    const modal = document.getElementById(id);
    if(!modal) return;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
    body.style.overflow = 'hidden'; // Hintergrund fixieren
  });
});

document.querySelectorAll('.modal').forEach(modal=>{
  const closeModal = ()=>{
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
    body.style.overflow = ''; // Scroll wieder erlauben
  };
  modal.querySelectorAll('[data-close], .modal-close').forEach(btn=>{
    btn.addEventListener('click', closeModal);
  });
  modal.addEventListener('click', e=>{
    if(e.target.classList.contains('modal-backdrop')) closeModal();
  });
  document.addEventListener('keydown', e=>{
    if(e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });
});

// Lightbox für Galerie
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const lightboxCap = document.querySelector(".lightbox-caption");
const closeBtn = document.querySelector(".lightbox .close");

document.querySelectorAll(".gallery-scroll img").forEach(img=>{
  img.addEventListener("click", ()=>{
    lightbox.classList.add("show");
    lightbox.setAttribute("aria-hidden","false");
    lightboxImg.src = img.src;
    lightboxCap.textContent = img.alt;
  });
});

closeBtn.addEventListener("click", ()=>{
  lightbox.classList.remove("show");
  lightbox.setAttribute("aria-hidden","true");
});

// Schließen mit ESC oder Klick aufs Overlay
lightbox.addEventListener("click", (e)=>{
  if(e.target === lightbox){
    lightbox.classList.remove("show");
    lightbox.setAttribute("aria-hidden","true");
  }
});
document.addEventListener("keydown", e=>{
  if(e.key==="Escape") lightbox.classList.remove("show");
});

// Lightbox für Galerie mit Navigation
const galleryImgs = [...document.querySelectorAll(".gallery-scroll img")];
let currentIndex = 0;

function openLightbox(index){
  currentIndex = index;
  const img = galleryImgs[index];
  lightboxImg.src = img.src;
  lightboxCap.textContent = img.alt;
  lightbox.classList.add("show");
  lightbox.setAttribute("aria-hidden","false");
}

function closeLightbox(){
  lightbox.classList.remove("show");
  lightbox.setAttribute("aria-hidden","true");
}

function showNext(){
  currentIndex = (currentIndex + 1) % galleryImgs.length;
  openLightbox(currentIndex);
}
function showPrev(){
  currentIndex = (currentIndex - 1 + galleryImgs.length) % galleryImgs.length;
  openLightbox(currentIndex);
}

galleryImgs.forEach((img,i)=>{
  img.addEventListener("click", ()=>openLightbox(i));
});

closeBtn.addEventListener("click", closeLightbox);
document.querySelector(".arrow.next").addEventListener("click", showNext);
document.querySelector(".arrow.prev").addEventListener("click", showPrev);

// ESC & Pfeiltasten
document.addEventListener("keydown", e=>{
  if(!lightbox.classList.contains("show")) return;
  if(e.key==="Escape") closeLightbox();
  if(e.key==="ArrowRight") showNext();
  if(e.key==="ArrowLeft") showPrev();
});

// Klick auf Hintergrund
lightbox.addEventListener("click", (e)=>{
  if(e.target === lightbox) closeLightbox();
});