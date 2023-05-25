let store;
let historyList = document.querySelector('#search-history-list');

const getHistory = () => {
  store = localStorage.history ? JSON.parse(localStorage.history) : [];

  store.forEach((city) => {
    historyList.innerHTML += `<li class="list-group-item"><button onclick="searchHistory('${city}')">${city}</button></li>`;
  });
};

getHistory();

const searchHistory = (city) => {
  document.querySelector('#search-city').value = city;
  searchCity();
};

const searchCity = () => {
  let city = document.querySelector('#search-city').value;

  if (!city) return;

  let url2 = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=23d68278b5b786d3d93337f17d67f78a`;

  if (!store.includes(city)) {
    store.push(city);
    localStorage.history = JSON.stringify(store);
    historyList.innerHTML += `<li class="list-group-item"><button onclick="searchHistory('${city}')">${city}</button></li>`;
  }

  fetch(url2)
    .then((response) => response.json())
    .then((data) => {
      const { lat, lon } = data.city.coord;
      let url1 = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=23d68278b5b786d3d93337f17d67f78a`;

      fetch(url1)
        .then((response) => response.json())
        .then((data) => {
          let { name, dt, main: { temp, humidity }, wind: { speed }, weather: [{ icon }] } = data.list[0];

          let currentCity = document.querySelector('#current-city');
          currentCity.innerHTML = `City Information <small class="text-muted">${new Date(dt * 1000).toLocaleDateString()}</small>`;

          let currentTemp = document.querySelector('#current-temp');
          currentTemp.textContent = `${temp}°F`;

          let currentHumidity = document.querySelector('#current-humidity');
          currentHumidity.textContent = `${humidity}%`;

          let currentWindSpeed = document.querySelector('#current-wind-speed');
          currentWindSpeed.textContent = `${speed} MPH`;

          let forecast = document.querySelector('#five-day-forecast');
          forecast.innerHTML = '';

          for (let i = 0; i < data.list.length; i += 8) {
            let { dt, main: { temp, humidity }, weather: [{ icon }] } = data.list[i];

            forecast.innerHTML += `
              <div class="col-2">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">${new Date(dt * 1000).toLocaleDateString()}</h5>
                    <img src="https://openweathermap.org/img/w/${icon}.png" alt="${icon}">
                    <p class="card-text">Temp: ${temp}°F</p>
                    <p class="card-text">Humidity: ${humidity}%</p>
                  </div>
                </div>
              </div>
            `;
          }
        })
        .catch((error) => {
          console.log('Error retrieving forecast data:', error);
        });
    })
    .catch((error) => {
      console.log('Error retrieving city data:', error);
    });
};





