import { createStore, combineReducers, applyMiddleware } from 'redux'
import postReducer from '../redux/reducers/postsReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
const rootReducer = combineReducers({
    posts: postReducer
})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store