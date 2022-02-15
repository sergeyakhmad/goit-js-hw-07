import { galleryItems } from "./gallery-items.js";

const galleryContainerEl = document.querySelector(".gallery");
// galleryContainerEl.addEventListener("click", onGalleryContainerClick);

const galleryItemsMarkup = createGalleryItemsMarkup(galleryItems);
populateGallery(galleryItemsMarkup);

function createGalleryItemsMarkup(items) {
  return items
    .map(
      ({ preview, original, description }) =>
        `<li class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img class="gallery__image" src="${preview}" alt="${description}" />
        </a>
      </li>`
    )
    .join("");
}

function populateGallery(markup) {
  galleryContainerEl.innerHTML = markup;
}

let gallery = new SimpleLightbox(
  ".gallery a",
  { captionsData: "alt" },
  { captionDelay: 250 }
);
