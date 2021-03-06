import {
	ADD_TO_CART,
	REMOVE_FROM_CART,
	EMPTY_CART,
	FETCH_USER_DETAILS_FAILURE,
	FETCH_USER_DETAILS_SUCCESS,
	NEW_CART_TOTAL,
} from '../types';

const initialstate = {
	fname: '',
	lname: '',
	cart: localStorage.getItem('ss_cart_guest')
		? JSON.parse(localStorage.getItem('ss_cart_guest'))
		: [],
	email: '',
	orders: [],
	cTotal: null,
};

export const userReducer = (state = initialstate, action) => {
	let localcart = JSON.parse(localStorage.getItem('ss_cart'));

	switch (action.type) {
		case ADD_TO_CART:
			if (!state.email) {
				let lscart = [...state.cart, action.payload];
				localStorage.setItem('ss_cart_guest', JSON.stringify(lscart));
			}

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
		case NEW_CART_TOTAL:
			return {
				...state,
				cTotal: action.payload,
			};
		case FETCH_USER_DETAILS_SUCCESS:
			return {
				...state,
				fname: action.payload.fname,
				lname: action.payload.lname,
				email: action.payload.email,
				cart: [...action.payload.cart],
				orders: action.payload.orders,
				cTotal: action.payload.cTotal,
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
