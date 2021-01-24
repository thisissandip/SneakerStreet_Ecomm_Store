import React from "react";
import Gender_Men from "../../../images/gender_men.jpg";
import Gender_Women from "../../../images/gender_women.jpg";
import Gender_Uni from "../../../images/gender_unisex.jpg";
import "./gendersection.scss";

function GenderSection() {
	return (
		<section className='gender-section'>
			<div className='gender-section-title-wrapper'>
				<div className='gender-section-title'>Sneakers that Stand Out</div>
			</div>

			<div className='all-genders'>
				<div className='gender-col-wrapper'>
					<div className='gender-col gender-men'>
						<h3>MEN</h3>
						<img src={Gender_Men} alt='Men' />
					</div>
				</div>

				<div className='gender-col-wrapper'>
					<div className='gender-col gender-unisex'>
						<h3>WOMEN</h3>
						<img src={Gender_Women} alt='Women' />
					</div>
				</div>

				<div className='gender-col-wrapper'>
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
