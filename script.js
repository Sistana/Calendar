const calendar = document.getElementById('calendar');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const eventPopup = document.getElementById('event-popup');
const eventInput = document.getElementById('event-input');
const saveEventBtn = document.getElementById('save-event');
const cancelEventBtn = document.getElementById('cancel-event');  // Fixed the ID
const popupOverlay = document.getElementById('popup-overlay');

const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

const days = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

let currentMonthIndex = new Date().getMonth();
let currentYear = new Date().getFullYear();

let events = {};

function renderCalendar() {
    const month = months[currentMonthIndex];
    const year = currentYear;

    const firstDay = new Date(year, currentMonthIndex, 1);
    const lastDay = new Date(year, currentMonthIndex + 1, 0);

    let calendarHTML = `<h2>${month} ${year}</h2>`;
    calendarHTML += '<table>';
    calendarHTML += '<thead><tr>';

    days.forEach(day => {
        calendarHTML += `<th>${day}</th>`;
    });

    calendarHTML += `</tr></thead><tbody><tr>`;

    for (let i = 0; i < firstDay.getDay(); i++) {
        calendarHTML += '<td class="empty"></td>';
    }

    for (let date = 1; date <= lastDay.getDate(); date++) {
        let isToday = date === new Date().getDate() && currentMonthIndex === new Date().getMonth() && currentYear === new Date().getFullYear();
        let event = events[date] || '';

        calendarHTML += `<td class="calendar-day ${isToday ? 'today' : ''}" data-date="${date}">${date}`;
        if (event) {
            calendarHTML += `<br><span class="event">${event}</span>`;
        }
        calendarHTML += '</td>';

        if ((firstDay.getDay() + date) % 7 === 0) {
            calendarHTML += '</tr><tr>';
        }
    }

    const totalCells = firstDay.getDay() + lastDay.getDate();
    const remainingCells = (7 - (totalCells % 7)) % 7;
    for (let i = 0; i < remainingCells; i++) {
        calendarHTML += '<td class="empty"></td>';
    }

    calendarHTML += '</tr></tbody></table>';
    calendar.innerHTML = calendarHTML;

    document.querySelectorAll('.calendar-day').forEach(cell => {
        cell.addEventListener('click', (e) => {
            const date = e.target.dataset.date;
            if (date) {
                showEventPopup(date);
            }
        });
    });
}

function saveEvent(date) {
    const event = eventInput.value.trim();
    if (event) {
        events[date] = event;
    }
    eventPopup.style.display = 'none';
    popupOverlay.style.display = 'none';
    renderCalendar();
}

function showEventPopup(date) {
    eventPopup.style.display = 'block';
    popupOverlay.style.display = 'block';
    eventInput.value = events[date] || '';
    saveEventBtn.onclick = () => saveEvent(date);
}

prevBtn.addEventListener('click', () => {
    if (currentMonthIndex > 0) {
        currentMonthIndex--;
    } else {
        currentMonthIndex = 11;
        currentYear--;
    }
    renderCalendar();
});

nextBtn.addEventListener('click', () => {
    if (currentMonthIndex < 11) {
        currentMonthIndex++;
    } else {
        currentMonthIndex = 0;
        currentYear++;
    }
    renderCalendar();
});

cancelEventBtn.addEventListener('click', () => {
    eventPopup.style.display = 'none';
    popupOverlay.style.display = 'none';
});

popupOverlay.addEventListener('click', () => {
    eventPopup.style.display = 'none';
    popupOverlay.style.display = 'none';
});

renderCalendar();
