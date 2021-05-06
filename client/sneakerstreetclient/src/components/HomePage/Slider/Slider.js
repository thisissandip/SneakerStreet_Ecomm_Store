import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { HiOutlineChevronLeft, HiChevronRight } from 'react-icons/hi';
import ProductItem from '../../ProductItem/ProductItem';
import useWidth from '../../../Hooks/useWidth';
import './slider.scss';

function Slider() {
	const allproducts = useSelector((state) => state.productR.allproducts);
	const isloading = useSelector((state) => state.productR.isloading);

	const [displayProducts, SetdisplayProducts] = useState([]);
	const [slider, setSlider] = useState();

	const [width] = useWidth();

	const MobileStyles = {
		transform: width < 480 && 'translateX(0px)',
	};

	useEffect(() => {
		if (width < 480) {
			const innerslider = document.querySelector('.slider');
			innerslider.scrollLeft = 0;
			setScrollAmt(0);
		}
	}, [width]);

	useEffect(() => {
		if (isloading) {
		} else {
			let products = [...allproducts];
			SetdisplayProducts([...products]);
			//			console.log('home slider', products);
		}

		return () => {
			setSlider([]);
			SetdisplayProducts([]);
		};
	}, [isloading]);

	const [scrollAmt, setScrollAmt] = useState(0);

	const Slide = (side) => {
		const innerslider = document.querySelector('.slider');
		const productitemWidth = document.querySelector('.product-item')
			.clientWidth;

		switch (side) {
			case 'left':
				if (scrollAmt > 0) {
					setScrollAmt(scrollAmt - productitemWidth * 1.5);
				} else {
					setScrollAmt(0);
				}

				break;
			case 'right':
				if (
					scrollAmt <=
					innerslider.scrollWidth - innerslider.clientWidth + 10
				) {
					setScrollAmt(scrollAmt + productitemWidth * 1.5);
				}
				break;

			default:
				break;
		}
	};

	useEffect(() => {
		const innerslider = document.querySelector('.slider');
		innerslider.style.transform = `translateX(-${scrollAmt}px)`;
		//		console.log(scrollAmt);
	}, [scrollAmt]);

	useEffect(() => {
		DisplayProducts();
	}, [displayProducts]);

	const DisplayProducts = () => {
		const allsliders = [...displayProducts].map((item) => (
			<ProductItem
				key={item._id}
				id={item._id}
				allimages={item.Images}
				Name={item.Name}
				Price={item.BuyNew}
				pagename='homepage'
			/>
		));
		setSlider(allsliders);
	};

	return (
		<div className='slider-wrapper'>
			<div
				className='slide-left-btn'
				onClick={() => {
					Slide('left');
				}}>
				<HiOutlineChevronLeft />{' '}
			</div>
			<div
				className='slide-right-btn'
				onClick={() => {
					Slide('right');
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
					<div className='slider' style={MobileStyles}>
						{slider}
					</div>
				)}
			</div>
		</div>
	);
}

export default Slider;
