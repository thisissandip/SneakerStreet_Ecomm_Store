import { authReducer } from "./authRecucer";
import { productReducer } from "./productReducer";
import { combineReducers } from "redux";

const rootreducer = combineReducers({
	authR: authReducer,
	productR: productReducer,
});

export default rootreducer;
