'use strict';
//  Имя
const form = document.querySelector('form');
const username = document.querySelector('#username');
const usersurname = document.querySelector('#usersurname');
const email = document.querySelector('#email');
const submitBtn = document.querySelector('button');


//  Используемые для проверки регулярные выражения

const cyrilRegExp = /^[АаБбВвГгДдЕеЁёЖжЗзИиЙйКкЛлМмНнОоПпРрСсТтУуФфХхЦцЧчШшЩщЭэЮюЯя][АаБбВвГгДдЕеЁёЖжЗзИиЙйКкЛлМмНнОоПпРрСсТтУуФфХхЦцЧчШшЩщъыьЭэЮюЯя]+$/;
const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


//  Вспомогательная функция для приведения первых букв слова к верхнему регистру

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


//  Проверка инпктов перед сабмитом

function checkInput(input, regExp) {
  if (input.value.length !== 0 && regExp.test(input.value)) {
    return true;
  } else {
    return false;
  }
}


//  Валидация инпутов

function testInput(el, regExp) {
  //  Первая буква в водимой строке (если это не email)
  //  всегда заглавная
  if (el.value !== email.value) {
    const elVal = capitalizeFirstLetter(el.value);
    el.value = elVal;
  }

  const test = el.value.length === 0 || regExp.test(el.value);
  const error = el.nextElementSibling;

  let errorName = checkInput(username, cyrilRegExp);
  let errorSurname = checkInput(usersurname, cyrilRegExp);
  let errorEmail = checkInput(email, emailRegExp);

  if (test) {
    error.classList.remove('error');
  } else {
    error.classList.add('error');
  }

  if (errorName && errorSurname && errorEmail) {
    submitBtn.classList.add('success');
  } else {
    submitBtn.classList.remove('success');
  }
}


username.addEventListener('input', testInput.bind(null, username, cyrilRegExp));
usersurname.addEventListener('input', testInput.bind(null, usersurname, cyrilRegExp));
email.addEventListener('input', testInput.bind(null, email, emailRegExp));


//  Проверка перед сабмитом

form.addEventListener('submit', (event) => {
  let errorName = checkInput(username, cyrilRegExp);
  let errorSurname = checkInput(usersurname, cyrilRegExp);
  let errorEmail = checkInput(email, emailRegExp);

  if (errorName && errorSurname && errorEmail) {
    return true;

  } else {
    event.preventDefault();
    return false;
  }
});
