const para = document.querySelector(".temperature");
const mainForecast = document.querySelector(".main-forecast");
const locationQuery = document.querySelector("#location");
const searchQuery = document.querySelector(".search-location");

async function getWeather(location) {
   try {
      let weather = await fetch(
         `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=LZGLPSJQ6WJM8CD9NYLBG39UN`
      );
      let weatherJson = await weather.json();
      // para.textContent = weatherJson.days[1].hours[1].temp;
      console.log(weatherJson);
      return weatherJson;
   } catch (err) {
      err =
         "Error: Location not found. Please ensure you include the city/country name in your input";
      para.textContent = err;
   }
   //   img.src = response.data.images.original.url;
}

async function specificData(location) {
   let data = await getWeather(location);
   para.textContent = data.days[1].hours[0].temp;
   mainForecast.textContent = data.resolvedAddress;
   // return data.days;
}

searchQuery.addEventListener("click", () => {
   !locationQuery
      ? specificData("st catharines")
      : specificData(locationQuery.value)
});

locationQuery.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
     !locationQuery
      ? specificData("st catharines")
      : specificData(locationQuery.value)
  }
});