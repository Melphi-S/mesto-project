const infoPopup = document.querySelector(".popup_type_info"); // попап для редактирования профиля
const infoOpenButton = document.querySelector(".traveler__edit-button"); // кнопка открытия

const placePopup = document.querySelector(".popup_type_place"); // попап для добавления карточки
const placeOpenButton = document.querySelector(".traveler__add-button"); // кнопка открытия

const zoomPopup = document.querySelector(".popup_type_zoom"); //попап для зума
const zoomImage = zoomPopup.querySelector(".popup__image") // картинка в попапе
const zoomCaption = zoomPopup.querySelector(".popup__caption") // подпись к картинке

const closeButtons = document.querySelectorAll(".popup__close-button") // кнопки закрытия попапов
const closeAreas = document.querySelectorAll(".popup__overlay"); // оверлеи для закрытия попапов

const placeTemplate = document.querySelector("#place").content; // шаблон карточки
const placesList = document.querySelector(".places__list"); // список карточек

const travelerName = document.querySelector(".traveler__name"); // имя профиля
const travelerProfession = document.querySelector(".traveler__profession"); // род деятельности профиля

const formInfo = document.querySelector(".popup__edit-form_type_info"); // форма для редактирования профиля
const inputName = document.querySelector('.popup__edit-form input[name="traveller-name"]'); // инпут для имени
const inputProfession = document.querySelector('.popup__edit-form input[name="traveller-profession"]'); //инпут для рода деятельности

const formPlace = document.querySelector(".popup__edit-form_type_place"); // форма для добавления карточки
const inputPlaceName = document.querySelector('.popup__edit-form input[name="new-place-name"]'); // инпут для места
const inputPlaceImage = document.querySelector('.popup__edit-form input[name="new-place-image"]'); // инпут для ссылки на картинку

const currentElements = {
  formSelector: '.popup__edit-form',
  inputSelector: '.popup__form-item',
  submitButtonSelector: '.popup__form-button',
  inactiveButtonClass: 'popup__form-button_inactive',
  inputErrorClass: 'popup__form-item_type_error',
  errorClass: 'popup__input-error_active'
}

// открытие попапов

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", pressEsc);
}

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

// закрытие попапов

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", pressEsc);
}

function pressEsc(evt) {
  const popupOpened = document.querySelector(".popup_opened");
  if (evt.key === 'Escape') {
    closePopup(popupOpened);
  }  
}

closeButtons.forEach (function (button) {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup))
});

closeAreas.forEach (function (area) {
  const popup = area.closest(".popup");
  area.addEventListener("click", () => closePopup(popup))
});

// редактирование профиля

formInfo.addEventListener("submit", function (evt) {
  evt.preventDefault();
  travelerName.textContent = inputName.value;
  travelerProfession.textContent = inputProfession.value;
  closePopup(infoPopup);
});

// создание новой карточки

function createNewPlace (src, placeName) {
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

// добавление карточек в DOM

function addNewPlace(src, placeName) {
  const newPlaceElement = createNewPlace(src, placeName);
  placesList.prepend(newPlaceElement);
}

//  добавление карточек в DOM / карточки при загрузке страницы

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

//  добавление карточек в DOM / добавление новой карточки

formPlace.addEventListener("submit", function (evt) {
  evt.preventDefault();
  addNewPlace(inputPlaceImage.value, inputPlaceName.value);
  evt.target.reset();
  closePopup(placePopup);
});

// валидация форм

function showInputError(form, input, errorMessage, elements) {
  const inputError = form.querySelector(`.${input.id}-error`);
  input.classList.add(elements.inputErrorClass);
  inputError.textContent = errorMessage;
  inputError.classList.add(elements.errorClass);
}

function hideInputError(form, input, elements) {
  const inputError = form.querySelector(`.${input.id}-error`);
  input.classList.remove(elements.inputErrorClass);
  inputError.textContent = '';
  inputError.classList.remove(elements.errorClass);
}

function checkInputValidity(form, input, elements) {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, elements);
  }
  else {
    hideInputError(form, input, elements);
  }
}

function hasInvalidInput (inputList) {
  return inputList.some(input => !input.validity.valid);
}

function toggleButtonState (inputList, button, elements) {
  if (hasInvalidInput (inputList)) {
    button.classList.add(elements.inactiveButtonClass);
    button.setAttribute('disabled', true);
  }
  else {
    button.classList.remove(elements.inactiveButtonClass);
    button.removeAttribute('disabled');
  }
}

function setEventListeners(form, elements) {
  const inputList = Array.from(form.querySelectorAll(elements.inputSelector));
  const button = form.querySelector(elements.submitButtonSelector);
  toggleButtonState (inputList, button, elements);
  inputList.forEach(input => {
    input.addEventListener('input', () => {
      checkInputValidity(form, input, elements);
      toggleButtonState (inputList, button, elements);
    })
  })
}

function enableValidation(elements) {
  const formList = Array.from(document.querySelectorAll(elements.formSelector));
  formList.forEach(form => {
    setEventListeners(form, elements);
  })
}

enableValidation(currentElements);