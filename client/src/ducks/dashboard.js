import { combineReducers } from 'redux';
import validations from '../utilities/validations';

// Action Types
const DASHBOARD_FETCH_CATEGORIES_REQUEST = 'DASHBOARD_FETCH_CATEGORIES_REQUEST';
const DASHBOARD_FETCH_CATEGORIES_SUCCESS = 'DASHBOARD_FETCH_CATEGORIES_SUCCESS';
const DASHBOARD_FETCH_CATEGORIES_FAILURE = 'DASHBOARD_FETCH_CATEGORIES_FAILURE';
const DASHBOARD_CREATE_CATEGORY_REQUEST = 'DASHBOARD_CREATE_CATEGORY_REQUEST';
const DASHBOARD_CREATE_CATEGORY_SUCCESS = 'DASHBOARD_CREATE_CATEGORY_SUCCESS';
const DASHBOARD_CREATE_CATEGORY_FAILURE = 'DASHBOARD_CREATE_CATEGORY_FAILURE';
const DASHBOARD_UPDATE_CATEGORY_REQUEST = 'DASHBOARD_UPDATE_CATEGORY_REQUEST';
const DASHBOARD_UPDATE_CATEGORY_SUCCESS = 'DASHBOARD_UPDATE_CATEGORY_SUCCESS';
const DASHBOARD_UPDATE_CATEGORY_FAILURE = 'DASHBOARD_UPDATE_CATEGORY_FAILURE';
const DASHBOARD_DELETE_CATEGORY_REQUEST = 'DASHBOARD_DELETE_CATEGORY_REQUEST';
const DASHBOARD_DELETE_CATEGORY_SUCCESS = 'DASHBOARD_DELETE_CATEGORY_SUCCESS';
const DASHBOARD_DELETE_CATEGORY_FAILURE = 'DASHBOARD_DELETE_CATEGORY_FAILURE';
const DASHBOARD_FETCH_PRODUCTS_REQUEST = 'DASHBOARD_FETCH_PRODUCTS_REQUEST';
const DASHBOARD_FETCH_PRODUCTS_SUCCESS = 'DASHBOARD_FETCH_PRODUCTS_SUCCESS';
const DASHBOARD_FETCH_PRODUCTS_FAILURE = 'DASHBOARD_FETCH_PRODUCTS_FAILURE';
const DASHBOARD_FETCH_PRODUCT_REQUEST = 'DASHBOARD_FETCH_PRODUCT_REQUEST';
const DASHBOARD_FETCH_PRODUCT_SUCCESS = 'DASHBOARD_FETCH_PRODUCT_SUCCESS';
const DASHBOARD_FETCH_PRODUCT_FAILURE = 'DASHBOARD_FETCH_PRODUCT_FAILURE';
const DASHBOARD_CREATE_PRODUCT_REQUEST = 'DASHBOARD_CREATE_PRODUCT_REQUEST';
const DASHBOARD_CREATE_PRODUCT_SUCCESS = 'DASHBOARD_CREATE_PRODUCT_SUCCESS';
const DASHBOARD_CREATE_PRODUCT_FAILURE = 'DASHBOARD_CREATE_PRODUCT_FAILURE';
const DASHBOARD_UPDATE_PRODUCT_REQUEST = 'DASHBOARD_UPDATE_PRODUCT_REQUEST';
const DASHBOARD_UPDATE_PRODUCT_SUCCESS = 'DASHBOARD_UPDATE_PRODUCT_SUCCESS';
const DASHBOARD_UPDATE_PRODUCT_FAILURE = 'DASHBOARD_UPDATE_PRODUCT_FAILURE';
const DASHBOARD_DELETE_PRODUCT_REQUEST = 'DASHBOARD_DELETE_PRODUCT_REQUEST';
const DASHBOARD_DELETE_PRODUCT_SUCCESS = 'DASHBOARD_DELETE_PRODUCT_SUCCESS';
const DASHBOARD_DELETE_PRODUCT_FAILURE = 'DASHBOARD_UPDATE_PRODUCT_FAILURE';
const DASHBOARD_FETCH_USERS_REQUEST = 'DASHBOARD_FETCH_USERS_REQUEST';
const DASHBOARD_FETCH_USERS_SUCCESS = 'DASHBOARD_FETCH_USERS_SUCCESS';
const DASHBOARD_FETCH_USERS_FAILURE = 'DASHBOARD_FETCH_USERS_FAILURE';
const DASHBOARD_FETCH_USER_REQUEST = 'DASHBOARD_FETCH_USER_REQUEST';
const DASHBOARD_FETCH_USER_SUCCESS = 'DASHBOARD_FETCH_USER_SUCCESS';
const DASHBOARD_FETCH_USER_FAILURE = 'DASHBOARD_FETCH_USER_FAILURE';
const DASHBOARD_UPDATE_USER_REQUEST = 'DASHBOARD_UPDATE_USER_REQUEST';
const DASHBOARD_UPDATE_USER_SUCCESS = 'DASHBOARD_UPDATE_USER_SUCCESS';
const DASHBOARD_UPDATE_USER_FAILURE = 'DASHBOARD_UPDATE_USER_FAILURE';
const DASHBOARD_FETCH_ORDERS_REQUEST = 'DASHBOARD_FETCH_ORDERS_REQUEST';
const DASHBOARD_FETCH_ORDERS_SUCCESS = 'DASHBOARD_FETCH_ORDERS_SUCCESS';
const DASHBOARD_FETCH_ORDERS_FAILURE = 'DASHBOARD_FETCH_ORDERS_FAILURE';

