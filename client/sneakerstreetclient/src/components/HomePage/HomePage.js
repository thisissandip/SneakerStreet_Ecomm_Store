import React, { useEffect } from "react";
import Header from "./Header/Header";
import Slider from "./Slider/Slider";
import "./Homepage.scss";
import Gender_Men from "../../images/gender_men.jpg";
import Gender_Women from "../../images/gender_women.jpg";
import Gender_Uni from "../../images/gender_unisex.jpg";
import Travis_Img from "../../images/home_travis.jpg";
import Run_Img from "../../images/home_run.jpg";

function HomePage() {
	const AnimateGenderSection = () => {
		window.addEventListener("scroll", () => {
			let AnimationStartPos = window.innerHeight / 1.07;
			/* Animate gender section title */
			let gendersectiontitlewrapper = document.querySelector(
				".gender-section-title-wrapper"
			);
			let titleTopOffset = gendersectiontitlewrapper.getBoundingClientRect()
				.top;
			let GentitleWords = document.querySelectorAll(".gen-title-word");
			if (titleTopOffset < AnimationStartPos) {
				gendersectiontitlewrapper.style.opacity = 1;
				GentitleWords.forEach((word) => {
					word.style.opacity = 1;
				});
			}

			/* 	Animate Gender Images */
			let genderColwrappers = document.querySelectorAll(".gender-col-wrapper");
			genderColwrappers.forEach((wrapper) => {
				let Topoffset = wrapper.getBoundingClientRect().top;
				if (Topoffset < AnimationStartPos) {
					wrapper.style.opacity = 1;
					wrapper.style.marginTop = "0px";
				}
			});
		});
	};

	const AnimateComingSoon = () => {
		window.addEventListener("scroll", () => {
			let AnimationStartPos = window.innerHeight / 1.06;
			let TravisBox = document.querySelector(".travis-box");

			let TravisBoxTopOffset = TravisBox.getBoundingClientRect().top;
			if (TravisBoxTopOffset < AnimationStartPos) {
				TravisBox.style.opacity = 1;
				TravisBox.style.bottom = "-3rem";
			}

			let RunBox = document.querySelector(".run-box");
			let RunBoxTopOffset = RunBox.getBoundingClientRect().top;
			if (RunBoxTopOffset < AnimationStartPos) {
				RunBox.style.opacity = 1;
				RunBox.style.bottom = "-3rem";
			}
		});
	};

	useEffect(() => {
		AnimateGenderSection();
		AnimateComingSoon();
	}, []);

	return (
		<>
			<div className='homepage'>
				<Header />
				<div className='home-slider-section'>
					<div className='home-slider-title-section'>
						<div className='home-slider-title'>Just Dropped</div>
						<div className='showall-btn'>SHOW ALL</div>
					</div>
					<Slider />
				</div>

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
				<section className='our-brands-section'></section>
				{/* 	OurBrands
				Shipping
				Footer */}
			</div>
		</>
	);
}

export default HomePage;
