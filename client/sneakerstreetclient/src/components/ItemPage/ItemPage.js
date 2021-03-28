import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { fetchsingleproduct } from '../../api/index';
import './itempage.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/actions/userActions';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ItemPage() {
	const { itemid } = useParams();
	const user = useSelector((state) => state.authR.user);
	const uemail = useSelector((state) => state.userR.email);
	const cart = useSelector((state) => state.userR.cart);

	const dispatch = useDispatch();

	const [didMount, SetdidMount] = useState(false);

	const [productdata, Setproductdata] = useState({});
	const [displayImgs, SetdisplayImgs] = useState();
	const [displaydetails, Setdisplaydetails] = useState();
	let allimagesarr;
	let details;

	useEffect(() => {
		SetdidMount(true);
		if (didMount) {
			window.scrollTo(0, 0);
		}
		return () => {
			SetdidMount(false);
		};
	}, [didMount]);

	useEffect(async () => {
		try {
			/* FETCH PRODUCTS DETAILS FROM SERVER (BENEFICIAL FOR LARGE APPLICTAIONS) */

			const response = await axios.get(`${fetchsingleproduct}/${itemid}`);
			if (response.data !== null) {
				Setproductdata(response.data);
			}
		} catch (err) {
			console.log(err);
		}
	}, []);

	useEffect(() => {
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

	const AddToCart = (itemid, itemname) => {
		if (!cart.includes(itemid)) {
			const requireddetails = {
				uemail,
				productid: itemid,
				type: 'ADD',
			};
			dispatch(addToCart(requireddetails));
			addedNotify(itemname);
		} else {
			alreadyNotify(itemname);
		}
	};

	/* Method for Handling Toasts */
	const addedNotify = (itemname) => {
		toast.success(`${itemname} Added To Cart`, {
			position: 'bottom-left',
			autoClose: 3000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
	};

	const alreadyNotify = (itemname) => {
		toast.warn(`Item is already in Cart`, {
			position: 'bottom-left',
			autoClose: 3000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
	};

	return (
		<>
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
								<button
									className='add-to-cart'
									onClick={(e) => {
										AddToCart(itemid, productdata.Name);
									}}>
									ADD TO CART
								</button>
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
			<ToastContainer />
		</>
	);
}

export default ItemPage;
