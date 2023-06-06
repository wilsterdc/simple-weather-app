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
const location = document.getElementById("widget_weather");

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

const loc = document.getElementById("location");

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
            let city = data.name;
            let country = data.sys.country;

            loc.textContent = `${city}, ${country}`;
            console.log(data.name);
            console.log(data);

            let timeTracker = new Date();
            const utcTimezone = (timeTracker.getUTCHours() + (7200 / 3600)) - 12;
            const currentTime = new Date(utcTimezone).toLocaleTimeString();
            const utcMinute = timeTracker.getUTCMinutes();

            console.log(`${utcTimezone} : ${utcMinute}`);

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
//         let city = data.name;

//         location.textContent = `location: ${city}`;
//         console.log(data.name);
//     })
//    .catch(error => {
//         console.error(error);
//     });

const userInput = document.getElementById("userInput");
const searchButton = document.getElementById("searchBtn");

userInput.addEventListener("keypress", async function(event) {
    if (event.key === "Enter") {
        // const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${userInput.value}&APPID=${apiKey}`);
        // const data = await res.json();
        // let city = data.name;
        // let country = data.sys.country;

        // try {

        //     if (!res.ok) {
        //         // console.error('There\'s an error in getting the respond.');
        //         location.textContent = `${ui_input} ${data.message}.`;
        //     } else {
        //         location.textContent = `location: ${city}, ${country}`;
        //         console.log(data);
        //     }
        // }
        // catch(error) {
        //     console.error(error);
        // };
        
        event.preventDefault();

        searchButton.click();
    };
});

searchButton.addEventListener("click", async function(){
    const userInput = document.getElementById("userInput").value;
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${userInput}&APPID=860c5a1c3465c45131376396dcd38571`);
    const data = await res.json();
    

    try {

        if (!res.ok) {
            console.error('There\'s an error in getting the respond.');
            loc.textContent = `${userInput} ${data.message}.`;
        } else {
            let city = data.name;
            let country = data.sys.country;

            loc.textContent = `${city}, ${country}`;
            console.log(data);
        }
    }
    catch(error) {
        console.error(error);
    };

});