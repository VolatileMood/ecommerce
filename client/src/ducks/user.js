import validations from '../utilities/validations';

// Actions
const REGISTER_REQUEST = 'REGISTER_REQUEST';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const REGISTER_FAILURE = 'REGISTER_FAILURE';
const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';
const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

const initialState = {
  session: null,
  isAuthenticated: false,
  isFetching: false,
};
// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case LOGOUT_REQUEST:
    case LOAD_USER_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        session: action.user,
        isAuthenticated: true,
      };
    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case LOGOUT_FAILURE:
    case LOAD_USER_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    case LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
};

// Action Creators
const registerRequest = () => ({
  type: REGISTER_REQUEST,
});

const registerSuccess = (user) => ({
  type: REGISTER_SUCCESS,
  user,
});

const registerFailure = (error) => ({
  type: REGISTER_FAILURE,
  error,
});

const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  user,
});

const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  error,
});

const logoutRequest = () => ({
  type: LOGOUT_REQUEST,
});

const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

const logoutFailure = (error) => ({
  type: LOGOUT_FAILURE,
  error,
});

const loadUserRequest = () => ({
  type: LOAD_USER_REQUEST,
});

const loadUserSuccess = (user) => ({
  type: LOAD_USER_SUCCESS,
  user,
});

const loadUserFailure = (error) => ({
  type: LOAD_USER_FAILURE,
  error,
});

export const register = (data, clearForm, closeModal, setFormErrors) => async (
  dispatch
) => {
  // Start the register request.
  dispatch(registerRequest());
  try {
    // Send POST request with form data.
    const response = await fetch('/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    // Client side form validation.
    let formErrors = validations.register(data);
    // If the register request was successful,
    if (response.ok) {
      // Convert JSON response to a javascript object.
      const responseObj = await response.json();
      if (responseObj.status === 'success') {
        const {
          data: { user, accessToken },
        } = responseObj;
        // Save user data to the redux state.
        dispatch(registerSuccess(user));
        // Save access token to the local storage.
        localStorage.setItem('act', accessToken);
        // Clear the register form.
        clearForm();
        // Close register modal.
        closeModal();
      } else {
        // The email is already taken.
        dispatch(registerFailure());
        formErrors = { ...formErrors, ...responseObj.message };
      }
    } else {
      dispatch(registerFailure());
    }
    // If any form errors occurred, display them.
    if (Object.keys(formErrors).length > 0) {
      setFormErrors(formErrors);
    }
  } catch (error) {
    dispatch(registerFailure(error));
  }
};

export const login = (data, clearForm, closeModal, setFormErrors) => async (
  dispatch
) => {
  dispatch(loginRequest());
  try {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    let formErrors = validations.login(data);
    if (response.ok) {
      // Convert JSON response to a javascript object.
      const responseObj = await response.json();
      if (responseObj.status === 'success') {
        const {
          data: { user, accessToken },
        } = responseObj;
        // Save user data to the redux state.
        dispatch(loginSuccess(user));
        // Save access token to the local storage.
        localStorage.setItem('act', accessToken);
        // Clear the register form.
        clearForm();
        // Close register modal.
        closeModal();
      } else {
        // The email is already taken.
        dispatch(loginFailure(responseObj.message));
      }
    } else {
      dispatch(loginFailure());
    }
    if (Object.keys(formErrors).length > 0) {
      setFormErrors(formErrors);
    }
  } catch (error) {
    console.log(error);
    dispatch(loginFailure(error));
  }
};

export const logout = () => async (dispatch) => {
  dispatch(logoutRequest());
  try {
    // Remove refresh token from cookies.
    const response = await fetch('/api/users/logout', {
      method: 'GET',
      credentials: 'include',
    });
    if (response.ok) {
      dispatch(logoutSuccess());
      // Remove access token from local storage.
      localStorage.removeItem('act');
    } else {
      dispatch(logoutFailure());
    }
  } catch (error) {
    dispatch(logoutFailure(error));
  }
};

export const loadUser = () => async (dispatch) => {
  dispatch(loadUserRequest());
  try {
    // Get access token from local storage.
    const accessToken = localStorage.getItem('act');
    if (!accessToken) {
      return dispatch(loadUserFailure());
    }
    const response = await fetch('/api/users/load_user', {
      method: 'GET',
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.ok) {
      const responseObj = await response.json();
      dispatch(loadUserSuccess(responseObj.data.user));
    }
  } catch (error) {
    console.log('Error', error);
    dispatch(loadUserFailure(error));
  }
};
