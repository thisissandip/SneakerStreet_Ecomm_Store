import {
	FETCH_USER,
	FETCH_USER_SUCCESS,
	FETCH_USER_FAILURE,
	REGISTER_USER_FAILURE,
	REGISTER_USER_SUCCESS,
	REGISTER_USER,
} from "../types";
import { url } from "../../api";

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
		console.log("Hi");
		dispatch(fetchUserLoading());

		const res = await fetch(`${url}/login`, {
			method: "POST",
			credentials: "include",
			headers: { "Content-Type": "application/json" },
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
			method: "POST",
			credentials: "include",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(userdata),
		});
		const data = await response.json();
		console.log(data);
		if (data.errors) {
			dispatch(registeruserfailure(data.errors.email));
		} else if (data.userid) {
			dispatch(registerusersuccess(data.userid));
		}
	};
};
