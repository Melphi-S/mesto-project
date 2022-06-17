function showInputError(form, input, errorMessage, elements) {
  const inputError = form.querySelector(`.${input.id}-error`);
  input.classList.add(elements.inputErrorClass);
  inputError.textContent = errorMessage;
  inputError.classList.add(elements.errorClass);
}

function hideInputError(form, input, elements) {
  const inputError = form.querySelector(`.${input.id}-error`);
  input.classList.remove(elements.inputErrorClass);
  inputError.textContent = "";
  inputError.classList.remove(elements.errorClass);
}

function checkInputValidity(form, input, elements) {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, elements);
  } else {
    hideInputError(form, input, elements);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((input) => !input.validity.valid);
}

function toggleButtonState(inputList, button, elements) {
  if (hasInvalidInput(inputList)) {
    button.classList.add(elements.inactiveButtonClass);
    button.setAttribute("disabled", true);
  } else {
    button.classList.remove(elements.inactiveButtonClass);
    button.removeAttribute("disabled");
  }
}

function setEventListeners(form, elements) {
  const inputList = Array.from(form.querySelectorAll(elements.inputSelector));
  const button = form.querySelector(elements.submitButtonSelector);
  toggleButtonState(inputList, button, elements);
  inputList.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(form, input, elements);
      toggleButtonState(inputList, button, elements);
    });
  });
}

function enableValidation(elements) {
  const formList = Array.from(document.querySelectorAll(elements.formSelector));
  formList.forEach((form) => {
    setEventListeners(form, elements);
  });
}

export {checkInputValidity, enableValidation}
