//  Класс календаря

class Calendar {
  //  разметка для календаря
  markup = `
      <div class="input-area">
          <div class="month-navigator">
              <div class="month-previous"></div>
              <div class="month">October 2019</div>
              <div class="month-next"></div>
          </div>
          <table class="tbl-calendar">
              <thead class="thead">
                  <tr class="row-days">
                      <th class="th-day">Пн</th>
                      <th class="th-day">Вт</th>
                      <th class="th-day">Ср</th>
                      <th class="th-day">Чт</th>
                      <th class="th-day">Пт</th>
                      <th class="th-day">Сб</th>
                      <th class="th-day">Вс</th>
                  </tr>
              </thead>
              <tbody class="tbody">
              </tbody>
          </table>
      </div>
      `;

  constructor(options) {
    this.id = options.id;
    this.element = document.querySelector(this.id);
    this.element.addEventListener("focus", (e) => {
      if (document.getElementsByClassName("ab-calendar")[0]) {
        document.getElementsByClassName("ab-calendar")[0].remove();
      }
      this.init();
    });
  }

  //  Инициализируем календарь

  init() {
    if (this.element.value == "") {
      this.savedDate = new Date();
    } else {
      let strDt = this.element.value;
      let strDtArr = strDt.split("/");
      strDt = strDtArr[2] + "-" + strDtArr[1] + "-" + strDtArr[0];
      this.savedDate = new Date(strDt);
    }

    this.selectedDate = this.savedDate;
    this.currentMonth = this.savedDate.getMonth();
    this.currentYear = this.savedDate.getFullYear();

    this.months = [
      { fullname: "Январь", shortname: "Янв" },
      { fullname: "Февраль", shortname: "Фев" },
      { fullname: "Март", shortname: "Мар" },
      { fullname: "Апрель", shortname: "Апр" },
      { fullname: "Май", shortname: "Май" },
      { fullname: "Июнь", shortname: "Июн" },
      { fullname: "Июль", shortname: "Июл" },
      { fullname: "Август", shortname: "Авг" },
      { fullname: "Сентябрь", shortname: "Сен" },
      { fullname: "Октябрь", shortname: "Окт" },
      { fullname: "Ноябрь", shortname: "Ноя" },
      { fullname: "Декабрь", shortname: "Дек" },
    ];

    this.days = [
      { fullname: "Воскресенье", shortname: "Вс" },
      { fullname: "Понедельник", shortname: "Пн" },
      { fullname: "Вторник", shortname: "Вт" },
      { fullname: "Среда", shortname: "Ср" },
      { fullname: "Четверг", shortname: "Чт" },
      { fullname: "Пятница", shortname: "Пт" },
      { fullname: "Суббота", shortname: "Сб" },
    ];

    this.getDOMs();
    this.addEvents();
    this.updateCalendar(this.currentMonth, this.currentYear);
  }

  //

  getDOMs() {
    // Создаем DOM-контейнер для разметки календаря
    this.cContainer = document.createElement("div");
    this.cContainer.classList.add("ab-calendar");
    document.body.appendChild(this.cContainer);
    //  Находим координаты созданного контейнера, чтобы размещать каждый календарь под своим полем ввода
    let rect = this.element.getBoundingClientRect();
    this.cContainer.style.left = rect.x + "px";
    this.cContainer.style.top = rect.y + rect.height + "px";
    this.cContainer.innerHTML = this.markup;

    //  Получаем необходимые DOM-элементы календаря

    this.cInputArea = this.cContainer.getElementsByClassName("input-area")[0];
    this.cMonthNavigator = this.cInputArea.getElementsByClassName(
      "month-navigator"
    )[0];
    this.cMonthPrevious = this.cMonthNavigator.getElementsByClassName(
      "month-previous"
    )[0];
    this.cMonthNav = this.cMonthNavigator.getElementsByClassName("month")[0];
    this.cMonthNext = this.cMonthNavigator.getElementsByClassName(
      "month-next"
    )[0];

    this.tBody = this.cInputArea.getElementsByClassName("tbody")[0];
  }

