import * as types from './ActionsTypes';

export const userData = payload => {
  return {
    type: types.USER_DETAILS,
    payload,
  };
};
