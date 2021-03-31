import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import Slider from './Slider/Slider';
import './Homepage.scss';
import GenderSection from './GenderSection/GenderSection';
import ComingSoon from './ComingSoon/ComingSoon';
import OurBrands from './Our Brands/OurBrands';
import Footer from '../Footer/Footer';
import { fetchUserDetails } from '../../redux/actions/userActions';
import { useSelector, useDispatch } from 'react-redux';

function HomePage() {
	const user = useSelector((state) => state.authR.user);

	const dispatch = useDispatch();

	/* If User is Logged in, fetch User Details */
	useEffect(() => {
		//console.log('user', user);
		if (user !== '') {
			dispatch(fetchUserDetails(user));
		}
	}, [user]);

	return (
		<>
			<div className='homepage'>
				<Header pagename={'homepage'} />
				<div className='home-slider-section'>
					<div className='home-slider-title-section'>
						<div className='home-slider-title'>Just Dropped</div>
						<Link to='/shopall'>
							<div className='showall-btn'>SHOW ALL</div>
						</Link>
					</div>
					{/* <Slider /> */}
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
