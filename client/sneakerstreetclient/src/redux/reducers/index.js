import { authReducer } from './authRecucer';
import { productReducer } from './productReducer';
import { userReducer } from './userReducer';
import { combineReducers } from 'redux';

const rootreducer = combineReducers({
	authR: authReducer,
	productR: productReducer,
	userR: userReducer,
});

export default rootreducer;
