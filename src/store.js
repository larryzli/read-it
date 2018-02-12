import { creatStore, applyMiddleware, combineReducers, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'


//Importing Reducers
import userReducer from './ducks/userReducer'
import subredditReducer from './ducks/subredditReducer'
import postRedeucer from './ducks/postReducer'
import commentReducer from './ducks/commentReducer'
import messageReducer from './ducks/messageReducer'

//Combining Reducers
const reducers = combineReducers({
    user: userReducer,
    subreddit: subredditReducer,
    post: postReducer,
    comment: commentReducer,
    message: messageReducer
})
const store = createStore(reducers, applyMiddleware(promiseMiddleware()));

export default store;