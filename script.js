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

class Workout {
  date = new Date();

  constructor(coords, distance, duration) {
    this.coords = coords;
    this.distance = distance; // in km
    this.duration = duration; // in minutes
  }
}

class App {
  #map;
  #mapEvent;

  constructor() {
    this._getPosition();

    form.addEventListener('submit', this._newWorkout.bind(this));
    
    // input type to change when user choose the type from running to Cycling
    inputType.addEventListener('change', this._toggleElevationField.bind(this));
  }

  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), () => {
        alert('Please enable location services');
      });
  }

  _loadMap(position) {
    const { latitude, longitude } = position.coords;
    // console.log(`https://www.google.com/maps/@${latitude},${longitude},15z`);

    const coords = [latitude, longitude];

    // leaflet map re-declaration at child scope
    this.#map = L.map('map').setView(coords, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.#map);

    // handling clicks on map
    this.#map.on('click', this._showForm.bind(this));
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
      // to remove the class hidden or to show the form
      form.classList.remove('hidden');
      inputDistance.focus();
  }

  _toggleElevationField() {
    // to get the closest parent classname to the input
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    // to prevent browser for reloading
    e.preventDefault();
  
    const { lat, lng } = this.#mapEvent.latlng;
    // console.log(`https://www.google.com/maps/@${lat},${lng},15z`);
  
    // clear input fields
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';
  
    // leaflet syntax
    // L.marker(coords) | change the coords to lat, lng
    L.marker([lat, lng])
      .addTo(this.#map)
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
  }
}

const app = new App();


