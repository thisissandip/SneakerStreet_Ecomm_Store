import {
	ADD_TO_CART,
	REMOVE_FROM_CART,
	EMPTY_CART,
	FETCH_USER_DETAILS_FAILURE,
	FETCH_USER_DETAILS_SUCCESS,
} from '../types';
import axios from 'axios';
import { fetchuserdata, updatecart, newCartTotal } from '../../api/index';

export const fetchUserDetails = (userid) => {
	return async function (dispatch) {
		try {
			const response = await axios.get(`${fetchuserdata}/${userid}`);
			const userdata = await response.data;

			if (userdata !== 'User Does not Exist') {
				dispatch({
					type: FETCH_USER_DETAILS_SUCCESS,
					payload: userdata,
				});
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
			const response = await axios.post(updatecart, details, headeroptions);
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
			const response = axios.post(newCartTotal, finalamt, headeroptions);
		} catch (err) {
			console.log(err);
		}
	};
};
