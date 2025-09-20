// News: Karten -> Modal
document.querySelectorAll('.news-card').forEach(card => {
  card.addEventListener('click', () => {
    const id = card.getAttribute('data-modal');
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
    // ESC schließen
    const onKey = (e) => { if (e.key === 'Escape') close(); };
    const close = () => {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden','true');
      document.removeEventListener('keydown', onKey);
    };
    modal.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', close, { once:true }));
    document.addEventListener('keydown', onKey);
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