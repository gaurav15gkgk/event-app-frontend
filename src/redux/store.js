// import some modules from redux
import { createStore, applyMiddleware, compose } from 'redux'
import thunk  from 'redux-thunk'

//import reducers 
import rootReducer from './reducers'

//declared intiial state
const initialState = {}

const middleware = [thunk]

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(...middleware),
  // other store enhancers if any
);
    


//store create by the createStore method with the parameters
const store = createStore(
    rootReducer,
    initialState,
    enhancer
)

export default store;