// Sub Reducers
const initialState = {
  items: null,
  isFetching: false,
};

const categories = (state = initialState, action) => {
  switch (action.type) {
    case DASHBOARD_FETCH_CATEGORIES_REQUEST:
    case DASHBOARD_CREATE_CATEGORY_REQUEST:
    case DASHBOARD_UPDATE_CATEGORY_REQUEST:
    case DASHBOARD_DELETE_CATEGORY_REQUEST:
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
    case DASHBOARD_DELETE_CATEGORY_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    case DASHBOARD_CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        isFetching: false,
        items: [...state.items, action.category],
      };
    case DASHBOARD_UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        isFetching: false,
        items: state.items.map((item) => {
          if (item.id === action.category.id) {
            return action.category;
          } else {
            return item;
          }
        }),
      };
    case DASHBOARD_DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        isFetching: false,
        items: state.items.filter((item) => item.id !== action.categoryId),
      };
    default:
      return state;
  }
};

const products = (state = initialState, action) => {
  switch (action.type) {
    case DASHBOARD_FETCH_PRODUCTS_REQUEST:
    case DASHBOARD_CREATE_PRODUCT_REQUEST:
    case DASHBOARD_DELETE_PRODUCT_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case DASHBOARD_FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        items: action.products,
      };
    case DASHBOARD_CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        items: [...state.items, action.product],
      };
    case DASHBOARD_DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        items: state.items.filter((item) => item.id !== action.productId),
      };
    case DASHBOARD_CREATE_PRODUCT_FAILURE:
    case DASHBOARD_FETCH_PRODUCTS_FAILURE:
    case DASHBOARD_DELETE_PRODUCT_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case DASHBOARD_FETCH_USERS_REQUEST:
    case DASHBOARD_UPDATE_USER_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case DASHBOARD_FETCH_USERS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        items: action.users,
      };
    case DASHBOARD_FETCH_USERS_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
};

