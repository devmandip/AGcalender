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
