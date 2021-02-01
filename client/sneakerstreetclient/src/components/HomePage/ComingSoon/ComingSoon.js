import React from "react";
import Travis_Img from "../../../images/home_travis.jpg";
import Run_Img from "../../../images/home_run.jpg";
import "./comingsoon.scss";

function ComingSoon() {
	return (
		<section className='coming-soon-container'>
			<div className='coming-soon-title'>Products Coming Soon</div>
			<section className='travis-container'>
				<div className='travis-img-wrappper'>
					<div className='travis-box'>
						<div>Air Jordan VI</div>
						<div>Travis Scott</div>
						<button className='pre-book'>PRE-BOOK NOW</button>
					</div>
					<img src={Travis_Img} alt='Travis Coming Soon' />
				</div>
			</section>

			<section className='runimg-container'>
				<div className='runimg-img-wrappper'>
					<div className='run-box'>
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
