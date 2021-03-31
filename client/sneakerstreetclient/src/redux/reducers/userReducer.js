import {
	ADD_TO_CART,
	REMOVE_FROM_CART,
	EMPTY_CART,
	FETCH_USER_DETAILS_FAILURE,
	FETCH_USER_DETAILS_SUCCESS,
} from '../types';

const initialstate = {
	fname: '',
	lname: '',
	cart: [],
	email: '',
	orders: [],
};

export const userReducer = (state = initialstate, action) => {
	switch (action.type) {
		case ADD_TO_CART:
			let lscart = [...state.cart, action.payload];
			localStorage.setItem('ss_cart', JSON.stringify(lscart));
			return {
				...state,
				cart: [...state.cart, action.payload],
			};
		case REMOVE_FROM_CART:
			let thecart = state.cart;
			let newcart = thecart.filter((item) => item !== action.payload);

			return {
				...state,
				cart: [...newcart],
			};
		case EMPTY_CART:
			return {
				...state,
				cart: [],
			};
		case FETCH_USER_DETAILS_SUCCESS:
			return {
				...state,
				fname: action.payload.fname,
				lname: action.payload.lname,
				email: action.payload.email,
				cart: action.payload.cart,
				orders: action.payload.orders,
			};
		case FETCH_USER_DETAILS_FAILURE:
			return {
				fname: '',
				lname: '',
				cart: [],
				email: '',
			};
		default:
			return state;
	}
};
