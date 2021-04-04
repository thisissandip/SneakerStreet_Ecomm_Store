import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { HiOutlineChevronLeft, HiChevronRight } from 'react-icons/hi';
import { fetchall, stopfetch } from '../../../redux/actions/productActions';
import ProductItem from '../../ProductItem/ProductItem';
import './slider.scss';
import useWidth from '../../../Hooks/useWidth';

function SliderHome() {
	const allproducts = useSelector((state) => state.productR.allproducts);
	const isloading = useSelector((state) => state.productR.isloading);

	const [width] = useWidth();

	const [count, setCount] = useState(1);
	const [count800, setCount800] = useState(1);

	const [displayProducts, SetdisplayProducts] = useState();

	useEffect(() => {
		if (isloading) {
		} else {
			console.log('home slider', allproducts);
		}
	}, [isloading]);

	useEffect(() => {
		return () => {
			setCount(1);
			setCount800(1);
		};
	}, []);

	const SlideRight = () => {
		const slider = document.querySelector('.slider');
		if (count < 4) {
			setCount(count + 1);
		}
		if (count === 4) {
			slider.style.transform = `translate(-80%)`;
		} else {
			let slideamt = count * 20;
			//	console.log(slideamt);
			slider.style.transform = `translate(-${slideamt}%)`;
		}
	};

	const SlideRightOne = () => {
		const slider = document.querySelector('.slider');
		let slideamt;
		if (width < 600) {
			slideamt = count800 * 8;
		} else {
			slideamt = count800 * 7;
		}
		if (slideamt < 95) {
			console.log(count800);
			slider.style.transform = `translate(-${slideamt}%)`;
			setCount800(count800 + 1);
		}
	};

	const SlideLeft = () => {
		const slider = document.querySelector('.slider');
		let slideamt = (count - 2) * 20;
		if (count === 2) {
			slider.style.transform = `translate(1%)`;
		} else {
			slider.style.transform = `translate(-${slideamt}%)`;
		}
		if (count !== 2) {
			setCount(count - 1);
		}
	};

	const SlideLeftOne = () => {
		const slider = document.querySelector('.slider');
		let slideamt = (count800 - 2) * 7;
		console.log(count800);
		if (slideamt > 0) {
			slider.style.transform = `translate(-${slideamt}%)`;
			setCount800(count800 - 1);
		} else if (slideamt == 0) {
			slider.style.transform = `translate(0%)`;
			setCount800(count800 - 1);
		}
	};

	const allsliders = allproducts.map((item) => (
		<ProductItem
			key={item._id}
			id={item._id}
			allimages={item.Images}
			Name={item.Name}
			Price={item.BuyNew}
			pagename='homepage'
		/>
	));

	return (
		<div className='slider-wrapper'>
			<div
				className='slide-left-btn'
				onClick={() => {
					if (width > 800) {
						SlideLeft();
					} else {
						SlideLeftOne();
					}
				}}>
				<HiOutlineChevronLeft />{' '}
			</div>
			<div
				className='slide-right-btn'
				onClick={() => {
					if (width > 800) {
						SlideRight();
					} else {
						SlideRightOne();
					}
				}}>
				<HiChevronRight />
			</div>
			<div className='slider-container'>
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
					<div className='slider'>{allsliders}</div>
				)}
			</div>
		</div>
	);
}

export default SliderHome;
