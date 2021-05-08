import React, { useEffect, useState } from 'react';
import './shopall.scss';
import { useSelector, useDispatch } from 'react-redux';
import { fetchall } from '../../redux/actions/productActions';
import Header from '../Header/Header';
import Productitem from '../ProductItem/ProductItem';
import Footer from '../Footer/Footer';

function ShopAll() {
	const dispatch = useDispatch();
	const allproducts = useSelector((state) => state.productR.allproducts);
	const isloading = useSelector((state) => state.productR.isloading);

	const [didMount, SetdidMount] = useState(false);
	const [priceOrderopt, SetpriceOrderopt] = useState('');
	const [arrayToMap, SetarrayToMap] = useState([]);
	const [displayProducts, SetdisplayProducts] = useState();

	// When Component Mounts, Move to TOP
	useEffect(() => {
		SetdidMount(true);
		if (didMount) {
			window.scrollTo(0, 0);
		}
		return () => {
			SetdidMount(false);
		};
	}, [didMount]);

	/* 	Fetch all products to Display */
	useEffect(() => {
		if (allproducts.length === 0) {
			dispatch(fetchall());
		}
	}, []);

	// When all products are fetched, Sort them according to their Popularity
	useEffect(() => {
		if (!isloading && allproducts.length > 0) {
			let popularityarray = [...allproducts];
			let popularity = popularityarray.sort(
				(a, b) =>
					parseInt(a.Details.releasedate) - parseInt(b.Details.releasedate)
			);
			SetarrayToMap(popularity);
			SetpriceOrderopt('Popularity');
			console.log('shop all loaded', allproducts);
		}
		return () => {
			SetarrayToMap([]);
		};
	}, [isloading]);

	// Sorting Code Starts Here

	// update the array to map according to selected option
	const OptionChanged = () => {
		if (priceOrderopt === 'LowToHigh') {
			const lowtohigh = [...arrayToMap].sort(
				(a, b) => parseInt(a.BuyNew) - parseInt(b.BuyNew)
			);
			SetarrayToMap(lowtohigh);
		} else if (priceOrderopt === 'HighToLow') {
			const hightolow = [...arrayToMap].sort(
				(a, b) => parseInt(b.BuyNew) - parseInt(a.BuyNew)
			);
			SetarrayToMap(hightolow);
		} else if (priceOrderopt === 'Popularity') {
			let popularity = [...arrayToMap].sort(
				(a, b) =>
					parseInt(a.Details.releasedate) - parseInt(b.Details.releasedate)
			);
			SetarrayToMap(popularity);
		}
	};

	// Whenever Selected Option is Changed Update the Array to map
	useEffect(() => {
		OptionChanged();
	}, [priceOrderopt]);

	// Whenever Array to Map of is Chnaged Update the Display Prodcucts Array
	useEffect(() => {
		ChangeDisplayProducts();
	}, [arrayToMap]);

	const ChangeDisplayProducts = () => {
		let todisplay = [...arrayToMap].map((item) => (
			<div key={item._id} className='single-product-container'>
				<div className='single-product-wrapper'>
					<Productitem
						id={item._id}
						allimages={item.Images}
						Name={item.Name}
						Price={item.BuyNew}
						pagename='shopall'
					/>
				</div>
			</div>
		));
		SetdisplayProducts(todisplay);
	};

	// handle chande of select input
	const handleChange = (e) => {
		SetpriceOrderopt(e.target.value);
	};

	return (
		<div className='shopall'>
			<Header pagename={'shopall'} />

			<div className='shopall-content'>
				<div className='shop-all-top-title'>Shop All</div>
				<div className='row1-filter-cont'>
					{/* 					<div className='filters-title'>Customize Search</div>
					 */}{' '}
					<div className='no-of-results'>
						Showing all {arrayToMap.length} Results
					</div>
					<div className='select'>
						<label htmlFor='#OrderOfPrice'>Sort By</label>
						<select
							onChange={handleChange}
							value={priceOrderopt}
							name='OrderOfPrice'
							id='OrderOfPrice'>
							<option value='Popularity'>Popularity</option>
							<option value='LowToHigh'>Low To High</option>
							<option value='HighToLow'>High To Low</option>
						</select>
					</div>
				</div>
				<div className='row-2-filter-content'>
					<div className='all-products-container'>
						<div className='all-products-wrapper'>
							{isloading ? (
								<svg className='spinner' viewBox='0 0 50 50'>
									<circle
										className='path'
										cx='25'
										cy='25'
										r='20'
										fill='none'
										strokeWidth='5'></circle>
								</svg>
							) : (
								displayProducts
							)}
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default ShopAll;
