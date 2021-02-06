import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { fetchsingleproduct } from '../../api/index';
import './itempage.scss';

function ItemPage() {
	const { itemid } = useParams();
	console.log(itemid);

	const [productdata, Setproductdata] = useState({});

	useEffect(async () => {
		try {
			const response = await axios.get(`${fetchsingleproduct}/${itemid}`);
			if (response.data !== null) {
				Setproductdata(response.data);
			}
		} catch (err) {
			console.log(err);
		}
	}, []);

	return <div>Item Page: {productdata.Name}</div>;
}

export default ItemPage;
