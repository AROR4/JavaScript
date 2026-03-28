const gallery = document.querySelector(".gallery");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeBtn = document.getElementById("closeBtn");

gallery.addEventListener("click", (event) => {
  const thumbnail = event.target.closest(".thumbnail");

  if (!thumbnail) {
    return;
  }

  lightboxImage.src = thumbnail.dataset.large;
  lightboxImage.alt = thumbnail.alt;
  lightbox.classList.add("show");
});

closeBtn.addEventListener("click", () => {
  lightbox.classList.remove("show");
});

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    lightbox.classList.remove("show");
  }
});
