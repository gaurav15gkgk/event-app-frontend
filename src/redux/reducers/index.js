//imported combine reducer from redux
import { combineReducers } from 'redux'

//imported all the reducers
import eventReducer from './eventReducer'
import userReducer from './userReducer'
import currentEventReducer from './currentEventReducer'

//combined all the reducers
export default combineReducers({
    Allevents: eventReducer,
    LoggedinUser: userReducer,
    CurrentEvent: currentEventReducer
})