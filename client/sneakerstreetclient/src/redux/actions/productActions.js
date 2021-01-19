import {
	FETCH_ALL_PRODUCTS,
	FETCH_ALL_PRODUCTS_SUCCESS,
	FETCH_ALL_PRODUCTS_FAILURE,
} from "../types";
import { fetchallproducts } from "../.././api/index";
import axios from "axios";

export const fetchall = () => {
	return async function (dispatch) {
		dispatch({
			type: FETCH_ALL_PRODUCTS,
		});
		try {
			const res = await axios.get(fetchallproducts);
			if (res.data !== null) {
				dispatch({
					type: FETCH_ALL_PRODUCTS_SUCCESS,
					payload: res.data,
				});
			}
		} catch (err) {
			dispatch({
				type: FETCH_ALL_PRODUCTS_FAILURE,
			});
			console.log(err);
		}
	};
};
