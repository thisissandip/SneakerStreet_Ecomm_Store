import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootreducer from "./reducers/index";
import { composeWithDevTools } from "redux-devtools-extension";

const middlewares = [thunk];

const store = createStore(
	rootreducer,
	composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
