import * as types from '../Actions/ActionsTypes';

const initialState = {
  login: false,
  userDetails: '',
  userWiseDetails: '',
  categoryList: [],
  cropsList: [],
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
    case types.CATEGORIES_LIST: {
      return {
        ...state,
        categoryList: action.payload,
      };
    }
    case types.CROPS_LIST: {
      return {
        ...state,
        cropsList: action.payload,
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
