import {
	FETCH_USER,
	FETCH_USER_SUCCESS,
	FETCH_USER_FAILURE,
	REGISTER_USER_FAILURE,
	REGISTER_USER_SUCCESS,
	REGISTER_USER,
	LOGOUT_USER,
} from '../types';
import { url } from '../../api';
import { checkuser, logoutuser, loginFacebook } from '../../api';
import axios from 'axios';

export const fetchUserLoading = () => {
	return { type: FETCH_USER };
};

export const fetchUserSuccess = (data) => {
	return { type: FETCH_USER_SUCCESS, payload: data.userid };
};

export const fetchUserFailure = (data) => {
	return { type: FETCH_USER_FAILURE, payload: data.errors };
};

export const fetchUser = (userdata) => {
	return async function (dispatch) {
		dispatch(fetchUserLoading());

		const res = await fetch(`${url}/login`, {
			method: 'POST',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(userdata),
		});
		const data = await res.json();

		if (data.errors) {
			dispatch(fetchUserFailure(data));
		} else {
			dispatch(fetchUserSuccess(data));
		}
	};
};

export const registeruserloading = () => {
	return {
		type: REGISTER_USER,
	};
};

export const registerusersuccess = (userdata) => {
	return {
		type: REGISTER_USER_SUCCESS,
		payload: userdata,
	};
};

export const registeruserfailure = (emailerror) => {
	return {
		type: REGISTER_USER_FAILURE,
		payload: emailerror,
	};
};

export const registerUser = (userdata) => {
	return async function (dispatch) {
		dispatch(registeruserloading());
		const response = await fetch(`${url}/signup`, {
			method: 'POST',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(userdata),
		});
		const data = await response.json();
		//console.log(data);
		if (data.errors) {
			dispatch(registeruserfailure(data.errors.email));
		} else if (data.userid) {
			dispatch(registerusersuccess(data.userid));
		}
	};
};

export const isUserloggedIn = () => {
	return async function (dispatch) {
		try {
			const res = await axios.get(checkuser, {
				withCredentials: true,
			});

			if (res.data.userid) {
				dispatch(fetchUserSuccess(res.data));
			}
		} catch (err) {
			console.log(err);
		}
	};
};

export const logoutUser = () => {
	return async function (dispatch) {
		try {
			const logoutres = await axios.get(logoutuser, { withCredentials: true });
			const data = logoutres.data;
			localStorage.removeItem('ssauth');
			localStorage.removeItem('ss_cart');
			dispatch({
				type: LOGOUT_USER,
			});
			window.location.reload();
		} catch (err) {
			console.log(err);
		}
	};
};
