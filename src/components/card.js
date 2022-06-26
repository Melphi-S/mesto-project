import {openPopup} from './modal.js';

const placeTemplate = document.querySelector("#place").content; // шаблон карточки
const placesList = document.querySelector(".places__list"); // список карточек

const zoomPopup = document.querySelector(".popup_type_zoom"); //попап для зума
const zoomImage = zoomPopup.querySelector(".popup__image"); // картинка в попапе
const zoomCaption = zoomPopup.querySelector(".popup__caption"); // подпись к картинке

function createNewPlace(src, placeName, likes) {
  const newPlace = placeTemplate.querySelector(".place").cloneNode(true); // новая карточка
  const newPlaceImage = newPlace.querySelector(".place__image"); // новое изображение карточки
  const newPlaceName = newPlace.querySelector(".place__name"); // новое имя карточки
  const likeButton = newPlace.querySelector(".place__like-button"); // кнопка like
  const likeCounter = newPlace.querySelector(".place__like-counter"); //
  const deleteButton = newPlace.querySelector(".place__delete-button"); // кнопка удалить
  const zoomOpenButton = newPlace.querySelector(".place__image"); // кнопка открытия зума

  newPlaceImage.src = src;
  newPlaceImage.alt = placeName;
  newPlaceName.textContent = placeName;
  likeCounter.textContent = likes;

  // функционал кнопки like
  likeButton.addEventListener("click", function (evt) {
    evt.target.classList.toggle("place__like-button_active");
  });

  // функционал кнопки delete;
  deleteButton.addEventListener("click", function () {
    deleteButton.closest(".place").remove();
  });

  // открытие попапа для зума
  zoomOpenButton.addEventListener("click", function () {
    openPopup(zoomPopup);
    zoomImage.src = src;
    zoomImage.alt = placeName;
    zoomCaption.textContent = placeName;
  });
  return newPlace;
}

export function addNewPlace(src, placeName, likes) {
  const newPlaceElement = createNewPlace(src, placeName, likes);
  placesList.prepend(newPlaceElement);
}

// export function countLikes(number, card) {
//   likeCounter = card.querySelector('.place__like-counter');
//   likeCounter.textContent = number;
// }


