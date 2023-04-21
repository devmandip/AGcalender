import ApiService, {API} from '../../utils/ApiService';
import * as types from './ActionsTypes';

export const isLogin = payload => {
  return {
    type: types.IS_LOGIN,
    payload,
  };
};

export const userData = payload => {
  return {
    type: types.USER_DETAILS,
    payload,
  };
};

export const userWiseDetails = id => {
  return async dispatch => {
    try {
      const response = await ApiService.get(API.user + id);

      if (response) {
        dispatch({type: types.USER_WISE_DETAILS, payload: response});
      } else {
        console.log('response > ', response);
      }
    } catch (error) {
      console.log('error in USERDETAILS', error);
    }
  };
};

export const getCategoriesData = () => {
  return async dispatch => {
    try {
      ApiService.get(API.categories)
        .then(response => {
          console.log('response ???', response);
          if (response) {
            dispatch({type: types.CATEGORIES_LIST, payload: response});
          }
        })
        .catch(e => {
          console.log('error > ', e);
        });
    } catch (error) {
      console.log('error in CATEGORI LIST ', error);
    }
  };
};

export const getCropData = () => {
  return async dispatch => {
    try {
      const response = await ApiService.get(API.crops);

      if (response) {
        dispatch({type: types.CROPS_LIST, payload: response});
      } else {
        console.log('response > ', response);
      }
    } catch (error) {
      console.log('error in CATEGORI LIST ', error);
    }
  };
};
