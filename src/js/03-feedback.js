const form = document.querySelector('.feedback-form');
const input = form.querySelector('input[name=email]');
const textarea = form.querySelector('textarea[name=message]');
const submitButton = form.querySelector('button[type=submit]');

const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

const remove = key => {
  try {
    const serializedState = localStorage.removeItem(key);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

const delayInMilliseconds = 500;

console.log(form);
console.log(input);
console.log(textarea);
console.log(submitButton);

const validator = require('validator');
var _ = require('lodash');

const eventObject = {
  email: '',
  message: '',
};

form.addEventListener(
  'input',
  _.throttle(e => {
    if (e.target === input) {
      const inputValue = e.target.value;
      //   console.log(inputValue);
      if (!validator.isEmail(inputValue)) {
        return;
      }

      eventObject.email = inputValue;
      //   console.log(inputValue);
    }

    if (e.target === textarea) {
      const inputValue = e.target.value;
      //   console.log(inputValue);

      eventObject.message = inputValue;
    }

    // console.log(e.target.value);
    save('feedback-form-state', eventObject);
  }, delayInMilliseconds)
);

const localeStorageDatas = load('feedback-form-state');

if (localeStorageDatas === undefined) {
  return;
} else {
  const email = localeStorageDatas.email;

  input.value = localeStorageDatas.email;
}

if (localeStorageDatas.message === undefined) {
  return;
} else {
  const message = localeStorageDatas.message;

  textarea.value = localeStorageDatas.message;
}

submitButton.addEventListener('click', e => {
  e.preventDefault();
  form.reset();

  console.log(localeStorageDatas);
});
