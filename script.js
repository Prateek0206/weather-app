import { renderPage } from "./data.js";

// using async await
async function getLongLat(cityName = "new york") {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?city=${cityName}&format=json`
    );
    const data = await res.json();
    let lon = data[0].lon;
    let lat = data[0].lat;

    return { lon, lat };
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

//using normal fetch
/* function getLongLat(cityName) {
  fetch(
    `https://nominatim.openstreetmap.org/search?city=${cityName}&format=json`
  )
    .then((res) => res.json())
    .then((data) => {
      const lon = data[0].lon;
      const lat = data[0].lat;
      console.log(`Latitude: ${lat}, Longitude: ${lon}`);
    })
    .catch((err) => console.log(`Error: ${err}`));
} */

async function getWeatherData(cityName) {
  const { lon, lat } = await getLongLat(cityName);

  return [fetchWeatherData(lon, lat)];
}

async function fetchWeatherData(lon, lat) {
  try {
    const response =
      await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto
    `);

    const data = await response.json();

    return data;
  } catch {}
}
const searchElement = document.querySelector(".js-search-button");
export let data;

export let cityName = "";
searchElement.addEventListener("click", async () => {
  cityName = document.querySelector(".js-input-bar").value;

  data = await getWeatherData(cityName);

  renderPage(await data[0])

  
});
