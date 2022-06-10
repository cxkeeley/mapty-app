'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map, mapEvent;

if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(
    position => {
      const { latitude, longitude } = position.coords;
      // console.log(`https://www.google.com/maps/@${latitude},${longitude},15z`);

      const coords = [latitude, longitude];

      map = L.map('map').setView(coords, 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      // handling clicks on map
      map.on('click', mapE => {
        mapEvent = mapE
        // to remove the class hidden or to show the form
        form.classList.remove('hidden');
        inputDistance.focus();
      });
    },
    () => {
      alert('Please enable location services');
    }
  );

form.addEventListener('submit', (e) => {
  e.preventDefault();
  // console.log(mapEvent) | to see the mapEvent properties
  const { lat, lng } = mapEvent.latlng;
  // console.log(`https://www.google.com/maps/@${lat},${lng},15z`);

  // L.marker(coords) | change the coords to lat, lng
  L.marker([lat, lng])
    .addTo(map)
    // .bindPopup('Workout') | to add dynamic popups
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: 'running-popup'
      })
    )
    .setPopupContent('Workout')
    .openPopup();

});

// | because of map dont exist in the global variable scope so declare map at global and call it in scope