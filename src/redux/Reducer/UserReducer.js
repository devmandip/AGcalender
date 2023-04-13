import * as types from '../Actions/ActionsTypes';

const initialState = {
  login: false,
  userDetails: '',
  userWiseDetails: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.IS_LOGIN:
      return {
        ...state,
        login: action.payload,
      };
    case types.USER_DETAILS: {
      return {
        ...state,
        userDetails: action.payload,
      };
    }
    case types.USER_WISE_DETAILS: {
      return {
        ...state,
        userWiseDetails: action.payload,
      };
    }
    case types.LOGOUT:
      return {
        initialState,
      };

    default:
      return state;
  }
};
