import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash/debounce';
import { fetchCountries } from './servises/fetchCountries';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('input#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(onFindCountry,  DEBOUNCE_DELAY));
    
function onFindCountry(evt) {
    evt.preventDefault();

    const name = evt.target.value.trim();

    if(!name.length) return;

    resetMarkup(countryList);
    resetMarkup(countryInfo);

    fetchCountries(name)
        .then(showCountryInfo)
        .catch(error => {
            Notify.failure('Oops, there is no country with that name');
        })
}

function showCountryInfo(names) {
    if (names.length >= 2 && names.length <= 10) {
        createMarkupCountries(names);
        
    } else if (names.length < 2) {
        createMarkupCountryInfo(names);
    } else {
        Notify.info('Too many matches found. Please enter a more specific name.');
    }
}
    
function createMarkupCountries(names) {
    const countries = names.map(name => {
        const {flags, name: {official}} = name;
         const countryDescription= `<li class='country-item'>
        <img src='${flags.svg}' class='country-flag' alt='${flags.alt}'/>
        <p class='country-name'>${official}<p/>
        </li>`
    
         return countryDescription;
    }).join('');
    
    countryList.insertAdjacentHTML('afterbegin', countries);
}

function createMarkupCountryInfo(names) {
    const country = names.map(name => {
    const {flags, name: {official}, capital, population, languages} = name;
    return `<div class='country-reference'>
    <img src='${flags.svg}' class='country-flag' alt='${flags.alt}'/>
    <p class='country-name-big'><b>${official}</b><p/>
    </div>
    <ul class='country-description'>
    <li class='country-item'><b>Capital:</b><span class='country-information'>${capital}</span>
    </li>
     <li class='country-item'><b>Population:</b><span class='country-information'>${population}</span>
    </li>
    </li>
    <li class='country-item'><b>Languages:</b><span class='country-information'>${Object.values(languages).join(', ')}</span>
    </li>`   
    }).join('');

    return countryInfo.insertAdjacentHTML('afterbegin', country);
}

function resetMarkup(holder) {
    holder.innerHTML='';
}