const orders = (state = initialState, action) => {
  switch (action.type) {
    case DASHBOARD_FETCH_ORDERS_REQUEST:
      return {
        ...state,
        isFetching: false,
      };
    case DASHBOARD_FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        items: action.orders,
      };
    case DASHBOARD_FETCH_ORDERS_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
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

const updateCategoryRequest = () => ({
  type: DASHBOARD_UPDATE_CATEGORY_REQUEST,
});

const updateCategorySuccess = (category) => ({
  type: DASHBOARD_UPDATE_CATEGORY_SUCCESS,
  category,
});

const updateCategoryFailure = (error) => ({
  type: DASHBOARD_UPDATE_CATEGORY_FAILURE,
  error,
});

const deleteCategoryRequest = () => ({
  type: DASHBOARD_DELETE_CATEGORY_REQUEST,
});

const deleteCategorySuccess = (categoryId) => ({
  type: DASHBOARD_DELETE_CATEGORY_SUCCESS,
  categoryId,
});

const deleteCategoryFailure = (error) => ({
  type: DASHBOARD_DELETE_CATEGORY_FAILURE,
  error,
});

const fetchProductsRequest = () => ({
  type: DASHBOARD_FETCH_PRODUCTS_REQUEST,
});

const fetchProductsSuccess = (products) => ({
  type: DASHBOARD_FETCH_PRODUCTS_SUCCESS,
  products,
});

const fetchProductsFailure = (error) => ({
  type: DASHBOARD_FETCH_PRODUCTS_FAILURE,
  error,
});

const fetchProductRequest = () => ({
  type: DASHBOARD_FETCH_PRODUCT_REQUEST,
});

const fetchProductSuccess = (product) => ({
  type: DASHBOARD_FETCH_PRODUCT_SUCCESS,
  products,
});

const fetchProductFailure = (error) => ({
  type: DASHBOARD_FETCH_PRODUCT_FAILURE,
  error,
});

const createProductRequest = () => ({
  type: DASHBOARD_CREATE_PRODUCT_REQUEST,
});

const createProductSuccess = (product) => ({
  type: DASHBOARD_CREATE_PRODUCT_SUCCESS,
  product,
});

const createProductFailure = (error) => ({
  type: DASHBOARD_CREATE_PRODUCT_FAILURE,
  error,
});

const updateProductRequest = () => ({
  type: DASHBOARD_UPDATE_PRODUCT_REQUEST,
});

const updateProductSuccess = (product) => ({
  type: DASHBOARD_UPDATE_PRODUCT_SUCCESS,
  product,
});

const updateProductFailure = (error) => ({
  type: DASHBOARD_UPDATE_PRODUCT_FAILURE,
  error,
});

const deleteProductRequest = () => ({
  type: DASHBOARD_DELETE_PRODUCT_REQUEST,
});

const deleteProductSuccess = (productId) => ({
  type: DASHBOARD_DELETE_PRODUCT_SUCCESS,
  productId,
});

const deleteProductFailure = (error) => ({
  type: DASHBOARD_DELETE_PRODUCT_FAILURE,
  error,
});

const fetchUsersRequest = () => ({
  type: DASHBOARD_FETCH_USERS_REQUEST,
});

const fetchUsersSuccess = (users) => ({
  type: DASHBOARD_FETCH_USERS_SUCCESS,
  users,
});

const fetchUsersFailure = (error) => ({
  type: DASHBOARD_FETCH_USERS_FAILURE,
  error,
});

const fetchUserRequest = () => ({
  type: DASHBOARD_FETCH_USER_REQUEST,
});

const fetchUserSuccess = (user) => ({
  type: DASHBOARD_FETCH_USER_SUCCESS,
  users,
});

const fetchUserFailure = (error) => ({
  type: DASHBOARD_FETCH_USER_FAILURE,
  error,
});

const updateUserRequest = () => ({
  type: DASHBOARD_UPDATE_USER_REQUEST,
});

const updateUserSuccess = (user) => ({
  type: DASHBOARD_UPDATE_USER_SUCCESS,
  user,
});

const updateUserFailure = (error) => ({
  type: DASHBOARD_UPDATE_USER_FAILURE,
  error,
});

const fetchOrdersRequest = () => ({
  type: DASHBOARD_FETCH_ORDERS_REQUEST,
});

const fetchOrdersSuccess = (orders) => ({
  type: DASHBOARD_FETCH_ORDERS_SUCCESS,
  orders,
});

const fetchOrdersFailure = (error) => ({
  type: DASHBOARD_FETCH_ORDERS_FAILURE,
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

export const createCategory = (data, clear, close, setErrors) => async (
  dispatch
) => {
  dispatch(createCategoryRequest());
  try {
    const { valid, errors } = validations.category(data);
    if (!valid) {
      return setErrors(errors);
    }
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
        clear();
        close();
      } else {
        dispatch(createCategoryFailure());
        setErrors(message);
      }
    }
  } catch (error) {
    dispatch(createCategoryFailure(error));
  }
};

export const updateCategory = (data, categoryId, close) => async (dispatch) => {
  dispatch(updateCategoryRequest());
  try {
    const token = localStorage.getItem('act');
    if (!token) {
      return dispatch(updateCategoryFailure('Access Token is required.'));
    }
    const response = await fetch(`/api/categories/${categoryId}`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const { status, data } = await response.json();
      if (status === 'success') {
        dispatch(updateCategorySuccess(data.category));
        close();
      } else {
        dispatch(updateCategoryFailure());
      }
    }
  } catch (error) {
    dispatch(updateCategoryFailure(error));
  }
};

export const deleteCategory = (categoryId, close) => async (dispatch) => {
  dispatch(deleteCategoryRequest());
  try {
    const token = localStorage.getItem('act');
    if (!token) {
      return dispatch(deleteCategoryFailure('Access Token is required.'));
    }
    const response = await fetch(`/api/categories/${categoryId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const { status, message } = await response.json();
      if (status === 'success') {
        dispatch(deleteCategorySuccess(categoryId));
        close();
      } else {
        dispatch(deleteCategoryFailure(message));
      }
    }
  } catch (error) {
    dispatch(deleteCategoryFailure(error));
  }
};

export const fetchProducts = () => async (dispatch) => {
  dispatch(fetchProductsRequest());
  try {
    const response = await fetch('/api/products', {
      method: 'GET',
    });
    if (response.ok) {
      const { status, data, message } = await response.json();
      if (status === 'success') {
        dispatch(fetchProductsSuccess(data.products));
      } else {
        dispatch(fetchProductsFailure(message));
      }
    }
  } catch (error) {
    dispatch(fetchProductsFailure(error));
  }
};

export const fetchProduct = (productId) => async (dispatch) => {
  dispatch(fetchProductRequest());
  try {
    const response = await fetch(`/api/products/${productId}`, {
      method: 'GET',
    });
    if (response.ok) {
      const { status, data, message } = await response.json();
      if (status === 'success') {
        dispatch(fetchProductSuccess(data.product));
      } else {
        dispatch(fetchProductFailure(message));
      }
    }
  } catch (error) {
    dispatch(fetchProductFailure(error));
  }
};

export const createProduct = (data, images) => async (dispatch) => {
  dispatch(createProductRequest());
  try {
    const token = localStorage.getItem('act');
    if (!token) {
      return dispatch(createProductFailure('Access token is required.'));
    }
    const response = await fetch('/api/products', {
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
        // Upload product images.
        const resp = await fetch(`/api/product_images${data.id}`, {
          method: 'POST',
          headers: {
            authorization: `Bearer ${token}`,
          },
          body: images,
        });
        if (resp.ok) {
          const { status } = await resp.json();
          if (status === 'success') {
            dispatch(createProductSuccess(data.product));
          }
        }
      } else {
        return dispatch(createProductFailure(message));
      }
    }
  } catch (error) {
    dispatch(createProductFailure(error));
  }
};

export const updateProduct = (productId, data) => async (dispatch) => {
  dispatch(updateProductRequest());
  try {
    const token = localStorage.getItem('act');
    if (!token) {
      return dispatch(updateProductFailure('Access token is required.'));
    }
    const response = await fetch(`/api/products/${productId}`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const { status, data, message } = await response.json();
      if (status === 'success') {
        dispatch(updateProductSuccess(data.product));
      } else {
        dispatch(updateProductFailure(message));
      }
    }
  } catch (error) {
    dispatch(updateProductFailure(error));
  }
};

export const deleteProduct = (productId) => async (dispatch) => {
  dispatch(deleteProductRequest());
  try {
    const token = localStorage.getItem('act');
    if (!token) {
      return dispatch(deleteProductFailure('Access token is required.'));
    }
    const response = await fetch(`/api/products/${productId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const { status, message } = await response.json();
      if (status === 'success') {
        dispatch(deleteProductSuccess(productId));
      } else {
        dispatch(deleteProductFailure());
      }
    }
  } catch (error) {
    dispatch(deleteProductFailure(error));
  }
};

export const fetchUsers = () => async (dispatch) => {
  try {
    dispatch(fetchUsersRequest());
    const token = localStorage.getItem('act');
    if (!token) {
      return dispatch(fetchUsersFailure('Access token is required.'));
    }
    const response = await fetch('/api/users', {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const { status, data, message } = await response.json();
      if (status === 'success') {
        dispatch(fetchUsersSuccess(data.users));
      } else {
        dispatch(fetchUsersFailure(message));
      }
    }
  } catch (error) {
    dispatch(fetchUsersFailure(error));
  }
};

export const fetchUser = (userId) => async (dispatch) => {
  dispatch(fetchUserRequest());
  try {
    const token = localStorage.getItem('act');
    if (!token) {
      return dispatch(fetchUserFailure('Access token is required.'));
    }
    const response = await fetch(`/api/users/${userId}`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const { status, data, message } = await response.json();
      if (status === 'success') {
        dispatch(fetchUserSuccess(data.user));
      } else {
        dispatch(fetchUserFailure(message));
      }
    }
  } catch (error) {
    dispatch(fetchUserFailure(error));
  }
};

export const updateUser = (userId, data) => async (dispatch) => {
  dispatch(updateUserRequest());
  try {
    const token = localStorage.getItem('act');
    const response = await fetch(`/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const { status, data, message } = await response.json();
      if (status === 'success') {
        dispatch(updateUserSuccess(data.user));
      } else {
        dispatch(updateUserFailure(message));
      }
    }
  } catch (error) {
    dispatch(updateUserFailure(error));
  }
};

export const fetchOrders = () => async (dispatch) => {
  dispatch(fetchOrdersRequest());
  try {
    const response = await fetch('/api/orders', {
      method: 'GET',
    });
    if (response.ok) {
      const { status, data, message } = await response.json();
      if (status === 'success') {
        dispatch(fetchOrdersSuccess(data.orders));
      } else {
        dispatch(fetchOrdersFailure(message));
      }
    }
  } catch (error) {
    dispatch(fetchOrdersFailure(error));
  }
};
