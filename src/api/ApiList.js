// LINK Beta URL 
export var BASE_URL = 'https://agmart.ngrok.app/api/'

// LINK Live URL 

export const ApiList = {

    // API Endpoints
    SEND_OTP: BASE_URL + 'auth/auth',
    VERIIFY_OTP: BASE_URL + 'auth/authenticate',
    SING_UP: BASE_URL + 'auth/signup',
    CROPS: BASE_URL + 'crops',
    CATEGORIES: BASE_URL + 'categories',
    USER_PROFILE: BASE_URL + 'user/',
    ADD_CROP: BASE_URL + 'listing',
    LISITNG_CALENDER: BASE_URL + 'listing/calendar',
    MARKET_RATES: BASE_URL + 'market/rates',
  
};