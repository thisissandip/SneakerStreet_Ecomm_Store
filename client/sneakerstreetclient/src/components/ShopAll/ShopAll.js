import React, { useEffect, useState } from 'react';
import './shopall.scss';
import { useSelector, useDispatch } from 'react-redux';
import { fetchall, stopfetch } from '../../redux/actions/productActions';
import Header from '../Header/Header';
import Productitem from '../ProductItem/ProductItem';
import useWidth from '../../Hooks/useWidth';
import Footer from '../Footer/Footer';

function ShopAll() {
	const dispatch = useDispatch();
	const allproducts = useSelector((state) => state.productR.allproducts);
	const isloading = useSelector((state) => state.productR.isloading);

	const [didMount, SetdidMount] = useState(false);
	const [priceOrderopt, SetpriceOrderopt] = useState('');
	const [arrayToMap, SetarrayToMap] = useState([]);
	const [displayProducts, SetdisplayProducts] = useState();
	const [isOpen, SetisOpen] = useState(false);
	const [width] = useWidth();

	useEffect(() => {
		SetdidMount(true);
		if (didMount) {
			window.scrollTo(0, 0);
		}
		return () => {
			SetdidMount(false);
		};
	}, [didMount]);

	useEffect(() => {
		if (isloading) {
			console.log('loading');
		} else {
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

	useEffect(() => {
		OptionChanged();
		ChangeDisplayProducts();
	}, [priceOrderopt]);

	useEffect(() => {
		ChangeDisplayProducts();
	}, [arrayToMap]);

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

	const handleChange = (e) => {
		SetpriceOrderopt(e.target.value);
	};

	return (
		<div className='shopall'>
			<Header pagename={'shopall'} />
			<div className='shopall-content'>
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
