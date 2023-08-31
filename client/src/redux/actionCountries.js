import axios from "axios";
import {fetchCountriesSuccess, searchCountriesSuccess, orderCountriesSuccess, filterByContinentSuccess, getContinentSuccess, getActivitiesSuccess, getCountriesByActSuccsess} from './actions';

export const fetchCountries = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:3001/countries');
    dispatch(fetchCountriesSuccess(response.data));
    console.log('se ejecuto');
  } catch (error) {
    console.log('No se puede obtener los países:', error);
  }
};

export const searchCountry=(name)=> async (dispatch)=>{
    try {
        const response = await axios.get(`http://localhost:3001/countries/search?name=${name}`);
        dispatch(searchCountriesSuccess(response.data));
    } catch (error) {
        console.log('no se encontro el pais buscado',error);
    }
};

export const orderCountries=(order)=> async (dispatch, getState)=>{
    const countries = getState().countries
    let orderedCountries = [];

    switch (order) {
        case 'ASC-alf':
          orderedCountries = [...countries].sort((a, b) => a.name.localeCompare(b.name));
          break;
  
        case 'DESC-alf':
          orderedCountries = [...countries].sort((a, b) => b.name.localeCompare(a.name));
          break;
  
        case 'ASC-pop':
          orderedCountries = [...countries].sort((a, b) => a.population - b.population);
          break;
  
        case 'DESC-pop':
          orderedCountries = [...countries].sort((a, b) => b.population - a.population);
          break;
  
        default:
          break;
      }
    dispatch(orderCountriesSuccess(orderedCountries));
};
export const getContinents = ()=> async(dispatch)=>{
    try {
        const response = await axios.get('http://localhost:3001/countries');
        const uniqueContinents = Array.from(new Set(response.data.map(country => country.continents)));
        dispatch(getContinentSuccess(uniqueContinents))
    } catch (error) {
        console.log('error al obtener continentes:', error);
    }
}

export const filterByContinent = (continent) => async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:3001/countries/continent?continent=${continent}`);
      dispatch(filterByContinentSuccess(response.data));
    } catch (error) {
      console.log(error);
    }
};
export const getActivities = ()=> async(dispatch)=>{
  try {
      const response = await axios.get('http://localhost:3001/countries/activities');
      dispatch(getActivitiesSuccess(response.data))
  } catch (error) {
      console.log('error al obtener continentes:', error);
  }
}
export const getCountriesByAct=(activityName)=> async(dispatch)=>{
  try {
    const response = await axios.get(`http://localhost:3001/countries/country-activity?activityName=${activityName}`);
    dispatch(getCountriesByActSuccsess(response.data));
  } catch (error) {
    
  }
}
