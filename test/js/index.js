window.onload = function() {
  const data = [];
  let uniqueDate = [];

  const btnAdd = document.getElementById("add");

  // select date
  const selectDate = () => {
    const dateSelect = document.getElementsByClassName("date-select");

    if (!data.length) {
      dateSelect[0].innerHTML += `<option value="nodate">Nodate</option>`;
    } else {
      dateSelect[0].innerHTML = "";
      uniqueDate.forEach(element => {
        const opt = `<option value="${element}">${element}</option>`;
        dateSelect[0].innerHTML += opt;
      });
    }
  };

  // parse data
  const parseCards = () => {
    const dataCards = document.getElementsByClassName("data-cards");
    const cardItem = document.getElementsByClassName("card-item");
    const cardsList = document.getElementsByClassName("cards-list");
    const eventsList = document.getElementsByClassName("events-list");

    if (!data.length) {
      let newTeg = document.createElement("b");
      newTeg.innerHTML = "No data!";
      dataCards[0].appendChild(newTeg);
    } else {
      const res = unique(data);
      uniqueDate = res;
      cardsList[0].innerHTML = null;
      uniqueDate.forEach(element => {
        const card = `
          <li class="card-item">
            <div class="card">
              <div class="date-title">${element}</div>
              <div class="date-events-list">
                <ul class="events-list"></ul>
              </div>
            </div>
          </li> `;
        cardsList[0].innerHTML += card;
      });

      if (cardItem.length) {
        eventsList[0].innerHTML = null;
        data.forEach((itemI, i) => {
          uniqueDate.forEach((itemJ, j) => {
            if (itemI.date === itemJ) {
              const event = `
                <li class="event-item">
                  <div>
                    <span class="event-name">${itemI.eventName}</span>
                    <span class="event-time-start">${itemI.timeStart}</span>
                    <span class="event-time-finish">${itemI.timeFinish}</span>
                    <input type="button" class="edit-btn" value="edit">
                    <input type="button" data-date="${itemI.timeStart}-${itemI.timeFinish}" class="delete-btn" value="delete" >
                  </div>
                </li>`;
              eventsList[j].innerHTML += event;
            }
          });
        });
      }
    }
  };

  // add event
  const addEvent = () => {
    const event = {
      eventName: "",
      date: "",
      timeStart: "",
      timeFinish: ""
    };
    const title = document.getElementById("title");
    const date = document.getElementById("date");
    const timeStart = document.getElementById("time-start");
    const timeFinish = document.getElementById("time-finish");
    event.eventName = title.value;
    event.timeFinish = timeFinish.value;
    event.date = date.value;
    event.timeStart = timeStart.value;
    if (!date.value || !title.value || !timeStart.value || !timeFinish.value) {
      return;
    }
    if (false) {
      console.log("проверка даты на вхождение в диаазон");
      alert("some date no correct");
      return;
    }

    data.push(event);
    parseCards();
    selectDate();
    title.value = "";
    date.value = "";
    timeStart.value = "";
    timeFinish.value = "";
  };

  const unique = arr => {
    let result = [];
    for (let item of arr) {
      if (!result.includes(item.date)) {
        result.push(item.date);
      }
    }
    return result;
  };

  const deleteBtn = e => {
    const click = e.target.dataset.date;
    const deleteElement = document.getElementsByClassName("event-item");
    const eventsList = document.getElementsByClassName("events-list");
    eventsList.removeChild(deleteElement);
  };

  const editBtn = e => {
    console.log(e);
  };

  const hasClass = (elem, className) => {
    return elem.className.split(" ").indexOf(className) > -1;
  };

  document.addEventListener(
    "click",
    e => {
      if (hasClass(e.target, "delete-btn")) {
        deleteBtn(e);
      } else if (hasClass(e.target, "edit-btn")) {
        editBtn(e);
      }
    },
    false
  );

  btnAdd.addEventListener("click", addEvent);
  selectDate();
  parseCards();
};
