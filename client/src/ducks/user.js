// Actions
const REGISTER_REQUEST = 'REGISTER_REQUEST';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const REGISTER_FAILURE = 'REGISTER_FAILURE';

const initialState = {
  session: null,
  isAuthenticated: false,
  isFetching: false,
};
// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        session: action.user,
        isAuthenticated: true,
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
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

export const register = (data) => async (dispatch) => {
  dispatch(registerRequest());
  try {
    const response = await fetch('/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const responseObj = await response.json();
      if (responseObj.status === 'success') {
        const {
          data: { user, accessToken },
        } = responseObj;
        dispatch(registerSuccess(user));
        localStorage.setItem('act', accessToken);
      } else {
        dispatch(registerFailure(responseObj.message));
      }
    }
  } catch (error) {
    dispatch(registerFailure(error));
  }
};
