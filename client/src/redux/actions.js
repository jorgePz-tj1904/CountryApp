import { FETCH_COUNTRIES_SUCCESS, SEARCH_COUNTRIES_SUCCESS, ORDER_COUNTRIES_SUCCESS, FILTER_BY_CONTINENT_SUCCESS, GET_CONTINENTS, GET_ACTIVITIES, GET_COUNTRIES_BY_ACT} from './action-types';

// Acción para obtener los países desde la API
export const fetchCountriesSuccess = (countries) => ({
  type: FETCH_COUNTRIES_SUCCESS,
  payload: countries,
});

// Acción para realizar una búsqueda de países por nombre
export const searchCountriesSuccess = (countries) => ({
  type: SEARCH_COUNTRIES_SUCCESS,
  payload: countries,
});

// Acción para ordenar los países
export const orderCountriesSuccess = (countries) => ({
  type: ORDER_COUNTRIES_SUCCESS,
  payload: countries,
});

// Acción para filtrar los países por continente
export const filterByContinentSuccess = (countries) => ({
  type: FILTER_BY_CONTINENT_SUCCESS,
  payload: countries,
});

export const getContinentSuccess = (continents)=>({
  type: GET_CONTINENTS,
  payload: continents,
})

export const getActivitiesSuccess = (activities)=>({
  type:GET_ACTIVITIES,
  payload: activities
})

export const getCountriesByActSuccsess=(countries)=>({
  type: GET_COUNTRIES_BY_ACT,
  payload: countries
})