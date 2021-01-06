import axios from "axios";

export const url = "http://localhost:5000";

export const fetchallproducts = () => axios.get(`${url}/allproducts`);
