// открытие/закрытие попапов

const infoPopup = document.querySelector(".popup_type_info"); // попап для редактирования профиля
const infoOpenButton = document.querySelector(".traveler__edit-button"); // кнопка открытия
const infoCloseButton = infoPopup.querySelector(".popup__close-button"); // кнопка закрытия
const placePopup = document.querySelector(".popup_type_place"); // попап для добавления карточки
const placeOpenButton = document.querySelector(".traveler__add-button"); // кнопка открытия
const placeCloseButton = placePopup.querySelector(".popup__close-button"); // кнопка закрытия
const zoomPopup = document.querySelector(".popup_type_zoom"); //попап для зума
const zoomCloseButton = zoomPopup.querySelector(".popup__close-button"); // кнопка закрытия

function togglePopup(popup) {
  popup.classList.toggle("popup_opened");
}

[infoOpenButton, infoCloseButton].forEach(function (button) {
  button.addEventListener("click", () => {
    togglePopup(infoPopup);
  });
});

[placeOpenButton, placeCloseButton].forEach(function (button) {
  button.addEventListener("click", () => {
    togglePopup(placePopup);
  });
});

zoomCloseButton.addEventListener("click", function () {
  togglePopup(zoomPopup);
});

// редактирование профиля

const travelerName = document.querySelector(".traveler__name"); // имя профиля
const travelerProfession = document.querySelector(".traveler__profession"); // род деятельности профиля
const formInfoSubmit = document.querySelector(".popup__edit-form_type_info"); // форма для редактирования профиля
const popupName = document.querySelector('.popup__edit-form input[name="name"]'); // инпут для имени
const popupProfession = document.querySelector('.popup__edit-form input[name="profession"]'); //инпут для рода деятельности

popupName.value = travelerName.textContent;
popupProfession.value = travelerProfession.textContent;

formInfoSubmit.addEventListener("submit", function (evt) {
  evt.preventDefault();
  travelerName.textContent = popupName.value;
  travelerProfession.textContent = popupProfession.value;
  togglePopup(infoPopup);
});

// добавление карточек в DOM

const placeTemplate = document.querySelector("#place").content; // шаблон карточки
const placesList = document.querySelector(".places__list"); // список карточек

function NewPlace(src, placeName) {
  const newCard = placeTemplate.querySelector(".place").cloneNode(true);
  newCard.querySelector(".place__image").src = src;
  newCard.querySelector(".place__name").textContent = placeName;

  // кнопка like
  newCard
    .querySelector(".place__like-button")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("place__like-button_active");
    });

  // кнопка delete;
  const deleteButton = newCard.querySelector(".place__delete-button");
  deleteButton.addEventListener("click", function () {
    deleteButton.closest(".place").remove();
  });

  // zoom картинки
  const zoomOpenButton = newCard.querySelector(".place__image"); // кнопка открытия
  zoomOpenButton.addEventListener("click", function () {
    togglePopup(zoomPopup);
    zoomPopup.querySelector(".popup__image").src = zoomOpenButton.src;
    zoomPopup.querySelector(".popup__caption").textContent =
      newCard.querySelector(".place__name").textContent;
  });

  placesList.prepend(newCard);
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
  NewPlace(item.link, item.name);
});

//  добавление карточек в DOM / добавление новой карточки

const formPlacesSubmit = document.querySelector(".popup__edit-form_type_place"); // форма для добавления карточки
const popupPlace = document.querySelector('.popup__edit-form input[name="place"]'); // инпут для места
const popupLink = document.querySelector('.popup__edit-form input[name="link"]'); // инпут для ссылки на картинку

formPlacesSubmit.addEventListener("submit", function (evt) {
  evt.preventDefault();
  NewPlace(popupLink.value, popupPlace.value);
  popupLink.value = "";
  popupPlace.value = "";
  togglePopup(placePopup);
});
