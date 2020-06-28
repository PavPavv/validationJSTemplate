'use strict';
//  Имя
const form = document.querySelector('form');
const username = document.querySelector('#username');
const usersurname = document.querySelector('#usersurname');
const userbirth = document.querySelector('#userbirth');
const email = document.querySelector('#email');
const submitBtn = document.querySelector('button');


//  Используемые для проверки регулярные выражения

const cyrilRegExp = /^[АаБбВвГгДдЕеЁёЖжЗзИиЙйКкЛлМмНнОоПпРрСсТтУуФфХхЦцЧчШшЩщЭэЮюЯя][АаБбВвГгДдЕеЁёЖжЗзИиЙйКкЛлМмНнОоПпРрСсТтУуФфХхЦцЧчШшЩщъыьЭэЮюЯя]+$/;
const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const dateRegExp = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/;

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
userbirth.addEventListener('input', testInput.bind(null, userbirth, dateRegExp));
email.addEventListener('input', testInput.bind(null, email, emailRegExp));


//  Проверка перед сабмитом

form.addEventListener('submit', (event) => {
  let errorName = checkInput(username, cyrilRegExp);
  let errorSurname = checkInput(usersurname, cyrilRegExp);
  let errorBirth = checkInput(userbirth, dateRegExp);
  let errorEmail = checkInput(email, emailRegExp);

  if (errorName && errorSurname && errorEmail) {
    return true;

  } else {
    event.preventDefault();
    return false;
  }
});
