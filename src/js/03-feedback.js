import throttle from 'lodash.throttle';

const KEY = 'feedback-form-state';
let formData = {};

const formRef = document.querySelector('.feedback-form');
formRef.addEventListener('input', throttle(onInputHandler, 500));
formRef.addEventListener('submit', onSubmitHandler);

refreshForm();

function onInputHandler(event) {
  const inputValue = event.target.value.trim();
  const inputName = event.target.name;
  formData[inputName] = inputValue;

  localStorage.setItem(KEY, JSON.stringify(formData));
}

function refreshForm() {
  try {
    const savedData = localStorage.getItem(KEY);

    if (!savedData) return;
    formData = JSON.parse(savedData);
    Object.entries(formData).forEach(([key, val]) => {
      formRef.elements[key].value = val;
    });
  } catch ({ message }) {
    console.log(message);
  }
}

function onSubmitHandler(event) {
  event.preventDefault();
  event.target.reset();
  localStorage.removeItem(KEY);
  console.log(formData);
  formData = {};
}
