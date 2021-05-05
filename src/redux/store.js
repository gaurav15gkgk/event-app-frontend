// import some modules from redux
import { createStore, applyMiddleware, compose } from 'redux'
import thunk  from 'redux-thunk'

//import reducers 
import rootReducer from './reducers'

//declared intiial state
const initialState = {}

const middleware = [thunk]

//store create by the createStore method with the parameters
const store = createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware( ...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)

export default store;