import React, { useEffect } from "react";
import header1 from "../../../images/header1.jpg";
import header2 from "../../../images/header2.jpg";
import header3 from "../../../images/header3.jpg";
import "./Header.scss";

function Header() {
	const CrossFadeHeader = () => {
		let header = document.querySelector(".header");
		setTimeout(() => {
			header.style.backgroundImage = `url(${header2})`;
		}, 5000);
		setTimeout(() => {
			header.style.backgroundImage = `url(${header3})`;
		}, 10000);
		setTimeout(() => {
			header.style.backgroundImage = `url(${header1})`;
		}, 15000);
	};

	useEffect(() => {
		CrossFadeHeader();
		setInterval(() => {
			CrossFadeHeader();
		}, 15000);
	}, []);
	
	return <div className='header'></div>;
}

export default Header;
