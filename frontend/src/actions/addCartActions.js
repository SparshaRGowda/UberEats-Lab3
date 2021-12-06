import axios from 'axios'
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_ADD_ITEM_SUCCESS,
  CART_REMOVE_ITEM_SUCCESS,
  CART_EDIT_FAIL,
} from '../constants/cartConstants'

export const addtocartaction = (dish) => async (dispatch, getState) => {
  //export const addtocartaction = (dish, dishid) => async (dispatch, getState) => {const { data } = await axios.get(`/api/products/${dishid}`)
  //console.log('HI')
  // console.log(dish)
  try {
    const dishAdded = {
      dishname: dish.dishname,
      dishtype: dish.dishtype,
      dishprice: dish.dishprice,
      dishquant: dish.dishquant,
      restid: dish.restid,
      dishid: dish.dishid,
    }
    console.log(dishAdded)
    dispatch({
      type: CART_ADD_ITEM,
    })

    //localStorage.setItem('cartItems', JSON.stringify(getState))

    const { cartItems } = getState()
    const { cartItems: cartList } = cartItems

    console.log(cartItems)

    const ifdifferentitem = cartList.find(
      (cartitem) => cartitem.restid !== dish.restid
    )
    if (ifdifferentitem) {
      dispatch({
        type: CART_EDIT_FAIL,
        payload: 'items from different restaurant',
      })
    } else {
      //console.log('Heyy')
      dispatch({
        type: CART_ADD_ITEM_SUCCESS,
        payload: dishAdded,
      })
      localStorage.setItem(
        'cart',
        JSON.stringify(getState().cartItems.cartItems)
      )
    }

    /*dispatch({
      type: CART_ADD_ITEM_SUCCESS,
      payload: dishAdded,
    })*/

    //
  } catch (error) {
    dispatch({
      type: CART_EDIT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const removeFromcartaction = () => async (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM_SUCCESS,
  })
  localStorage.removeItem('cart')
}
