const infoPopup = document.querySelector(".popup_type_info"); // попап для редактирования профиля
const infoOpenButton = document.querySelector(".traveler__edit-button"); // кнопка открытия

const placePopup = document.querySelector(".popup_type_place"); // попап для добавления карточки
const placeOpenButton = document.querySelector(".traveler__add-button"); // кнопка открытия

const zoomPopup = document.querySelector(".popup_type_zoom"); //попап для зума
const zoomImage = zoomPopup.querySelector(".popup__image") // картинка в попапе
const zoomCaption = zoomPopup.querySelector(".popup__caption") // подпись к картинке

const closeButtons = document.querySelectorAll(".popup__close-button") // кнопки закрытия попапов

const placeTemplate = document.querySelector("#place").content; // шаблон карточки
const placesList = document.querySelector(".places__list"); // список карточек

const travelerName = document.querySelector(".traveler__name"); // имя профиля
const travelerProfession = document.querySelector(".traveler__profession"); // род деятельности профиля
const formInfoSubmit = document.querySelector(".popup__edit-form_type_info"); // форма для редактирования профиля
const popupName = document.querySelector('.popup__edit-form input[name="name"]'); // инпут для имени
const popupProfession = document.querySelector('.popup__edit-form input[name="profession"]'); //инпут для рода деятельности

const formPlacesSubmit = document.querySelector(".popup__edit-form_type_place"); // форма для добавления карточки
const popupPlace = document.querySelector('.popup__edit-form input[name="place"]'); // инпут для места
const popupLink = document.querySelector('.popup__edit-form input[name="link"]'); // инпут для ссылки на картинку

// открытие попапов

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

infoOpenButton.addEventListener("click", () => {
  popupName.value = travelerName.textContent;
  popupProfession.value = travelerProfession.textContent;
  openPopup(infoPopup);
});

placeOpenButton.addEventListener("click", () => {
  openPopup(placePopup);
});

// закрытие попапов

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

closeButtons.forEach (function (button) {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup))
});

// редактирование профиля

formInfoSubmit.addEventListener("submit", function (evt) {
  evt.preventDefault();
  travelerName.textContent = popupName.value;
  travelerProfession.textContent = popupProfession.value;
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

formPlacesSubmit.addEventListener("submit", function (evt) {
  evt.preventDefault();
  addNewPlace(popupLink.value, popupPlace.value);
  evt.target.reset();
  closePopup(placePopup);
});