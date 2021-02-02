import React, { useEffect, useState, useCallback } from 'react';
import Header from '../Header/Header';
import Slider from './Slider/Slider';
import './Homepage.scss';
import GenderSection from './GenderSection/GenderSection';
import ComingSoon from './ComingSoon/ComingSoon';
import OurBrands from './Our Brands/OurBrands';
import Footer from '../Footer/Footer';

function HomePage() {
	return (
		<>
			<div className='homepage'>
				<Header pagename={'homepage'} />
				<div className='home-slider-section'>
					<div className='home-slider-title-section'>
						<div className='home-slider-title'>Just Dropped</div>
						<div className='showall-btn'>SHOW ALL</div>
					</div>
					<Slider />
				</div>
				<GenderSection />
				<ComingSoon />
				<OurBrands />
				<Footer />
			</div>
		</>
	);
}

export default HomePage;
