import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  productListReducer,
  productDetailsReducer,
} from './reducers/productReducers'
import { userLoginReducer, userRegisterReducer } from './reducers/userReducers'
import {
  restaurantLoginReducer,
  restaurantRegisterReducer,
} from './reducers/restaurantReducers'
import { menuAddReducer } from './reducers/menuReducers'
import { cartAddReducer } from './reducers/cartReducers'

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  userLogin: userLoginReducer,
  restaurantLogin: restaurantLoginReducer,
  userRegister: userRegisterReducer,
  restaurantRegister: restaurantRegisterReducer,
  menuadditem: menuAddReducer,
  cartItems: cartAddReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null
const restaurantInfoFromStorage = localStorage.getItem('restaurantInfo')
  ? JSON.parse(localStorage.getItem('restaurantInfo'))
  : null

const cartItemsFromStorage = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : []

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  restaurantLogin: { restaurantInfo: restaurantInfoFromStorage },
  cartItems: { cartItems: cartItemsFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
