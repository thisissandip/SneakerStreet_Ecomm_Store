import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { fetchsingleproduct } from '../../api/index';
import './itempage.scss';

function ItemPage() {
	const { itemid } = useParams();
	console.log(itemid);

	const [productdata, Setproductdata] = useState({});
	const [displayImgs, SetdisplayImgs] = useState();
	const [displaydetails, Setdisplaydetails] = useState();
	let allimagesarr;
	let details;

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

	useEffect(() => {
		console.log(productdata);
		allimagesarr = productdata.Images;
		details = productdata.Details;

		if (allimagesarr) {
			const display = allimagesarr.map((i) => (
				<div key={i} className='product-img-wrapper'>
					<img src={i} alt='hi' />
				</div>
			));
			SetdisplayImgs(display);
		}

		if (details) {
			let detailsarr = Object.entries(details);

			const displayDeets = detailsarr.map((i) => {
				if (i[0] !== 'des' && i[0] !== 'releasedate') {
					return (
						<div key={i[1]} className='single-deets'>
							<span className='single-deets-left'>{i[0]}</span> : {i[1]}
						</div>
					);
				}
			});

			Setdisplaydetails(displayDeets);
		}
	}, [productdata]);

	useEffect(() => {
		console.log(displayImgs);
	}, [displayImgs]);

	return (
		<div className='product-page'>
			<div className='product-container'>
				<div className='product-left'>
					<div className='product-img-container'>{displayImgs}</div>
				</div>
				<div className='product-right'>
					<div className='product-right-cont'>
						<div className='product-main'>
							<div className='product-name'>{productdata.Name}</div>
							<div className='product-price'>Rs. {productdata.BuyNew}</div>
							<button className='add-to-cart'>ADD TO CART</button>
						</div>
						<div className='product-details'>
							<div className='details-title'>Details</div>
							{displaydetails}
						</div>
						<div className='product-des'>
							<div className='des-title'>Product Description</div>
							{displaydetails && productdata.Details.des}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ItemPage;
