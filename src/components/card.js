import {closePopup, openPopup} from './modal.js';
import {putLike, deleteLike, deleteCard} from './api.js'

const placeTemplate = document.querySelector("#place").content; // шаблон карточки
const placesList = document.querySelector(".places__list"); // список карточек

const zoomPopup = document.querySelector(".popup_type_zoom"); //попап для зума
const zoomImage = zoomPopup.querySelector(".popup__image"); // картинка в попапе
const zoomCaption = zoomPopup.querySelector(".popup__caption"); // подпись к картинке

const deletionPopup = document.querySelector(".popup_type_deletion"); //попап для удаления карточки
const deletionForm = document.querySelector(".popup__edit-form_type_deletion"); //форма для удаления карточки

function createNewPlace(cardInfo) {
  const newPlace = placeTemplate.querySelector(".place").cloneNode(true); // новая карточка
  const newPlaceImage = newPlace.querySelector(".place__image"); // новое изображение карточки
  const newPlaceName = newPlace.querySelector(".place__name"); // новое имя карточки
  const likeButton = newPlace.querySelector(".place__like-button"); // кнопка like
  const likeCounter = newPlace.querySelector(".place__like-counter"); //
  const deleteButton = newPlace.querySelector(".place__delete-button"); // кнопка удалить
  const zoomOpenButton = newPlace.querySelector(".place__image"); // кнопка открытия зума
  
  newPlaceImage.src = cardInfo.link;
  newPlaceImage.alt = cardInfo.name;
  newPlaceName.textContent = cardInfo.name;
  newPlace.id = cardInfo._id;
  likeCounter.textContent = cardInfo.likes.length;

  // функционал кнопки like
  likeButton.addEventListener("click", function (evt) {
    if (!evt.target.classList.contains("place__like-button_active")) {
      putLike(cardInfo._id)
        .then(res => {
          evt.target.classList.add("place__like-button_active");
          likeCounter.textContent = res.likes.length;
        })
        .catch(err => console.log(err))
    }
    else {
      deleteLike(cardInfo._id)
      .then(res => {
        evt.target.classList.remove("place__like-button_active");
        likeCounter.textContent = res.likes.length;
      })
      .catch(err => console.log(err))
    }  
  });

  // функционал кнопки delete;
  deleteButton.addEventListener("click", function () {
    openPopup(deletionPopup);
    deletionForm.addEventListener("submit", function (evt) {
      evt.preventDefault();
      deleteCard(cardInfo._id)
        .then (() => {
          deleteButton.closest(".place").remove();
          closePopup(deletionPopup);
        })
        .catch(err => console.log(err))
    });
   });

  // открытие попапа для зума
  zoomOpenButton.addEventListener("click", function () {
    openPopup(zoomPopup);
    zoomImage.src = cardInfo.link;
    zoomImage.alt = cardInfo.name;
    zoomCaption.textContent = cardInfo.name;
  });
  return newPlace;
}

export default function addNewPlace(cardInfo) {
  const newPlaceElement = createNewPlace(cardInfo);
  placesList.prepend(newPlaceElement);
}

