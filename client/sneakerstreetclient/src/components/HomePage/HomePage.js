import React, { useEffect, useState, useCallback } from "react";
import Header from "./Header/Header";
import Slider from "./Slider/Slider";
import "./Homepage.scss";
import GenderSection from "./GenderSection/GenderSection";
import ComingSoon from "./ComingSoon/ComingSoon";
import OurBrands from "./Our Brands/OurBrands";
import Footer from "../Footer/Footer";
import useWidth from "../../Hooks/useWidth";
import { useLocation } from "react-router-dom";

function HomePage() {
	const location = useLocation();

	const [width] = useWidth();

	const AnimateGenderSection = () => {
		let AnimationStartPos = window.innerHeight / 1.07;
		/* Animate gender section title */
		let gendersectiontitlewrapper = document.querySelector(
			".gender-section-title-wrapper"
		);
		let titleTopOffset = gendersectiontitlewrapper.getBoundingClientRect().top;
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
	};

	const AnimateComingSoon = () => {
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
	};

	const AnimateNewsLetter = () => {
		const newsbox = document.querySelector(".footer-letter-container");
		let AnimationStartPos = window.innerHeight / 1.2;
		let newsboxTop = newsbox.getBoundingClientRect().top;
		if (newsboxTop < AnimationStartPos) {
			newsbox.style.opacity = 1;
			newsbox.style.width = "100%";
		}
	};

	const handleScrollEvent = useCallback((e) => {
		AnimateGenderSection();
		AnimateComingSoon();
		AnimateNewsLetter();
	}, []);

	const [canScroll, setcanScroll] = useState(true);

	useEffect(() => {
		if (canScroll && width > 750) {
			window.addEventListener("scroll", handleScrollEvent);
		}
		return () => {
			window.removeEventListener("scroll", handleScrollEvent);
		};
	}, [width]);

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
				<GenderSection />
				<ComingSoon />
				<OurBrands />
				<Footer />
				{/* 	OurBrands
				Shipping
				Footer */}
			</div>
		</>
	);
}

export default HomePage;
