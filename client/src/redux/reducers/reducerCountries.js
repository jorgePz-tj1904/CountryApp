import { FETCH_COUNTRIES_SUCCESS, SEARCH_COUNTRIES_SUCCESS, ORDER_COUNTRIES_SUCCESS, FILTER_BY_CONTINENT_SUCCESS, GET_CONTINENTS, GET_ACTIVITIES, GET_COUNTRIES_BY_ACT} from '../action-types';

const initialState = {
    countries: [],
    continents: [],
    activities:[]
};

const countriesReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_COUNTRIES_SUCCESS:
      case SEARCH_COUNTRIES_SUCCESS:
      case ORDER_COUNTRIES_SUCCESS:
      case FILTER_BY_CONTINENT_SUCCESS:
        return {
          ...state,
          countries: action.payload
        };
      case GET_CONTINENTS:
        return{
            ...state,
            continents: action.payload
        } 
      case GET_ACTIVITIES:
        return{
          ...state,
          activities: action.payload
        }
      case GET_COUNTRIES_BY_ACT:
        return{
          ...state,
          countries: action.payload
        }
      default:
        return state;
    }
  };

  
  export default countriesReducer;