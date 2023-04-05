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
