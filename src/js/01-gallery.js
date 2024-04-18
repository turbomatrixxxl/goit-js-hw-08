// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

// Descris în documentație
import SimpleLightbox from 'simplelightbox';
// Import suplimentar de stil
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const images = [];

galleryItems.forEach(item => {
  const image = `<li class="gallery__item"><a class="gallery__link" href="${item.original}"><img class="gallery__image" data-source="${item.original}" src="${item.preview}" alt="${item.description}"></a></li>
`;
  images.push(image);
});

gallery.innerHTML = images;
console.log(gallery);

// getting the li and link arrays by class css selector
// const galleryItem = document.querySelectorAll(".gallery__item");
// console.log(galleryItem);
const gallery__link = document.querySelectorAll('.gallery__link');
console.log(gallery__link);

gallery__link.forEach(element => {
  element.addEventListener('click', ev => {
    //   preventing link natural action
    ev.preventDefault();
    const elementImage = element.querySelector('.gallery__image');

    // changing the src image path on click event
    elementImage.src = element.href;

    // setting the modal window gallery using the SimpleLightbox library and adding "alt" caption title on bottom with 250 ms delay
    let gallery = new SimpleLightbox(`.gallery a`, {
      captionsData: 'alt',
      captionDelay: 250,
    });
  });
});
