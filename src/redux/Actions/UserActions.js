import ApiService, {API} from '../../utils/ApiService';
import * as types from './ActionsTypes';

export const isLogin = payload => {
  return {
    type: types.IS_LOGIN,
    payload,
  };
};

export const userData = payload => {
  console.log('>>>>>>>>>>>>>>>> PAYLOAD ', payload);

  return {
    type: types.USER_DETAILS,
    payload,
  };
};

export const userWiseDetails = userReducer => {
  return async dispatch => {
    try {
      var myHeaders = new Headers();
      myHeaders.append(
        'Authorization',
        'Bearer ' + userReducer?.userDetails?.accessToken,
      );

      var raw = '';
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      fetch(
        'https://agmart.ngrok.app/api/user/' +
          userReducer?.userDetails?.user?.userId,
        requestOptions,
      )
        .then(response => response.json())
        .then(response => {
          dispatch({type: types.USER_WISE_DETAILS, payload: response});
        })
        .catch(err => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getCategoriesData = userReducer => {
  return async dispatch => {
    try {
      var myHeaders = new Headers();
      myHeaders.append(
        'Authorization',
        'Bearer ' + userReducer?.userDetails?.accessToken,
      );
      var raw = '';
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };
      fetch('https://agmart.ngrok.app/api/categories', requestOptions)
        .then(response => response.json())
        .then(response => {
          console.log(response?.data);
          dispatch({type: types.CATEGORIES_LIST, payload: response?.data});
        })
        .catch(err => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getCropData = userReducer => {
  return async dispatch => {
    try {
      var myHeaders = new Headers();
      myHeaders.append(
        'Authorization',
        'Bearer ' + userReducer?.userDetails?.accessToken,
      );
      var raw = '';
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };
      fetch('https://agmart.ngrok.app/api/crops', requestOptions)
        .then(response => response.json())
        .then(response => {
          console.log(response?.data);
          dispatch({type: types.CROPS_LIST, payload: response?.data});
        })
        .catch(err => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };
};
