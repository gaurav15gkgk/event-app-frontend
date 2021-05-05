//imported user action types
import { LOGIN_USER , AUTH_USER, CLEAR_USER} from "../actions/types";

//declared the intial state
const initialState = {
    userData : {}
}

//user reducer to set the userdata or remove to the global state
export default function userReducer( state = initialState, action ){
    switch (action.type){
        case AUTH_USER: 
            return {
                ...state,
                userData: action.payload
            }
        case LOGIN_USER :
            return {
                ...state,
                userData: action.payload
            }
        case CLEAR_USER :
            return {
                ...state,
                userData: action.payload
            }
        default : 
            return state
    }
}
