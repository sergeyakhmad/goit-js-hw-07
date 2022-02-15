import { galleryItems } from "./gallery-items.js";

const galleryContainerEl = document.querySelector(".gallery");
galleryContainerEl.addEventListener("click", onGalleryContainerClick);

const galleryItemsMarkup = createGalleryItemsMarkup(galleryItems);
populateGallery(galleryItemsMarkup);

function createGalleryItemsMarkup(items) {
  return items
    .map(
      ({ preview, original, description }) =>
        `<div class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </div>`
    )
    .join("");
}

function populateGallery(markup) {
  galleryContainerEl.innerHTML = markup;
}

function onGalleryContainerClick(evt) {
  evt.preventDefault();

  const isGalleryImgEl = evt.target.classList.contains("gallery__image");
  if (!isGalleryImgEl) return;

  openModal(evt);
}

function openModal(evt) {
  const linkOriginalImg = evt.target.dataset.source;
  const instance = basicLightbox.create(`<img src="${linkOriginalImg}">`, {
    onShow: () => {
      window.addEventListener("keydown", closeModal);
    },
    onClose: () => {
      window.removeEventListener("keydown", closeModal);
    },
  });

  function closeModal(evt) {
    if (evt.code === "Escape") {
      instance.close();
    }
  }

  instance.show();
}
