import React, { useEffect, useRef } from 'react';
import Gender_Men from '../../../images/gender_men.jpg';
import Gender_Women from '../../../images/gender_women.jpg';
import Gender_Uni from '../../../images/gender_unisex.jpg';
import './gendersection.scss';
import { gsap } from 'gsap';
import useWidth from '../../../Hooks/useWidth';

function GenderSection() {
	const genderSectionRef = useRef(null);
	const TitleRef = useRef(null);

	const allcolwrappersRef = useRef([]);
	allcolwrappersRef.current = [];

	const [width] = useWidth();

	useEffect(() => {
		if (width > 750) {
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
							start: 'top-=340 top+=100',
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
		}
	}, [width]);

	const addToRefs = (el) => {
		if (el && !allcolwrappersRef.current.includes(el)) {
			allcolwrappersRef.current.push(el);
		}
	};

	return (
		<section ref={genderSectionRef} className='gender-section'>
			<div ref={TitleRef} className='gender-section-title-wrapper'>
				<div className='gender-section-title'>Sneakers that Stand Out</div>
			</div>

			<div className='all-genders'>
				<div ref={addToRefs} className='gender-col-wrapper'>
					<div className='gender-col gender-men'>
						<h3>MEN</h3>
						<img src={Gender_Men} alt='Men' />
					</div>
				</div>

				<div ref={addToRefs} className='gender-col-wrapper'>
					<div className='gender-col gender-unisex'>
						<h3>WOMEN</h3>
						<img src={Gender_Women} alt='Women' />
					</div>
				</div>

				<div ref={addToRefs} className='gender-col-wrapper'>
					<div className='gender-col gender-women'>
						<h3>UNISEX</h3>
						<img src={Gender_Uni} alt='Unisex' />
					</div>
				</div>
			</div>
		</section>
	);
}

export default GenderSection;
