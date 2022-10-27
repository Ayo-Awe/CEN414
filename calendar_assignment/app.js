const root = document.getElementById("root");

const birthdays = {
  7: [{ day: 4, style: "birthday" }],
  3: [{ day: 15, style: "birthday-2" }],
};

const months = [
  ["January", 31],
  ["February", 28],
  ["March", 31],
  ["April", 30],
  ["May", 31],
  ["June", 30],
  ["July", 31],
  ["August", 31],
  ["September", 30],
  ["October", 31],
  ["November", 30],
  ["December", 31],
];

function renderCalendar() {
  const calendar = document.createElement("div");

  calendar.className = "calendar";

  const monthNodes = months.map((month, monthIndex) =>
    getMonthNode(month, monthIndex)
  );

  calendar.append(...monthNodes);

  root.appendChild(calendar);
}

function getMonthNode([month, numberOfDays], monthIndex) {
  const monthDiv = document.createElement("div");
  const monthBody = document.createElement("div");
  const monthTitle = document.createElement("h2");
  const monthHeading = getMonthHeading();

  monthDiv.className = "month";
  monthTitle.className = "month-title";
  monthBody.className = "month-body month-grid";

  monthTitle.innerText = month;

  const firstDay = getFirstDayOfTheMonth(monthIndex);

  appendPadding(monthBody, firstDay);

  const birthdaysInMonth = birthdays[monthIndex] || [];

  for (let i = 1; i <= numberOfDays; i++) {
    // Create new element with day
    const day = document.createElement("p");
    day.className = "month-col";
    day.innerText = i;

    const birthday = birthdaysInMonth.find((b) => b.day === i);

    if (birthday) day.className += ` ${birthday.style}`;

    monthBody.appendChild(day);
  }

  monthDiv.append(monthTitle, monthHeading, monthBody);

  return monthDiv;
}

function getMonthHeading() {
  const daysOfTheWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const monthHeading = document.createElement("div");

  daysOfTheWeek.forEach((d) => {
    const day = document.createElement("h3");
    day.innerText = d;
    day.className = " month-col";
    monthHeading.appendChild(day);
  });

  monthHeading.className += "month-heading month-grid";

  return monthHeading;
}

function getFirstDayOfTheMonth(monthIndex) {
  if (monthIndex > 11 || monthIndex < 0)
    throw Error("month index must be between 0 and 11");

  // Initialise new date with 1st January, 2023
  const date = new Date("01-01-2023");

  date.setMonth(monthIndex);

  const day = date.getDay(); // Get day returns index of day of the month i.e Sun (0), Mon (1)

  // Modify day to take Monday as index 0 and Sunday as index 6
  const modDay = (day + 6) % 7;

  return modDay;
}

function appendPadding(element, padding) {
  for (i = 0; i < padding; i++) {
    const pad = document.createElement("p");
    pad.className = "month-col";
    element.appendChild(pad);
  }
}

renderCalendar();
