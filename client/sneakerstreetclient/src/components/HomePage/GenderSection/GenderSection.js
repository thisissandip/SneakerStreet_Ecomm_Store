import React, { useEffect, useRef, useState } from 'react';
import Gender_Men from '../../../images/tinified/nike.jpg';
import Gender_Women from '../../../images/tinified/adidas.jpg';
import Gender_Uni from '../../../images/tinified/jordan.jpg';
import './gendersection.scss';
import { gsap } from 'gsap';
import useWidth from '../../../Hooks/useWidth';
import { Link } from 'react-router-dom';

function GenderSection() {
	const genderSectionRef = useRef(null);
	const TitleRef = useRef(null);

	const allcolwrappersRef = useRef([]);
	allcolwrappersRef.current = [];

	const [width] = useWidth();

	const [didMount, SetdidMount] = useState(false);

	useEffect(() => {
		SetdidMount(true);

		if (didMount) {
			if (width > 800) {
				allcolwrappersRef.current.forEach((el) => {
					gsap.fromTo(
						el,
						{
							css: {
								opacity: 0,
								marginTop: 120,
							},
						},
						{
							css: {
								opacity: 1,
								marginTop: 0,
							},
							scrollTrigger: {
								trigger: genderSectionRef.current,
								start: 'top top+=450',
							},
						}
					);

					gsap.to(TitleRef.current, {
						css: {
							opacity: 1,
						},
						scrollTrigger: {
							trigger: TitleRef.current,
							start: 'top-=300 center',
						},
					});
				});
			} else {
				allcolwrappersRef.current.forEach((el) => {
					gsap.killTweensOf(el.current);
				});

				gsap.killTweensOf(TitleRef.current);
			}
		}
		return () => {
			SetdidMount(false);
		};
	}, [width, didMount]);

	useEffect(() => {
		let gendersection = document.querySelector('.gender-section');
	}, []);

	const addToRefs = (el) => {
		if (el && !allcolwrappersRef.current.includes(el)) {
			allcolwrappersRef.current.push(el);
		}
	};

	return (
		<section ref={genderSectionRef} className='gender-section'>
			<div ref={TitleRef} className='gender-section-title-wrapper'>
				<div className='gender-section-title'>Brands that Stand Out</div>
			</div>

			<div className='all-genders'>
				<div ref={addToRefs} className='gender-col-wrapper'>
					<Link to='/shopall'>
						<div className='gender-col gender-men'>
							<h3>NIKE</h3>
							<img src={Gender_Men} alt='Men' />
						</div>
					</Link>
				</div>

				<div ref={addToRefs} className='gender-col-wrapper'>
					<Link to='/shopall'>
						<div
							className='gender-col gender-women'
							style={{ textAlign: 'center' }}>
							<h3>AIR JORDAN</h3>
							<img src={Gender_Uni} alt='Unisex' />
						</div>
					</Link>
				</div>

				<div ref={addToRefs} className='gender-col-wrapper'>
					<Link to='/shopall'>
						<div className='gender-col gender-unisex'>
							<h3>ADIDAS</h3>
							<img src={Gender_Women} alt='Women' />
						</div>
					</Link>
				</div>
			</div>
		</section>
	);
}

export default GenderSection;
