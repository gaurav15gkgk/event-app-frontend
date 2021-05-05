//imported events action types
import { FETCH_EVENTS, CURRENT_EVENT, CLEAR_EVENT } from "./types";

//fetch Event action
export const fetchEvents = () => dispatch => {
    
     fetch(`${process.env.REACT_APP_API_URL}/events`, {
        method: "GET"
    })
        .then(res => res.json()
        .then(events => 
            dispatch({
                type: FETCH_EVENTS,
                payload: events
            }) )
        )
        .catch(err => console.log(err));
}

//fetch current event action
export const fetchCurrentEvent = (eventId) => dispatch => {
    return fetch(`${process.env.REACT_APP_API_URL}/events/${eventId}`, {
        method: "GET"
    })
        .then(res =>  res.json()
        .then(currentEvent => 
                dispatch({
                    type: CURRENT_EVENT,
                    payload: currentEvent
                })
            )
        )
        .catch(err => console.log(err));
}

//clear current event action
export const clearCurrentEvent = () => dispatch => {
    dispatch({
        type: CLEAR_EVENT,
        payload: {}
    })
}



