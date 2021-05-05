//imported all events action type
import { FETCH_EVENTS } from "../actions/types";

//declared the intial state
const initialState = {
    events: [],
   
}

// event reducer to set the all events at the global state
export default function eventReducer(state = initialState, action ){
    console.log(action.payload)
    switch (action.type) {
        case FETCH_EVENTS:
            return {
                ...state,
                events: action.payload
            };
        

        default: 
            return state
    }
}