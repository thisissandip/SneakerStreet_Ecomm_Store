import {
	ADD_TO_CART,
	REMOVE_FROM_CART,
	EMPTY_CART,
	FETCH_USER_DETAILS_FAILURE,
	FETCH_USER_DETAILS_SUCCESS,
	NEW_CART_TOTAL,
} from '../types';
import axios from 'axios';
import {
	fetchuserdata,
	updatecart,
	newCartTotal,
	updateMyOrders,
	emptycart,
	newsletter,
	updatecartOnLogin,
} from '../../api/index';

export const fetchUserDetails = (userid) => {
	return async function (dispatch) {
		try {
			const response = await axios.get(`${fetchuserdata}/${userid}`);
			const userdata = await response.data;

			let guestcart = localStorage.getItem('ss_cart_guest');

			if (userdata !== 'User Does not Exist') {
				// if guest cart is there then first update the cart of the user then fetch
				if (guestcart) {
					dispatch(updatecartLogin(userid, JSON.parse(guestcart)));
				} else {
					dispatch({
						type: FETCH_USER_DETAILS_SUCCESS,
						payload: userdata,
					});
				}

				console.log(userdata);
			} else {
				console.log('failed to fetch user data');
			}
		} catch (err) {
			console.log(err);
			dispatch({
				type: FETCH_USER_DETAILS_FAILURE,
			});
		}
	};
};

export const addToCart = (details) => {
	return async function (dispatch) {
		try {
			dispatch({
				type: ADD_TO_CART,
				payload: details.productid,
			});
			const headeroptions = {
				'Content-Type': 'application/json',
			};
			if (details.uemail) {
				const response = await axios.post(updatecart, details, headeroptions);
			}
		} catch (err) {
			console.log(err);
		}
	};
};

export const RemovefromCart = (details) => {
	return async function (dispatch) {
		try {
			dispatch({
				type: REMOVE_FROM_CART,
				payload: details.productid,
			});
			const headeroptions = {
				'Content-Type': 'application/json',
			};
			const response = await axios.post(updatecart, details, headeroptions);
		} catch (err) {
			console.log(err);
		}
	};
};

export const NewCartTotal = (finalamt) => {
	return async function (dispatch) {
		try {
			const headeroptions = {
				'Content-Type': 'application/json',
			};
			const response = await axios.post(newCartTotal, finalamt, headeroptions);
			const data = await response.data;
			if (data.carttotal) {
				dispatch({
					type: NEW_CART_TOTAL,
					payload: data.carttotal,
				});
			}
		} catch (err) {
			console.log(err);
		}
	};
};

export const UpdateMyOrders = (uemail, ucart, user) => {
	return async function (dispatch) {
		try {
			const headeroptions = {
				'Content-Type': 'application/json',
			};
			const response = await axios.post(
				updateMyOrders,
				{ uemail, ucart },
				headeroptions
			);
			console.log(response);
			if (response.data.updateorders) {
				dispatch(EmptyMyCart(uemail, user));
			}
		} catch (err) {
			console.log(err);
		}
	};
};

export const EmptyMyCart = (uemail, user) => {
	return async function (dispatch) {
		try {
			const headeroptions = {
				'Content-Type': 'application/json',
			};
			const response = await axios.post(emptycart, { uemail }, headeroptions);
			const data = await response.data;
			if (data.cartzero) {
				dispatch({
					type: EMPTY_CART,
				});
				dispatch(fetchUserDetails(user));
			}
		} catch (err) {
			console.log(err);
		}
	};
};

export const updatecartLogin = (userid, guestcart) => {
	return async function (dispatch) {
		try {
			let data = {
				userid,
				guestcart,
			};
			const headeroptions = {
				'Content-Type': 'application/json',
			};
			const response = await axios.post(updatecartOnLogin, data, headeroptions);
			const result = response.data;
			if (result.updatedcart) {
				localStorage.removeItem('ss_cart_guest');
				dispatch(fetchUserDetails(userid));
			}
		} catch (err) {
			console.log(err);
		}
	};
};