  //  Навешиваем обработчики событий на необходимые DOM-элементы

  addEvents() {
    //  кнопка назад
    this.cMonthPrevious.addEventListener("click", () => this.previous());
    //  кнопка вперед
    this.cMonthNext.addEventListener("click", () => this.next());
    //  запоминать дату и убирать календарь при клике по телу таблицы с календарем
    this.tBody.addEventListener('click', () => {
      this.element.value =
        this.formateTwoDigitNumber(this.selectedDate.getDate()) +
        "/" +
        this.formateTwoDigitNumber(this.selectedDate.getMonth() + 1) +
        "/" +
        this.selectedDate.getFullYear();
      document.body.removeChild(this.cContainer);
    });
    //  скрывать календарь при клике вне него или при выборе дня
    window.addEventListener('click', (event) => {
      const hasChild = document.body.querySelector(".ab-calendar") != null;
      if (hasChild) {
        if (event.target === this.cMonthNavigator
        || event.target === this.element
        || event.target === this.cMonthPrevious
        || event.target === this.cMonthNav
        || event.target === this.cMonthNext) {
          return;
        } else {
          document.body.removeChild(this.cContainer);
        }
      }
    });
  }

  //  вспомогательный метод для форматирования чисел меньше 10
  formateTwoDigitNumber(num) {
    return ("0" + num).slice(-2);
  }

  //  Работа кнопки назад
  previous() {
    this.currentYear =
      this.currentMonth === 0 ? this.currentYear - 1 : this.currentYear;
    this.currentMonth = this.currentMonth === 0 ? 11 : this.currentMonth - 1;
    this.updateCalendar(this.currentMonth, this.currentYear);
  }

  //  Работа кнопки вперед
  next() {
    this.currentYear =
      this.currentMonth === 11 ? this.currentYear + 1 : this.currentYear;
    this.currentMonth = this.currentMonth === 11 ? 0 : this.currentMonth + 1;
    this.updateCalendar(this.currentMonth, this.currentYear);
  }


  //  Создание самого календаря

  updateCalendar(month, year) {
    //  кол-во дней в месяце
    let daysInMonth = new Date(year, month + 1, 0).getDate();

    this.tBody.innerHTML = ""; // очищаем календарь
    //  название месяца в календаре
    this.cMonthNav.innerHTML = this.months[month].fullname + " " + year;

    let date = new Date(year, month, 1); // Первый день выбранного месяца


    //  создание календаря динамически
    while (date.getDate() <= daysInMonth && month == date.getMonth()) {
      let row = document.createElement("tr");


      for (let j = 0; j < 7; j++) {
        //  Приводим отобрадение календаря к формату пн(0) - вс(6)
        let weekDay = date.getDay();
        if (weekDay === 0) {
          weekDay = 6;
        } else {
          weekDay = weekDay - 1;
        }


        if (j == weekDay && month == date.getMonth()) {

          // console.log(j);


          let cell = document.createElement("td");
          cell.classList.add("date-cell");
          let cellText = document.createTextNode(date.getDate());

          if (
            date.getDate() === this.selectedDate.getDate() &&
            year === this.selectedDate.getFullYear() &&
            month === this.selectedDate.getMonth()
          ) {
            cell.classList.add("dt-active");
          }

          date.setDate(date.getDate() + 1);
          cell.appendChild(cellText);
          row.appendChild(cell);
          cell.addEventListener("click", (e) => {
            this.selectedDate = new Date(year, month, e.target.innerHTML);
            if (document.getElementsByClassName("dt-active")[0]) {
              document
                .getElementsByClassName("dt-active")[0]
                .classList.remove("dt-active");
            }
            e.target.classList.add("dt-active");
          });
        } else {
          let cell = document.createElement("td");
          let cellText = document.createTextNode("");
          cell.appendChild(cellText);
          row.appendChild(cell);
        }
      }

      this.tBody.appendChild(row);
    }
  }
}




//  инстанциирование нового экземпляра календаря

let input1 = new Calendar({ id: "#userbirth" });
