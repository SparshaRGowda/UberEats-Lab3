import {  MENU_ADD_REQUEST, MENU_ADD_SUCCESS, MENU_ADD_FAIL } from "../constants/menuConstants"

  const menuAddReducer  = (state = {}, action) => {

    switch (action.type) {
        case MENU_ADD_REQUEST:
            return {loading: true}
        case MENU_ADD_SUCCESS:
            return {loading: false, success: true, menuadditem: action.payload}
        case MENU_ADD_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export { menuAddReducer }