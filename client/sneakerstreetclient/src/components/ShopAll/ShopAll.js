import React, { useEffect } from "react";
import "./shopall.scss";
import { useSelector, useDispatch } from "react-redux";
import { fetchall } from "../../redux/actions/productActions";

function ShopAll() {
	const dipatch = useDispatch();
	const allproducts = useSelector((state) => state.productR.allproducts);
	const isloading = useSelector((state) => state.productR.isloading);

	let allbrands = [];
	let allcategories = [];
	let allgenders = [];

	useEffect(() => {
		dipatch(fetchall());
	}, []);

	useEffect(() => {
		if (isloading) {
			console.log("loading");
		} else {
			allproducts.forEach((item) => {
				if (allcategories.includes(item.Details.Category) == false) {
					// this means does not include
					allcategories.push(item.Details.Category);
				}
				if (allbrands.includes(item.Details.Brand) == false) {
					allbrands.push(item.Details.Brand);
				}
				if (allgenders.includes(item.Details.Gender[0]) == false) {
					allgenders.push(item.Details.Gender[0]);
				}
			});
			console.log(allbrands);
			console.log(allcategories);
			console.log(allgenders);
		}
	}, [isloading]);

	return <div className='shopall'></div>;
}

export default ShopAll;
