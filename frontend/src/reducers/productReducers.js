import {
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  RESTAURANT_FILTER_BY_LOC_FAIL,
  RESTAURANT_FILTER_BY_LOC_REQUEST,
  RESTAURANT_FILTER_BY_LOC_SUCCESS,
  RESTAURANT_FILTER_FAIL,
  RESTAURANT_FILTER_REQUEST,
  RESTAURANT_FILTER_SUCCESS,
} from '../constants/productConstants'

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] }
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload }
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload }
    case RESTAURANT_FILTER_REQUEST:
      return { loading: true, products: [] }
    case RESTAURANT_FILTER_SUCCESS:
      //console.log(action.payload)
      return { loading: false, products: action.payload }
    case RESTAURANT_FILTER_FAIL:
      return { loading: false, error: action.payload }
    case RESTAURANT_FILTER_BY_LOC_REQUEST:
      return { loading: true, products: [] }
    case RESTAURANT_FILTER_BY_LOC_SUCCESS:
      //console.log(action.payload)
      return { loading: false, products: action.payload }
    case RESTAURANT_FILTER_BY_LOC_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, ...state }
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload }
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
