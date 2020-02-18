import {createStore ,combineReducers ,applyMiddleware } from 'redux';
import users from './store/usersReducer';
import blogs from './store/blogsReducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger'


export default createStore(
    combineReducers({users,blogs}),
    applyMiddleware(thunk,logger)
)