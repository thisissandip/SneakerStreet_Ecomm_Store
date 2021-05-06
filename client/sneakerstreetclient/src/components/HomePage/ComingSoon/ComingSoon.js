import React, { useEffect, useRef, useState } from 'react';
import Travis_Img from '../../../images/home_travis.jpg';
import Run_Img from '../../../images/home_run.jpg';
import { Link } from 'react-router-dom';
import './comingsoon.scss';
import useWidth from '../../../Hooks/useWidth';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ComingSoon() {
	const TravisRef = useRef(null);
	const RunRef = useRef(null);

	const [width] = useWidth();
	const [didMount, SetdidMount] = useState(false);

	useEffect(() => {
		SetdidMount(true);

		if (didMount) {
			if (width > 800) {
				gsap.to(TravisRef.current, {
					css: {
						opacity: 1,
						bottom: '-3rem',
					},
					scrollTrigger: {
						trigger: TravisRef.current,
						start: 'top-=300 center',
					},
				});

				gsap.to(RunRef.current, {
					css: {
						opacity: 1,
						bottom: '-3rem',
					},
					scrollTrigger: {
						trigger: RunRef.current,
						start: 'top-=300 center',
					},
				});
			} else {
				gsap.killTweensOf(RunRef.current);
				gsap.killTweensOf(TravisRef.current);
			}
		}

		return () => {
			SetdidMount(false);
		};
	}, [width, didMount]);

	const SubNotify = () => {
		toast.info(`Subscribe To Our News Letter! To get Latest Updates!`, {
			position: 'bottom-left',
			autoClose: 6000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
	};

	return (
		<section className='coming-soon-container'>
			<div className='coming-soon-title'>Products Coming Soon</div>
			<section className='travis-container'>
				<div className='travis-img-wrappper'>
					<div ref={TravisRef} className='travis-box'>
						<div>Air Jordan VI</div>
						<div>Travis Scott</div>
						<a href='/#footer'>
							<button
								className='pre-book'
								onClick={() => {
									SubNotify();
								}}>
								NOTIFY ME
							</button>{' '}
						</a>
					</div>
					<img src={Travis_Img} alt='Travis Coming Soon' />
				</div>
			</section>

			<section className='runimg-container'>
				<div className='runimg-img-wrappper'>
					<div ref={RunRef} className='run-box'>
						<div>Brooks</div>
						<div>Space Run</div>
						<a href='/#footer'>
							<button
								className='pre-book'
								onClick={() => {
									SubNotify();
								}}>
								NOTIFY ME
							</button>{' '}
						</a>
					</div>

					<img src={Run_Img} alt='Run Like Never Before' />
				</div>
			</section>
		</section>
	);
}

export default ComingSoon;
