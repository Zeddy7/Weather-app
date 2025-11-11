const para = document.querySelector(".temperature");
const highs = document.querySelector(".highs");
const mainForecast = document.querySelector(".main-forecast");
const locationQuery = document.querySelector("#location");
const searchQuery = document.querySelector(".search-location");

async function getWeather(location) {
   try {
      let weather = await fetch(
         `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=LZGLPSJQ6WJM8CD9NYLBG39UN`
      );
      let weatherJson = await weather.json();
      console.log(weatherJson);
      return weatherJson;
   } catch (err) {
      err =
         "Error: Location not found. Please ensure you include the city/country name in your input";
      para.textContent = err;
   }
}

async function specificData(location) {
   let data = await getWeather(location);
   let temp = data.currentConditions.temp - 32 * 5 / 9;
   para.textContent = `${temp.toFixed(1)}°C || ${data.currentConditions.temp}°F`;
   mainForecast.textContent = data.resolvedAddress;
   //    highs.textContent =
   // return data.days;
}

searchQuery.addEventListener("click", () => {
   !locationQuery
      ? specificData("st catharines")
      : specificData(locationQuery.value);
});

locationQuery.addEventListener("keydown", event => {
   if (event.key === "Enter") {
      !locationQuery
         ? specificData("st catharines")
         : specificData(locationQuery.value);
   }
});
