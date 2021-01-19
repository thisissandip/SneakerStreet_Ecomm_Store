import {
	FETCH_ALL_PRODUCTS,
	FETCH_ALL_PRODUCTS_SUCCESS,
	FETCH_ALL_PRODUCTS_FAILURE,
} from "../types";

const productstates = {
	allproducts: [],
	isloading: false,
};

export const productReducer = (state = productstates, action) => {
	switch (action.type) {
		case FETCH_ALL_PRODUCTS:
			return {
				...state,
				allproducts: [],
				isloading: true,
			};
		case FETCH_ALL_PRODUCTS_SUCCESS:
			return {
				...state,
				allproducts: action.payload,
				isloading: false,
			};
		case FETCH_ALL_PRODUCTS_FAILURE:
			return {
				...state,
				isloading: false,
				allproducts: [],
			};
		default:
			return {
				...state,
			};
	}
};
