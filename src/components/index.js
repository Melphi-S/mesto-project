import '../styles/index.css';
import addNewPlace from './card.js';
import {openPopup, closePopup} from './modal.js';
import {enableValidation, checkInputValidity} from './validate.js';

const currentElements = {
    formSelector: '.popup__edit-form',
    inputSelector: '.popup__form-item',
    submitButtonSelector: '.popup__form-button',
    inactiveButtonClass: 'popup__form-button_inactive',
    inputErrorClass: 'popup__form-item_type_error',
    errorClass: 'popup__input-error_active'
  }

const popups = document.querySelectorAll(".popup")

const infoPopup = document.querySelector(".popup_type_info"); // попап для редактирования профиля
const formInfo = document.querySelector(".popup__edit-form_type_info"); // форма для редактирования профиля
const inputName = document.querySelector('.popup__edit-form input[name="traveller-name"]'); // инпут для имени
const inputProfession = document.querySelector('.popup__edit-form input[name="traveller-profession"]'); //инпут для рода деятельности
const travelerName = document.querySelector(".traveler__name"); // имя профиля
const travelerProfession = document.querySelector(".traveler__profession"); // род деятельности профиля

const placePopup = document.querySelector(".popup_type_place"); // попап для добавления карточки
const formPlace = document.querySelector(".popup__edit-form_type_place"); // форма для добавления карточки
const buttonPlace = formPlace.querySelector('.popup__form-button'); // submit формы для добавления карточки
const inputPlaceName = document.querySelector('.popup__edit-form input[name="new-place-name"]'); // инпут для места
const inputPlaceImage = document.querySelector('.popup__edit-form input[name="new-place-image"]'); // инпут для ссылки на картинку

const infoOpenButton = document.querySelector(".traveler__edit-button"); // кнопка открытия
const placeOpenButton = document.querySelector(".traveler__add-button"); // кнопка открытия

infoOpenButton.addEventListener("click", () => {
  inputName.value = travelerName.textContent;
  inputProfession.value = travelerProfession.textContent;
  checkInputValidity(formInfo, inputName, currentElements);
  checkInputValidity(formInfo, inputProfession, currentElements);
  openPopup(infoPopup);
});

placeOpenButton.addEventListener("click", () => {
  openPopup(placePopup);
});

popups.forEach(popup => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup__overlay')) {
      closePopup(popup)
    }
    if (evt.target.classList.contains('popup__close-button')) {
      closePopup(popup)
    }
  })
})

formInfo.addEventListener("submit", function (evt) {
  evt.preventDefault();
  travelerName.textContent = inputName.value;
  travelerProfession.textContent = inputProfession.value;
  closePopup(infoPopup);
});

formPlace.addEventListener("submit", function (evt) {
  evt.preventDefault();
  addNewPlace(inputPlaceImage.value, inputPlaceName.value);
  evt.target.reset();
  buttonPlace.classList.add('popup__form-button_inactive');
  buttonPlace.setAttribute('disabled', true);
  closePopup(placePopup);
});

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

initialCards.forEach(function (item) {
  addNewPlace(item.link, item.name);
});

enableValidation(currentElements);