import throttle from 'lodash.throttle';

const KEY = 'feedback-form-state';
const formData = {};

const formRef = document.querySelector('.feedback-form');
formRef.addEventListener('input', throttle(onInputHandler, 500));
formRef.addEventListener('submit', onSubmitHandler);

refreshForm();

function onInputHandler(event) {
  const inputValue = event.target.value;
  const inputName = event.target.name;
  formData[inputName] = inputValue;

  localStorage.setItem(KEY, JSON.stringify(formData));
}

function refreshForm() {
  const savedData = JSON.parse(localStorage.getItem(KEY));

  if (localStorage.getItem(KEY)) {
    formRef.elements.email.value = savedData.email;
    formRef.elements.message.value = savedData.message;
  }
}

function onSubmitHandler(event) {
  event.preventDefault();
  event.target.reset();
  localStorage.removeItem(KEY);
  console.log(formData);
}
