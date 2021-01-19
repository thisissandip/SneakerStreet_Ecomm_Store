import React from "react";
import Header from "./Header/Header";
import Slider from "./Slider/Slider";
import "./Homepage.scss";

function HomePage() {
	return (
		<>
			<div className='homepage'>
				<Header />
				<div className='home-slider-section'>
					<div className='home-slider-title-section'>
						<div className='home-slider-title'>Just Dropped</div>
						<div className='showall-btn'>Show All &gt;</div>
					</div>
					<Slider />
				</div>
			</div>
		</>
	);
}

export default HomePage;
