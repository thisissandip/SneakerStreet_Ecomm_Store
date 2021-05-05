import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { HiOutlineChevronLeft, HiChevronRight } from 'react-icons/hi';
import { fetchall, stopfetch } from '../../../redux/actions/productActions';
import ProductItem from '../../ProductItem/ProductItem';
import './slider.scss';
import useWidth from '../../../Hooks/useWidth';

function Slider() {
	const allproducts = useSelector((state) => state.productR.allproducts);
	const isloading = useSelector((state) => state.productR.isloading);

	const [width] = useWidth();

	const [displayProducts, SetdisplayProducts] = useState([]);
	const [slider, setSlider] = useState();

	useEffect(() => {
		if (isloading) {
		} else {
			let products = [...allproducts];
			SetdisplayProducts([...products]);
			console.log('home slider', products);
			// Add the Touch Slider Feature after products are loaded
			/* 	TouchSlider(); */
		}

		return () => {
			setSlider([]);
			SetdisplayProducts([]);
		};
	}, [isloading]);

	let currentSlideNum = 1;

	const SlideRight = () => {
		const innerslider = document.querySelector('.slider');
		const sliderWidth = innerslider.getBoundingClientRect().width;
		let TotalsliderParts = Math.ceil(sliderWidth / width);
		let eachPartWidth = sliderWidth / TotalsliderParts;

		const rightbtn = document.querySelector('.slide-right-btn');
		const leftbtn = document.querySelector('.slide-left-btn');
		if (currentSlideNum < TotalsliderParts) {
			let slideamt = (eachPartWidth + 30) * currentSlideNum;
			console.log(slideamt);
			innerslider.style.transform = `translateX(-${slideamt}px)`;
			currentSlideNum++;
		}

		leftbtn.style.display = 'flex';

		if (currentSlideNum === TotalsliderParts) {
			rightbtn.style.display = 'none';
		} else {
			rightbtn.style.display = 'flex';
		}
	};

	const SlideLeft = () => {
		const innerslider = document.querySelector('.slider');
		const sliderWidth = innerslider.getBoundingClientRect().width;
		let TotalsliderParts = Math.ceil(sliderWidth / width);
		let eachPartWidth = sliderWidth / TotalsliderParts;

		const rightbtn = document.querySelector('.slide-right-btn');
		const leftbtn = document.querySelector('.slide-left-btn');
		if (currentSlideNum > 1) {
			let slideamt = (eachPartWidth + 30) * (currentSlideNum - 2);
			console.log(slideamt);
			innerslider.style.transform = `translateX(-${slideamt}px)`;
			currentSlideNum--;
		}

		rightbtn.style.display = 'flex';

		if (currentSlideNum === 1) {
			leftbtn.style.display = 'none';
		} else {
			leftbtn.style.display = 'flex';
		}
		//	console.log(currentSlideNum);
	};

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

	const TouchSlider = () => {
		const sliderwrapper = document.querySelector('.slider-wrapper');
		const slider = document.querySelector('.slider');
		let pressed = false;
		let startX;
		let dragAmt;
		let alreadyscrolled = 0;
		console.log(slider.getBoundingClientRect().width);

		slider.addEventListener('mousedown', (e) => {
			pressed = true;
			startX = e.pageX - slider.offsetLeft;
		});

		slider.addEventListener('mouseup', () => {
			pressed = false;
			alreadyscrolled = dragAmt + alreadyscrolled;
		});

		slider.addEventListener('mouseleave', () => {
			pressed = false;
		});

		slider.addEventListener('mousemove', (e) => {
			if (!pressed) return;
			e.preventDefault();

			let sliderActualoffsetRight =
				slider.getBoundingClientRect().width + slider.offsetLeft;

			let currentX = e.pageX - slider.offsetLeft;
			dragAmt = currentX - startX;
			let finalScrollAmt = alreadyscrolled + dragAmt;

			slider.style.transform = `translateX(${finalScrollAmt}px)`;

			console.log(
				finalScrollAmt,
				slider.getBoundingClientRect().width,
				slider.getBoundingClientRect().right - window.innerWidth
			);
		});
	};

	return (
		<div className='slider-wrapper'>
			<div
				className='slide-left-btn'
				onClick={() => {
					SlideLeft();
				}}>
				<HiOutlineChevronLeft />{' '}
			</div>
			<div
				className='slide-right-btn'
				onClick={() => {
					SlideRight();
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
					<div className='slider'>{slider}</div>
				)}
			</div>
		</div>
	);
}

export default Slider;
