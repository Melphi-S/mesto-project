import '../styles/index.css';
import addNewPlace from './card.js';
import {openPopup, closePopup} from './modal.js';
import {enableValidation, checkInputValidity, disableButton} from './validate.js';
import {getUserInfo, getInitialCards, patchUserAvatar, patchUserInfo, postNewCard} from './api.js';

Promise.all([getInitialCards(), getUserInfo()])
  .then(([cards, userInfo]) => {
    travelerName.textContent = userInfo.name;
    travelerProfession.textContent = userInfo.about;
    travelerAvatar.src = userInfo.avatar;
    travelerId = userInfo._id;
    cards.reverse().forEach(card => {
      addNewPlace(card, userInfo._id);
    })
  })
  .catch(err => console.log(err))

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
const buttonInfo = formInfo.querySelector('.popup__form-button'); // submit формы для редактирования профиля

let travelerId;
const travelerAvatar = document.querySelector('.traveler__photo'); // аватар
const avatarPopup = document.querySelector(".popup_type_avatar"); // попап для редактирования аватара
const formAvatar = document.querySelector(".popup__edit-form_type_avatar"); // форма для редактирования аватара
const inputAvatarImage = document.querySelector('.popup__edit-form input[name="avatar-image"]'); // инпут для ссылки на аватар
const buttonAvatar = formAvatar.querySelector('.popup__form-button'); // submit формы для редактирования аватара

const placePopup = document.querySelector(".popup_type_place"); // попап для добавления карточки
const formPlace = document.querySelector(".popup__edit-form_type_place"); // форма для добавления карточки
const buttonPlace = formPlace.querySelector('.popup__form-button'); // submit формы для добавления карточки
const inputPlaceName = document.querySelector('.popup__edit-form input[name="new-place-name"]'); // инпут для места
const inputPlaceImage = document.querySelector('.popup__edit-form input[name="new-place-image"]'); // инпут для ссылки на картинку

const infoOpenButton = document.querySelector(".traveler__edit-button"); // кнопка открытия для редактирования инфо
const placeOpenButton = document.querySelector(".traveler__add-button"); // кнопка открытия для добавления места
const avatarOpenButton = document.querySelector('.traveler__photo-container'); // кнопка открытия для редактирования автара

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

avatarOpenButton.addEventListener("click", () => {
  openPopup(avatarPopup);
});

popups.forEach(popup => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
      closePopup(popup)
    }
  })
})

formAvatar.addEventListener("submit", function (evt) {
  evt.preventDefault();
  buttonAvatar.textContent = "Сохранение..."
  patchUserAvatar({avatar: inputAvatarImage.value})
    .then ((userInfo) => {
      travelerAvatar.src = userInfo.avatar;
      evt.target.reset();
      disableButton(buttonAvatar, currentElements);
      closePopup(avatarPopup);
    } )
    .catch(err => console.log(err))
    .finally (() => buttonAvatar.textContent = "Сохранить")
});

formInfo.addEventListener("submit", function (evt) {
  buttonInfo.textContent = "Сохранение..."
  evt.preventDefault();
  patchUserInfo({ name: inputName.value, about: inputProfession.value })
    .then((userInfo) => {
      travelerName.textContent = userInfo.name;
      travelerProfession.textContent = userInfo.about;
      disableButton(buttonInfo, currentElements);
      closePopup(infoPopup);
    })
    .catch((err) => console.log(err))
    .finally (() => buttonInfo.textContent = "Сохранить")
});

formPlace.addEventListener("submit", function (evt) {
  buttonPlace.textContent = "Сохранение..."
  evt.preventDefault();
  postNewCard({name: inputPlaceName.value, link: inputPlaceImage.value})
    .then((card) => {
      addNewPlace(card, travelerId);
      evt.target.reset();
      disableButton(buttonPlace, currentElements);
      closePopup(placePopup);
   })
    .catch((err) => console.log(err))
    .finally (() => buttonPlace.textContent = "Сохранить")
});

enableValidation(currentElements);