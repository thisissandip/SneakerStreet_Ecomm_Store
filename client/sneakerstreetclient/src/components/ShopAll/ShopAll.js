import React, { useEffect } from 'react';
import './shopall.scss';
import { useSelector, useDispatch } from 'react-redux';
import { fetchall } from '../../redux/actions/productActions';
import Header from '../Header/Header';
import Productitem from '../ProductItem/ProductItem';

function ShopAll() {
	const dipatch = useDispatch();
	const allproducts = useSelector((state) => state.productR.allproducts);
	const isloading = useSelector((state) => state.productR.isloading);

	let allbrands = [];
	let allcategories = [];
	let allgenders = [];

	useEffect(() => {
		let Mounted = true;
		if (Mounted) {
			dipatch(fetchall());
			window.scrollTo(0, 0);
		}

		return () => {
			Mounted = false;
		};
	}, []);

	useEffect(() => {
		if (isloading) {
			console.log('loading');
		} else {
			allproducts.forEach((item) => {
				if (!allcategories.includes(item.Details.Category)) {
					// this means does not include
					allcategories.push(item.Details.Category);
				}
				if (!allbrands.includes(item.Details.Brand)) {
					allbrands.push(item.Details.Brand);
				}
				if (!allgenders.includes(item.Details.Gender[0])) {
					allgenders.push(item.Details.Gender[0]);
				}
			});
			//console.log(allproducts);
			/*console.log(allcategories);
			console.log(allgenders); */
		}
	}, [isloading]);

	const allproductsbox = allproducts.map((item) => (
		<div key={item._id} className='single-product-container'>
			<div className='single-product-wrapper'>
				<Productitem
					allimages={item.Images}
					Name={item.Name}
					Price={item.BuyNew}
					pagename='shopall'
				/>
			</div>
		</div>
	));

	return (
		<div className='shopall'>
			<Header pagename={'shopall'} />
			<div className='all-products-container'>
				<div className='filters-container'></div>
				<div className='all-products-wrapper'>{allproductsbox}</div>
			</div>
		</div>
	);
}

export default ShopAll;
