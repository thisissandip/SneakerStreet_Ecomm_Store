import {
	ADD_TO_CART,
	REMOVE_FROM_CART,
	EMPTY_CART,
	FETCH_USER_DETAILS_FAILURE,
	FETCH_USER_DETAILS_SUCCESS,
} from '../types';
import axios from 'axios';
import { fetchuserdata } from '../../api/index';

export const fetchUserDetails = (userid) => {
	return async function (dispatch) {
		try {
			const response = await axios(`${fetchuserdata}/${userid}`);
			const userdata = await response.data;

			if (userdata) {
				dispatch({
					type: FETCH_USER_DETAILS_SUCCESS,
					payload: userdata,
				});
			}
		} catch (err) {
			console.log(err);
			dispatch({
				type: FETCH_USER_DETAILS_FAILURE,
			});
		}
	};
};

export const addToCart = (itemid) => {
	return function (dispatch) {
		dispatch({
			type: ADD_TO_CART,
			payload: itemid,
		});
	};
};
