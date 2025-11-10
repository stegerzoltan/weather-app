// public/script.js

// ... (többi kód)

// A BACKEND_URL most relatív! Vercel fogja kezelni.
// Ha a frontend a 'mysite.com'-on fut, ez a hívás 'mysite.com/api/weather' lesz.
const BACKEND_URL = "/api/weather"; 

// ... (a getWeather függvényen belül)

async function getWeather(city) {
    // ...
    // A Vercel URL-re történő hívás a relatív címen:
    const url = `${BACKEND_URL}?city=${city}`; 
    // ...
}
// ... (többi kód)