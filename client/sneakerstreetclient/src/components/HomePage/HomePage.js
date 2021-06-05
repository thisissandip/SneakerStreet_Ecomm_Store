import React, { useEffect } from 'react';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import Slider from './Slider/Slider';
import './Homepage.scss';
import GenderSection from './GenderSection/GenderSection';
import ComingSoon from './ComingSoon/ComingSoon';
import OurBrands from './Our Brands/OurBrands';
import Footer from '../Footer/Footer';
import { fetchUserDetails, addToCart } from '../../redux/actions/userActions';
import { useSelector, useDispatch } from 'react-redux';
import { fetchall } from '../../redux/actions/productActions';

function HomePage() {
	const user = useSelector((state) => state.authR.user);
	const allproducts = useSelector((state) => state.productR.allproducts);

	const dispatch = useDispatch();

	/* If User is Logged in, fetch User Details */
	/* 	useEffect(() => {
		if (user !== '') {
			dispatch(fetchUserDetails(user));
		}
	}, [user]); */

	// Fetching Products and Displaying Them in Slider - Starts Here

	/* If All products are not already fetched then Fetch all products */
	useEffect(() => {
		if (allproducts.length === 0) {
			dispatch(fetchall());
		}
	}, []);

	return (
		<>
			<div className='homepage'>
				<Header />
				<div className='home-slider-section'>
					<div className='home-slider-title-section'>
						<div className='home-slider-title'>Just Dropped</div>
						<Link to='/shopall'>
							<div className='showall-btn'>SHOW ALL</div>
						</Link>
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
