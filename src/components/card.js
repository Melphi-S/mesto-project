import {openPopup} from './modal.js';

const placeTemplate = document.querySelector("#place").content; // шаблон карточки
const placesList = document.querySelector(".places__list"); // список карточек

const zoomPopup = document.querySelector(".popup_type_zoom"); //попап для зума
const zoomImage = zoomPopup.querySelector(".popup__image"); // картинка в попапе
const zoomCaption = zoomPopup.querySelector(".popup__caption"); // подпись к картинке

function createNewPlace(src, placeName) {
  const newPlace = placeTemplate.querySelector(".place").cloneNode(true); // новая карточка
  const newPlaceImage = newPlace.querySelector(".place__image"); // новое изображение карточки
  const newPlaceName = newPlace.querySelector(".place__name"); // новое имя карточки
  const likeButton = newPlace.querySelector(".place__like-button"); // кнопка like
  const deleteButton = newPlace.querySelector(".place__delete-button"); // кнопка удалить
  const zoomOpenButton = newPlace.querySelector(".place__image"); // кнопка открытия зума

  newPlaceImage.src = src;
  newPlaceImage.alt = placeName;
  newPlaceName.textContent = placeName;

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

export default function addNewPlace(src, placeName) {
  const newPlaceElement = createNewPlace(src, placeName);
  placesList.prepend(newPlaceElement);
}


