import 'whatwg-fetch';
import { decrementProgress, incrementProgress } from './progress';
import { clearError } from './error';
//import { response } from 'express';

// Action Creators
export const loginAttempt = () => ({ type: 'AUTHENTICATION_LOGIN_ATTEMPT' });
export const loginFailure = error => ({ type: 'AUTHENTICATION_LOGIN_FAILURE', error });
export const loginSuccess = json => ({ type: 'AUTHENTICATION_LOGIN_SUCCESS', json });
export const logoutFailure = error => ({ type: 'AUTHENTICATION_LOGOUT_FAILURE', error });
export const logoutSuccess = () => ({ type: 'AUTHENTICATION_LOGOUT_SUCCESS' });
export const passwordResetClear = () => ({ type: 'AUTHENTICATION_PASSWORD_RESET_CLEAR' });
export const registrationFailure = error => ({ type: 'AUTHENTICATION_REGISTRATION_FAILURE', error });
export const registrationSuccess = () => ({ type: 'AUTHENTICATION_REGISTRATION_SUCCESS' });
export const registrationSuccessViewed = () => ({ type: 'AUTHENTICATION_REGISTRATION_SUCCESS_VIEWED' });
export const sessionCheckFailure = () => ({ type: 'AUTHENTICATION_SESSION_CHECK_FAILURE' });
export const sessionCheckSuccess = json => ({ type: 'AUTHENTICATION_SESSION_CHECK_SUCCESS', json });
export const passwordResetHashCreated = () => ({ type: 'AUTHENTICATION_PASSWORD_RESET_HASH_CREATED' });
export const passwordResetHashFailure = error => ({ type: 'AUTHENTICATION_PASSWORD_RESET_HASH_FAILURE', error });

// Check User Session
export function checkSession() {
  return async (dispatch) => {
    //contact login API
    await fetch(
      // where to contact
      '/api/authentication/checksession',
      // what to send
      {
        method: 'GET',
        credentials: 'same-origin',
      },
    )
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      return null;
    })
    .then((json) => {
      if (json.username) {
        return dispatch(sessionCheckSuccess(json));
      } else {
        return dispatch(sessionCheckFailure());
      }
    })
    .catch(error => dispatch(sessionCheckFailure(error)));
  };
}

// Send Email to API for hashing
export function createHash(email) {
  return async (dispatch) => {
    // clear the error box if it's displayed
    dispatch(clearError());

    // turn on spinner
    dispatch(incrementProgress());
    
    // contact the API
    await fetch(
      // where to contact
      '/api/authentication/saveresethash',
      // what to send
      {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
      },
    )
    .then((response) => {
      // console.log("CREATE_HASH JSON_2");
      // console.log(response);
      console.log("RESPONSE JSON");
      console.log(response.status);
      if (response.status === 200) {
        console.log("CREATE_HASH JSON");
        console.log(response);
        return response.json();
      }
      return null;
    })
    .then((json) => {
      console.log("CREATE_HASH JSON");
      console.log(json);
      if (json.success) {
        console.log("CREATE_HASH JSON Success");
        console.log(json.username);
        return dispatch(passwordResetHashCreated(json));
      }
      console.log("CREATE_HASH JSON Success");
      console.log(json);
      return dispatch(passwordResetHashFailure(new Error('Something went wrong. Please try again.')));
    })
    .catch(error => dispatch(passwordResetHashFailure(error)));
    
    // turn off spinner
    return dispatch(decrementProgress());
  };
}

// Log User Out
export function logUserOut() {
  return async (dispatch) => {
    // clear the error box if it's displayed
    dispatch(clearError());

    // turn on spinner
    dispatch(incrementProgress());

    // contact the API
    await fetch(
      // where to contact
      '/api/authentication/logout',
      // what to send
      {
        method: 'GET',
        credentials: 'same-origin',
      },
    )
    .then((response) => {
      if (response.status === 200) {
        dispatch(logoutSuccess());
      } else {
        dispatch(logoutFailure(new Error(response.status)));
      }
    })
    .catch((error) => {
      dispatch(logoutFailure(new Error(error)));
    });

    // turn off spinner
    return dispatch(decrementProgress());
  };
}

// Log User In
export function logUserIn(userData) {
  return async (dispatch) => {
    // clear the error box if it's displayed
    dispatch(clearError());
    
    // turn on spinner
    dispatch(incrementProgress());

    // register that a login is being made
    dispatch(loginAttempt());

    //contact login API
    await fetch(
      // where to contact
      '/api/authentication/login',
      // what to send
      {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
      },
    )
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      return null;
    })
    .then((json) => {
      if (json) {
        dispatch(loginSuccess(json));
      } else {
        dispatch(loginFailure(new Error('Email or Password Incorrect. Please Try Again.')));
      }
    })
    .catch((error) => {
      dispatch(loginFailure(new Error(error)));
    });

    // turn off spinner
    return dispatch(decrementProgress());
  };
}

// Register a User
export function registerUser(userData) {
  return async (dispatch) => {
    // clear the error box if it's displayed
    dispatch(clearError());
    
    // turn on spinner
    dispatch(incrementProgress());

    // contact the API
    await fetch(
      // where to contact
      '/api/authentication/register',
      // what to send
      {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
      },
    )
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      return null;
    })
    .then(async (json) => {
      if (json && json.username) {
        await dispatch(loginSuccess(json));
        await dispatch(registrationSuccess());
      } else {
        dispatch(registrationFailure(new Error(json.error.message ? 'Email or Username already exists.' : json.error)));
      }
    })
    .catch((error) => {
      dispatch(registrationFailure(new Error(error.message || 'Registration Failed Please Try Again.')));
    });

    // turn off spinner
    return dispatch(decrementProgress());
  };
}