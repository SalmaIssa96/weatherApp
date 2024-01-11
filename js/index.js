// API search =>  http://api.weatherapi.com/v1/current.json?key=4e9f6ea98d1f4520bf515500240701&q=London;
const searchInput = document.querySelector('#searchInput');
const searchBtn = document.querySelector('#searchBtn');

const getData = async (cityName, emojiFlag) => {
  const currentData = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=4e9f6ea98d1f4520bf515500240701&q=${cityName}&days=3`
  );
  const data = await currentData.json();
  showToday(data.current, data.location, emojiFlag);
  forecast(data.forecast);
};
searchBtn.addEventListener('click', async () => {
  let searchValue = searchInput.value;
  getData(searchValue);
});

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const monthNames = [
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
  'December',
];

const showToday = (current, location, emojiFlag) => {
  const { temp_c, condition, wind_kph, wind_dir, humidity } = current;
  const { name } = location;
  const rowSection = document.querySelector('.card-section').children[0];
  const flag = emojiFlag ? emojiFlag : '';
  const date = new Date(current.last_updated.replace(' ', 'T'));
  const html = `
<div class="col-md-4">
<div class="card today-forecast">
  <div class="card-header d-flex flex-row justify-content-between">
  <p class="day mb-0">${days[date.getDay()]}</p>
  <p class="date mb-0">${date.getDate() + '' + monthNames[date.getMonth()]}</p>
  </div>
  <div class="card-body">
    <p class="location">${name} ${flag}</p>
    <div class="temp-icon-section d-flex align-items-center justify-content-around">
      <p class="tempreture display-1 fw-bold">${temp_c}<sup>o</sup>C</p>
      <div class="forecast-icon">
        <img src="https:${condition.icon}" alt="" width="90" />
      </div>
    </div>
    <p class="forecast-custom">${condition.text}</p>
    <footer class="forecast-details">
      <span><i class="fa-solid fa-umbrella"></i>${humidity}%</span>
      <span><i class="fa-solid fa-wind"></i>${wind_kph}km/h</span>
      <span><i class="fa-regular fa-compass"></i>${wind_dir}</span>
    </footer>
  </div>
</div>
</div>
`;
  rowSection.innerHTML = html;
};
const forecast = (forecast) => {
  const { forecastday } = forecast;
  const rowSection = document.querySelector('.card-section').children[0];
  let html = ``;
  forecastday.slice(1).map((ele) => {
    const { condition, maxtemp_c, mintemp_c } = ele.day;
    html += `<div class="col-md-4">
       <div class="card">
         <div class="card-header text-center">${
           days[new Date(ele.date.replace(' ', 'T')).getDay()]
         }</div>
        <div class="card-body d-flex flex-column justify-content-center align-items-center gap-2">
          <div class="forecast-icon">
           <img src=${condition.icon} alt="" width="48" />
         </div>
         <div class="degree">${maxtemp_c}<sup>o</sup>C</div>
         <p>${mintemp_c}<sup>o</sup></p>
         <div class="forecast-custom">${condition.text}</div>
       </div>
     </div>
   </div>`;
    return html;
  });
  rowSection.innerHTML += html;
};

window.onload = () => {
  fetch('https://ip-api.io/json/')
    .then((res) => res.json())
    .then(({ city, emojiFlag }) => {
      if (city) {
        getData(city, emojiFlag);
      }
    });
};
