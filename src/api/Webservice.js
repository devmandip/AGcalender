import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getServiceCall = async (endpoint, params, auth = false) => {
  let token = await AsyncStorage.getItem('token');

  var headers = {
    'Content-Type': 'application/json',
  };
  if (!auth) {
    headers = {
      Authorization: 'Bearer ' + token,
    };
  }

  console.log('REQUEST URL:', endpoint);
  console.log('HEADER:', JSON.stringify(headers));
  console.log('PARAMS:', JSON.stringify(params));

  return axios
    .get(endpoint, {
      headers: headers,
      params,
    })
    .then(response => {
      console.log('RESPONSE:', JSON.stringify(response));
      return response;
    })
    .catch(error => {
      console.log('ERROR:', JSON.stringify(error));
      throw error;
    });
};

export const postServiceCall = async (
  endpoint,
  params,
  auth = false,
  multipart = false,
) => {
  let token = await AsyncStorage.getItem('token');

  var headers = {
    'Content-Type': 'application/json',
  };
  if (!auth) {
    if (multipart) {
      headers = {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'multipart/form-data',
      };
    } else {
      headers = {
        Authorization: 'Bearer ' + token,
      };
    }
  }

  console.log('REQUEST URL:', endpoint);
  console.log('HEADER:', JSON.stringify(headers));
  console.log('PARAMS:', JSON.stringify(params));

  return axios
    .post(endpoint, params, {
      headers: headers,
    })
    .then(response => {
      console.log('RESPONSE:', JSON.stringify(response));
      return response;
    })
    .catch(error => {
      console.log('ERROR:', JSON.stringify(error));
      throw error;
    });
};

export const putServiceCall = async (endpoint, params, auth = false) => {
  let token = await AsyncStorage.getItem('token');

  var headers = {
    'Content-Type': 'application/json',
  };
  if (!auth) {
    headers = {
      Authorization: 'Bearer ' + token,
    };
  }

  console.log('REQUEST URL:', endpoint);
  console.log('HEADER:', JSON.stringify(headers));
  console.log('PARAMS:', JSON.stringify(params));

  return axios
    .put(endpoint, params, {
      headers: headers,
    })
    .then(response => {
      console.log('RESPONSE:', JSON.stringify(response));
      return response;
    })
    .catch(error => {
      console.log('ERROR:', JSON.stringify(error));
      throw error;
    });
};

export const deleteServiceCall = async (endpoint, params, auth = false) => {
  let token = await AsyncStorage.getItem('token');

  var headers = {
    'Content-Type': 'application/json',
  };
  if (!auth) {
    headers = {
      Authorization: 'Bearer ' + token,
    };
  }

  console.log('REQUEST URL:', endpoint);
  console.log('HEADER:', JSON.stringify(headers));
  console.log('PARAMS:', JSON.stringify(params));

  return axios
    .delete(endpoint, {
      headers: headers,
      params,
    })
    .then(response => {
      console.log('RESPONSE:', JSON.stringify(response));
      return response;
    })
    .catch(error => {
      console.log('ERROR:', JSON.stringify(error));
      throw error;
    });
};
