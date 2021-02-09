import React, { useEffect, useState } from 'react';
import '../shopall.scss';
import { useSelector } from 'react-redux';
import { MdClose } from 'react-icons/md';
import useWidth from '../../../Hooks/useWidth';

function Filter({ arrayToMap, SetarrayToMap, OptionChanged }) {
	const allproducts = useSelector((state) => state.productR.allproducts);
	const isloading = useSelector((state) => state.productR.isloading);

	const [width] = useWidth();
	/* Array for Filters */
	const [categoryCheckboxes, SetcategoryCheckboxes] = useState([]);
	const [brandCheckboxes, SetbrandCheckboxes] = useState([]);
	const [genderCheckboxes, SetgenderCheckboxes] = useState([]);
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

	useEffect(() => {
		FillFiltersArray();
	}, [isloading]);

	useEffect(() => {
		let checkedGender = genderCheckboxes
			.filter((item) => {
				if (item.isChecked) {
					return item;
				}
			})
			.map((item) => item.name);

		let checkedBrands = brandCheckboxes
			.filter((item) => {
				if (item.isChecked) {
					return item;
				}
			})
			.map((item) => item.name);

		let checkedCategories = categoryCheckboxes
			.filter((item) => {
				if (item.isChecked) {
					return item;
				}
			})
			.map((item) => item.name);

		let newArraytoMap = allproducts.filter((product) => {
			if (
				checkedGender.includes(product.Details.Gender[0]) ||
				checkedBrands.includes(product.Details.Brand) ||
				checkedCategories.includes(product.Details.Category)
			) {
				return product;
			}
		});

		if (newArraytoMap.length > 0) {
			SetarrayToMap(newArraytoMap);
		} /*  else if (newArraytoMap.length == 0) {
			SetarrayToMap([]);
		} */ else {
			SetarrayToMap(allproducts);
		}
	}, [genderCheckboxes, brandCheckboxes, categoryCheckboxes]);

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

	const CloseFilters = () => {
		const filterCont = document.querySelector('.filters-container');
		filterCont.style.display = 'none';
	};

	const [didMount, SetdidMount] = useState(false);

	useEffect(() => {
		SetdidMount(true);

		if (didMount) {
			if (width < 1000) {
				const filterCont = document.querySelector('.filters-container');
				filterCont.style.display = 'none';
			}
		}
		return () => {
			SetdidMount(false);
		};
	}, [width]);

	return (
		<div className='filters-container'>
			<div className='filter-cont-title'>
				<div className='left'>Filters</div>
				{width < 1000 ? (
					<div className='right'>
						<MdClose
							onClick={() => {
								CloseFilters();
							}}
						/>
					</div>
				) : null}
			</div>

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
	);
}

export default Filter;
