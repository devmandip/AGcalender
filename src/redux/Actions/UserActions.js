import {ApiList} from '../../api/ApiList';
import {getServiceCall} from '../../api/Webservice';
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
      getServiceCall(
        ApiList.USER_PROFILE + userReducer?.userDetails?.userId,
        '',
      )
        .then(async responseJson => {
          if (responseJson?.data != '') {
            dispatch({
              type: types.USER_WISE_DETAILS,
              payload: responseJson?.data,
            });
          }
        })
        .catch(error => {});
    } catch (error) {
      console.log(error);
    }
  };
};

export const getCategoriesData = () => {
  return async dispatch => {
    try {
      getServiceCall(ApiList.CATEGORIES, '')
        .then(async responseJson => {
          if (responseJson?.data != '') {
            dispatch({
              type: types.CATEGORIES_LIST,
              payload: responseJson?.data?.data,
            });
          }
        })
        .catch(error => {});
    } catch (error) {
      console.log(error);
    }
  };
};

export const getCropData = (id = '') => {
  return async dispatch => {
    try {
      getServiceCall(ApiList.CROPS + '?categoryId=' + id, '')
        .then(async responseJson => {
          if (responseJson?.data != '') {
            dispatch({
              type: types.CROPS_LIST,
              payload: responseJson?.data?.data,
            });
          }
        })
        .catch(error => {});
    } catch (error) {
      console.log(error);
      getCropData();
    }
  };
};

export const setCurrentLocation = payload => {
  return dispatch => {
    dispatch({type: types.CURRENT_LOCATION, payload: payload});
  };
};
