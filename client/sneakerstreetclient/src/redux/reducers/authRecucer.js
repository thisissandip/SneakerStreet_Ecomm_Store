import {
	FETCH_USER,
	FETCH_USER_FAILURE,
	FETCH_USER_SUCCESS,
	REGISTER_USER_FAILURE,
	REGISTER_USER_SUCCESS,
	REGISTER_USER,
} from "../types/authTypes";

const authState = {
	user: "",
	error: "",
	regerror: "",
	isloading: false,
};

export const authReducer = (state = authState, action) => {
	switch (action.type) {
		case FETCH_USER:
			return {
				...state,
				isloading: true,
			};
		case FETCH_USER_SUCCESS:
			return {
				...state,
				user: action.payload,
				error: null,
				isloading: false,
			};
		case FETCH_USER_FAILURE:
			return {
				...state,
				error: action.payload,
				user: null,
				isloading: false,
			};
		case REGISTER_USER:
			return {
				...state,
				isloading: true,
			};
		case REGISTER_USER_FAILURE:
			return {
				...state,
				user: "",
				error: "",
				regerror: action.payload,
				isloading: false,
			};
		case REGISTER_USER_SUCCESS:
			return {
				...state,
				user: action.payload,
				regerror: "",
				isloading: false,
			};
		default:
			return state;
	}
};
