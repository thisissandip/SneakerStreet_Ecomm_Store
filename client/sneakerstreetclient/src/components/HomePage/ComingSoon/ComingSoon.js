import React, { useEffect, useRef, useState } from 'react';
import Travis_Img from '../../../images/home_travis.jpg';
import Run_Img from '../../../images/home_run.jpg';
import './comingsoon.scss';
import useWidth from '../../../Hooks/useWidth';
import { gsap } from 'gsap';

function ComingSoon() {
	const TravisRef = useRef(null);
	const RunRef = useRef(null);

	const [width] = useWidth();
	const [didMount, SetdidMount] = useState(false);

	useEffect(() => {
		SetdidMount(true);

		if (didMount) {
			if (width > 750) {
				gsap.to(TravisRef.current, {
					css: {
						opacity: 1,
						bottom: '-3rem',
					},
					scrollTrigger: {
						trigger: TravisRef.current,
						start: 'top-=350 center',
					},
				});

				gsap.to(RunRef.current, {
					css: {
						opacity: 1,
						bottom: '-3rem',
					},
					scrollTrigger: {
						trigger: RunRef.current,
						start: 'top-=350 center',
					},
				});
			}
		}

		return () => {
			SetdidMount(false);
		};
	}, [width, didMount]);

	return (
		<section className='coming-soon-container'>
			<div className='coming-soon-title'>Products Coming Soon</div>
			<section className='travis-container'>
				<div className='travis-img-wrappper'>
					<div ref={TravisRef} className='travis-box'>
						<div>Air Jordan VI</div>
						<div>Travis Scott</div>
						<button className='pre-book'>PRE-BOOK NOW</button>
					</div>
					<img src={Travis_Img} alt='Travis Coming Soon' />
				</div>
			</section>

			<section className='runimg-container'>
				<div className='runimg-img-wrappper'>
					<div ref={RunRef} className='run-box'>
						<div>Brooks</div>
						<div>Space Run</div>
						<button className='pre-book'>PRE-BOOK NOW</button>
					</div>
					<img src={Run_Img} alt='Run Like Never Before' />
				</div>
			</section>
		</section>
	);
}

export default ComingSoon;
