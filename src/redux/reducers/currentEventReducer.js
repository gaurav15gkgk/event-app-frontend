//imported single action types
import { CURRENT_EVENT , CLEAR_EVENT } from "../actions/types"

//declare the initial state
const initialState = {
    currentEvent: {}
}

//event Reducer to set the userdata and remove the userdate from the global state
export default function eventReducer(state = initialState, action ){
    console.log(action.payload)
    switch (action.type) {
        case CURRENT_EVENT:
            return {
                ...state,
                currentEvent: action.payload
            }
        
        case CLEAR_EVENT: 
            return {
                ...state,
                currentEvent: action.payload
            }
        default: 
            return state
    }
}