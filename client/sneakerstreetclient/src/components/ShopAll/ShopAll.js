import React, { useEffect, useState } from 'react';
import './shopall.scss';
import { useSelector, useDispatch } from 'react-redux';
import { fetchall, stopfetch } from '../../redux/actions/productActions';
import Header from '../Header/Header';
import Productitem from '../ProductItem/ProductItem';

function ShopAll() {
	const dispatch = useDispatch();
	const allproducts = useSelector((state) => state.productR.allproducts);
	const isloading = useSelector((state) => state.productR.isloading);

	const [didMount, SetdidMount] = useState(false);
	const [priceOrderopt, SetpriceOrderopt] = useState('');
	const [arrayToMap, SetarrayToMap] = useState([]);
	const [displayProducts, SetdisplayProducts] = useState();

	/* Array for Filters */
	const [categoryCheckboxes, SetcategoryCheckboxes] = useState([]);
	const [brandCheckboxes, SetbrandCheckboxes] = useState([]);
	const [genderCheckboxes, SetgenderCheckboxes] = useState([]);

	useEffect(() => {
		SetdidMount(true);
		if (didMount) {
			dispatch(fetchall());
			window.scrollTo(0, 0);
		}
		return () => {
			dispatch(stopfetch());
			SetdidMount(false);
		};
	}, [didMount]);

	useEffect(() => {
		if (isloading) {
			console.log('loading');
		} else {
			let popularity = allproducts.sort(
				(a, b) =>
					parseInt(a.Details.releasedate) - parseInt(b.Details.releasedate)
			);
			SetarrayToMap(popularity);
			SetpriceOrderopt('Popularity');
			console.log('shop all loaded', allproducts);
			FillFiltersArray();
		}
	}, [isloading]);

	useEffect(() => {
		OptionChanged();
		ChangeDisplayProducts();
	}, [priceOrderopt]);

	useEffect(() => {
		ChangeDisplayProducts();
	}, [arrayToMap]);

	/* 	Manipulate Allproducts */
	useEffect(() => {
		let checkedGender = genderCheckboxes
			.filter((item) => {
				if (item.isChecked) {
					return item;
				}
			})
			.map((item) => item.name);

		let newArraytoMap = arrayToMap.filter((product) => {
			if (checkedGender.includes(product.Details.Gender[0])) {
				return product;
			}
		});
		console.log(newArraytoMap);
	}, [genderCheckboxes, brandCheckboxes, categoryCheckboxes]);

	const OptionChanged = () => {
		if (priceOrderopt === 'LowToHigh') {
			const lowtohigh = allproducts.sort(
				(a, b) => parseInt(a.BuyNew) - parseInt(b.BuyNew)
			);
			SetarrayToMap(lowtohigh);
		} else if (priceOrderopt === 'HighToLow') {
			const hightolow = allproducts.sort(
				(a, b) => parseInt(b.BuyNew) - parseInt(a.BuyNew)
			);
			SetarrayToMap(hightolow);
		} else if (priceOrderopt === 'Popularity') {
			let popularity = allproducts.sort(
				(a, b) =>
					parseInt(a.Details.releasedate) - parseInt(b.Details.releasedate)
			);
			SetarrayToMap(popularity);
		}
	};

	const ChangeDisplayProducts = () => {
		let todisplay = arrayToMap.map((item) => (
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
		SetdisplayProducts(todisplay);
	};

	const FillFiltersArray = () => {
		let allcat = allproducts.map((item) => item.Details.Category);
		let uniquecat = allcat.reduce(
			(accumulator, currentValue) =>
				accumulator.includes(currentValue)
					? accumulator
					: [...accumulator, currentValue],
			[]
		);
		let checkcat = uniquecat.map((item) => {
			return {
				name: item,
				isChecked: false,
			};
		});
		SetcategoryCheckboxes(checkcat);

		let allbrands = allproducts.map((item) => item.Details.Brand);
		let uniquebrand = allbrands.reduce(
			(accumulator, currentValue) =>
				accumulator.includes(currentValue)
					? accumulator
					: [...accumulator, currentValue],
			[]
		);
		let checkbrand = uniquebrand.map((item) => {
			return {
				name: item,
				isChecked: false,
			};
		});
		SetbrandCheckboxes(checkbrand);

		let allgenders = allproducts.map((item) => item.Details.Gender[0]);
		let uniquegender = allgenders.reduce(
			(accumulator, currentValue) =>
				accumulator.includes(currentValue)
					? accumulator
					: [...accumulator, currentValue],
			[]
		);
		let checkgender = uniquegender.map((item) => {
			return {
				name: item,
				isChecked: false,
			};
		});
		SetgenderCheckboxes(checkgender);

		//console.log('unique', uniquecat, uniquebrand, uniquegender);
	};

	const handleChange = (e) => {
		SetpriceOrderopt(e.target.value);
	};

	const handleCheckbox = (e) => {
		if (e.target.className === 'brand') {
			let newbrandCheckboxes = brandCheckboxes.filter((item) => {
				if (item.name === e.target.id) {
					item.isChecked = !item.isChecked;
				}
				return item;
			});
			SetbrandCheckboxes(newbrandCheckboxes);
		} else if (e.target.className === 'gender') {
			let newgenderCheckboxes = genderCheckboxes.filter((item) => {
				if (item.name === e.target.id) {
					item.isChecked = !item.isChecked;
				}
				return item;
			});
			SetgenderCheckboxes(newgenderCheckboxes);
		} else if (e.target.className === 'category') {
			let newcatCheckboxes = categoryCheckboxes.filter((item) => {
				if (item.name === e.target.id) {
					item.isChecked = !item.isChecked;
				}
				return item;
			});
			SetcategoryCheckboxes(newcatCheckboxes);
		}
	};

	const allbrandsDIV = brandCheckboxes.map((item, i) => (
		<div key={i} className='input-div'>
			<input
				className='brand'
				id={item.name}
				checked={item.isChecked}
				type='checkbox'
				onChange={handleCheckbox}
			/>
			<label htmlFor={`#${item.name}`}>{item.name}</label>
		</div>
	));

	const allgendersDIV = genderCheckboxes.map((item, i) => (
		<div key={i} className='input-div'>
			<input
				className='gender'
				id={item.name}
				checked={item.isChecked}
				type='checkbox'
				onChange={handleCheckbox}
			/>
			<label htmlFor={`#${item.name}`}>{item.name}</label>
		</div>
	));

	const allcatDIV = categoryCheckboxes.map((item, i) => (
		<div key={i} className='input-div'>
			<input
				className='category'
				id={item.name}
				checked={item.isChecked}
				type='checkbox'
				onChange={handleCheckbox}
			/>
			<label htmlFor={`#${item.name}`}>{item.name}</label>
		</div>
	));

	return (
		<div className='shopall'>
			<Header pagename={'shopall'} />
			<div className='shopall-content'>
				<div className='row1-filter-cont'>
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
				<div className='row-2-filter-content'>
					<div className='all-products-container'>
						<div className='filters-container'>
							<div className='filter-cont-title'>Filters </div>
							<div className='single-filter-container'>
								<div className='filter-title'>Brands</div>
								{allbrandsDIV}
							</div>
							<div className='single-filter-container'>
								<div className='filter-title'>Gender</div>
								{allgendersDIV}
							</div>
							<div className='single-filter-container'>
								<div className='filter-title'>Categories</div>
								{allcatDIV}
							</div>
						</div>
						<div className='all-products-wrapper'>{displayProducts}</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ShopAll;
