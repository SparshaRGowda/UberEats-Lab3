import axios from 'axios'
import { MENU_ADD_REQUEST, MENU_ADD_SUCCESS, MENU_ADD_FAIL } from "../constants/menuConstants"

export const menuaction = (dishname, dishtype, dishprice, dishimage) => async (dispatch, getState) => {

    //console.log('HI')
    
    try {
        dispatch({
            type: MENU_ADD_REQUEST
        })

        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }

        const {restaurantLogin} = getState()
        const {restaurantInfo} = restaurantLogin
        const {restid} = restaurantInfo

        const {data} = await axios.post('/api/restaurant/addItem', {restid, dishname, dishtype, dishprice, dishimage})
        //.log(data)
        dispatch ({
            type: MENU_ADD_SUCCESS,
            payload: data
        })

        //localStorage.setItem('menuinfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: MENU_ADD_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}
