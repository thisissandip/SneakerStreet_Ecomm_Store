import { authReducer } from "./authRecucer";
import { combineReducers } from "redux";

const rootreducer = combineReducers({
	authR: authReducer,
});

export default rootreducer;
