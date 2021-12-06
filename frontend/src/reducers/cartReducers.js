import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_ADD_ITEM_SUCCESS,
  CART_REMOVE_ITEM_SUCCESS,
  CART_EDIT_FAIL,
} from '../constants/cartConstants'

const cartAddReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      //console.log("I'm at if")
      return { ...state, loading: true }
    case CART_ADD_ITEM_SUCCESS:
      const dish = action.payload
      const ifdishalreadyexist = state.cartItems.find(
        (x) => x.dishid === dish.dishid
      )
      if (ifdishalreadyexist) {
        console.log(state.cartItems)
        console.log(dish)
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.dishid === dish.dishid ? dish : x
          ),
        }
      } else {
        return {
          loading: false,
          cartItems: [...state.cartItems, dish],
          success: true,
        }
      }

    case CART_REMOVE_ITEM:
      return { loading: true }
    case CART_REMOVE_ITEM_SUCCESS:
      return { loading: false, success: true, cart: action.payload }
    case CART_EDIT_FAIL:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

export { cartAddReducer }
