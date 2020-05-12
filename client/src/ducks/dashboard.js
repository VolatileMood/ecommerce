import { combineReducers } from 'redux';

// Action Types
const DASHBOARD_FETCH_CATEGORIES_REQUEST = 'DASHBOARD_FETCH_CATEGORIES_REQUEST';
const DASHBOARD_FETCH_CATEGORIES_SUCCESS = 'DASHBOARD_FETCH_CATEGORIES_SUCCESS';
const DASHBOARD_FETCH_CATEGORIES_FAILURE = 'DASHBOARD_FETCH_CATEGORIES_FAILURE';
const DASHBOARD_CREATE_CATEGORY_REQUEST = 'DASHBOARD_CREATE_CATEGORY_REQUEST';
const DASHBOARD_CREATE_CATEGORY_SUCCESS = 'DASHBOARD_CREATE_CATEGORY_SUCCESS';
const DASHBOARD_CREATE_CATEGORY_FAILURE = 'DASHBOARD_CREATE_CATEGORY_FAILURE';
const DASHBOARD_PRODUCTS_REQUEST = 'DASHBOARD_PRODUCTS_REQUEST';
const DASHBOARD_PRODUCTS_SUCCESS = 'DASHBOARD_PRODUCTS_SUCCESS';
const DASHBOARD_PRODUCTS_FAILURE = 'DASHBOARD_PRODUCTS_FAILURE';
const DASHBOARD_USERS_REQUEST = 'DASHBOARD_USERS_REQUEST';
const DASHBOARD_USERS_SUCCESS = 'DASHBOARD_USERS_SUCCESS';
const DASHBOARD_USERS_FAILURE = 'DASHBOARD_USERS_FAILURE';
const DASHBOARD_ORDERS_REQUEST = 'DASHBOARD_ORDERS_REQUEST';
const DASHBOARD_ORDERS_SUCCESS = 'DASHBOARD_ORDERS_SUCCESS';
const DASHBOARD_ORDERS_FAILURE = 'DASHBOARD_ORDERS_FAILURE';

// Sub Reducers
const initialState = {
  items: null,
  isFetching: false,
};

const categories = (state = initialState, action) => {
  switch (action.type) {
    case DASHBOARD_FETCH_CATEGORIES_REQUEST:
    case DASHBOARD_CREATE_CATEGORY_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case DASHBOARD_FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        items: action.categories,
      };
    case DASHBOARD_FETCH_CATEGORIES_FAILURE:
    case DASHBOARD_CREATE_CATEGORY_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
};

const products = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const users = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const orders = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

// Main Reducer
export default combineReducers({
  categories,
  products,
  users,
  orders,
});

// Action Creators
const fetchCategoriesRequest = () => ({
  type: DASHBOARD_FETCH_CATEGORIES_REQUEST,
});

const fetchCategoriesSuccess = (categories) => ({
  type: DASHBOARD_FETCH_CATEGORIES_SUCCESS,
  categories,
});

const fetchCategoriesFailure = (error) => ({
  type: DASHBOARD_FETCH_CATEGORIES_FAILURE,
  error,
});

const createCategoryRequest = () => ({
  type: DASHBOARD_CREATE_CATEGORY_REQUEST,
});

const createCategorySuccess = (category) => ({
  type: DASHBOARD_CREATE_CATEGORY_SUCCESS,
  category,
});

const createCategoryFailure = (error) => ({
  type: DASHBOARD_CREATE_CATEGORY_FAILURE,
  error,
});

export const fetchCategories = () => async (dispatch) => {
  dispatch(fetchCategoriesRequest());
  try {
    const token = localStorage.getItem('act');
    const response = await fetch('/api/categories', {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const { data } = await response.json();
      dispatch(fetchCategoriesSuccess(data.categories));
    }
  } catch (error) {
    dispatch(fetchCategoriesFailure(error));
  }
};

export const createCategory = (data, setError) => async (dispatch) => {
  dispatch(createCategoryRequest());
  try {
    const token = localStorage.getItem('act');
    const response = await fetch('/api/categories', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const { status, data, message } = await response.json();
      if (status === 'success') {
        dispatch(createCategorySuccess(data.category));
      } else {
        dispatch(createCategoryFailure());
        setError(message);
      }
    }
  } catch (error) {
    dispatch(createCategoryFailure(error));
  }
};
