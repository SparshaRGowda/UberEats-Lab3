import axios from 'axios'
import { RESTAURANT_LOGIN_FAIL, RESTAURANT_LOGIN_REQUEST, RESTAURANT_LOGIN_SUCCESS, RESTAURANT_LOGOUT, RESTAURANT_REGISTER_FAIL, RESTAURANT_REGISTER_REQUEST, RESTAURANT_REGISTER_SUCCESS } from "../constants/restaurantConstants"

export const restlogin = (email, password) => async (dispatch) => {
    //console.log(password)
    try {
        dispatch({
            type: RESTAURANT_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }

        const {data} = await axios.post('/api/restaurant/authRestaurant', {email, password}, config)
        console.log(data)
        dispatch ({
            type: RESTAURANT_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('restaurantInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: RESTAURANT_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const restlogout = () => (dispatch) => {
    localStorage.removeItem('restaurantInfo')
    dispatch({type: RESTAURANT_LOGOUT})
}

export const restregister = (name, email, password, rlocation, rtype, rdtype, rimage) => async (dispatch) => {
    //console.log(name + ',' + email)
    try {
        dispatch({
            
            type: RESTAURANT_REGISTER_REQUEST
        })

        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }

        const {data} = await axios.post('/api/restaurant/addRestaurant', {name, email, password, rlocation, rtype, rdtype, rimage}, config)
        //console.log(name)
        dispatch ({
            type: RESTAURANT_REGISTER_SUCCESS,
            payload: data
        })

        localStorage.setItem('restaurantInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: RESTAURANT_REGISTER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

