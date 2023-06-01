
/***
const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

const DAYS = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
];

const todayWidget = document.getElementById("widget_todayIs");
const timeWidget = document.getElementById("widget_hours");
const weatherWidget = document.getElementById("widget_weather");

const currentDate = new Date();
const monthText = MONTHS[currentDate.getMonth()];
const dayText = DAYS[currentDate.getDay()];
const date = currentDate.getDate();
const year = currentDate.getFullYear();

todayWidget.textContent = `Today is ${dayText}, ${monthText}, ${date} ${year}`;

setInterval(() => {
    let timeTracker = new Date();
    let hours = timeTracker
        .getHours()
        .toString()
        .padStart(2, '0');
    let minutes = timeTracker
        .getMinutes()
        .toString()
        .padStart(2, '0');
    let seconds = timeTracker
        .getSeconds()
        .toString()
        .padStart(2, '0');

    timeWidget.textContent = `${hours}:${minutes}:${seconds}`;
}, 1000);

*/

const weatherWidget = document.getElementById("widget_weather");

fetch('https://ipinfo.io/json?token=d163b9da99b8c6')
    .then(res => res.json())
    .then(data => {

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${data.city}&APPID=860c5a1c3465c45131376396dcd38571`)
        .then(res => {
            if (!res.ok) {
                console.error('There\'s and error in getting the respond.');
                return;
            };
            return res.json();
        })
        .then(data => {
            let location = data.name;
            let country = data.sys.country;

            weatherWidget.textContent = `Location: ${location}, ${country}`;
            console.log(data.name);
            console.log(data);
        })
        .catch(error => {
                console.error(error);
        });
    });

// fetch(`https://api.openweathermap.org/data/2.5/weather?q=Bulacan&APPID=${apiKey}`)
//     .then(res => {
//         if (!res.ok) {
//             console.error('There\'s and error in getting the respond.');
//             return;
//         };
//         return res.json();
//     })
//     .then(data => {
//         console.log(data);
//         let location = data.name;

//         weatherWidget.textContent = `Location: ${location}`;
//         console.log(data.name);
//     })
//    .catch(error => {
//         console.error(error);
//     });

const userInput = document.getElementById("ui_input");
const search_button = document.getElementById("search_btn");

userInput.addEventListener("keypress", async function(event) {
    if (event.key === "Enter") {
        // const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${userInput.value}&APPID=${apiKey}`);
        // const data = await res.json();
        // let city = data.name;
        // let country = data.sys.country;

        // try {

        //     if (!res.ok) {
        //         // console.error('There\'s an error in getting the respond.');
        //         weatherWidget.textContent = `${ui_input} ${data.message}.`;
        //     } else {
        //         weatherWidget.textContent = `Location: ${city}, ${country}`;
        //         console.log(data);
        //     }
        // }
        // catch(error) {
        //     console.error(error);
        // };
        
        // event.preventDefault();

        search_button.click();
    };
});

search_button.addEventListener("click", async function(){
    const userInput = document.getElementById("ui_input").value;
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${userInput}&APPID=${apiKey}`);
    const data = await res.json();
    let city = data.name;
    let country = data.sys.country;

    try {

        if (!res.ok) {
            console.error('There\'s an error in getting the respond.');
            weatherWidget.textContent = `${userInput} ${data.message}.`;
        } else {
            weatherWidget.textContent = `Location: ${city}, ${country}`;
            console.log(data);
        }
    }
    catch(error) {
        console.error(error);
    };

});