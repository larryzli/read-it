import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";

//Importing Reducers
<<<<<<< HEAD
import userReducer from './ducks/userReducer'
import subredditReducer from './ducks/subredditReducer'
import postRedeucer from './ducks/postReducer'
import commentReducer from './ducks/commentReducer'
import messageReducer from './ducks/messageReducer'
=======
import userReducer from "./ducks/userReducer";
import subredditReducer from "./ducks/subredditReducer";
import postReducer from "./ducks/postReducer";
import commentReducer from "./ducks/commentReducer";
import messageReducer from "./ducks/messageReducer";
>>>>>>> c02c7a24120b3661315b7d713f11634134faa986

//Combining Reducers
const reducers = combineReducers({
    user: userReducer,
    subreddit: subredditReducer,
    post: postReducer,
    comment: commentReducer,
    message: messageReducer
});
const store = createStore(reducers, applyMiddleware(promiseMiddleware()));

export default store;
