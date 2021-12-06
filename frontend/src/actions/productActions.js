import axios from 'axios'

import {
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  RESTAURANT_FILTER_REQUEST,
  RESTAURANT_FILTER_SUCCESS,
  RESTAURANT_FILTER_FAIL,
  RESTAURANT_FILTER_BY_LOC_REQUEST,
  RESTAURANT_FILTER_BY_LOC_SUCCESS,
  RESTAURANT_FILTER_BY_LOC_FAIL,
} from '../constants/productConstants'

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST })

    const { data } = await axios.get('/api/restaurant/getAllRestaurants')

    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/restaurant/getRestaurant/${id}`)
    //console.log(data)
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const filterProductsAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: RESTAURANT_FILTER_REQUEST })

    const { data } = await axios.get(
      `/api/restaurant/getFilteredRestaurants/${id}`
    )
    //console.log(data)
    dispatch({
      type: RESTAURANT_FILTER_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: RESTAURANT_FILTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const filterRestaurantsByLocationAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: RESTAURANT_FILTER_BY_LOC_REQUEST })

    const { data } = await axios.get(
      `/api/restaurant/filterRestaurantByLocation/${id}`
    )
    //console.log(data)
    dispatch({
      type: RESTAURANT_FILTER_BY_LOC_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: RESTAURANT_FILTER_BY_LOC_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
