import React from "react";
import { Link } from "react-router-dom";
import { CgMenuLeftAlt } from "react-icons/cg";
import { MdClose } from "react-icons/md";
import { FiShoppingCart } from "react-icons/fi";

import "./Navbar.scss";

function Navbar() {
	const OpenmMobileMenu = () => {
		const mobilemenu = document.querySelector(".navbar-inner");
		const hamburger = document.querySelector(".hamburger-icon");
		const closemenu = document.querySelector(".close-btn");
		const navitems = document.querySelectorAll(".nav-item");
		mobilemenu.style.left = "0%";
		hamburger.style.display = "none";
		closemenu.style.display = "initial";
		navitems.forEach((item) => {
			item.classList.add("openmenu");
		});
	};

	const CloseMobileMenu = () => {
		const mobilemenu = document.querySelector(".navbar-inner");
		const hamburger = document.querySelector(".hamburger-icon");
		const closemenu = document.querySelector(".close-btn");
		const navitems = document.querySelectorAll(".nav-item");
		mobilemenu.style.left = "-100%";
		hamburger.style.display = "initial";
		closemenu.style.display = "none";
		navitems.forEach((item) => {
			item.classList.remove("openmenu");
		});
	};

	return (
		<nav className='navbar'>
			<div className='mobile-nav'>
				<ul>
					<li>
						<div className='hamburger'>
							<CgMenuLeftAlt
								className='hamburger-icon'
								onClick={(e) => {
									OpenmMobileMenu(e);
								}}
							/>
							<MdClose
								className='close-btn'
								onClick={(e) => {
									CloseMobileMenu(e);
								}}
							/>
						</div>
					</li>
					<li>
						<div
							className='logo'
							onClick={(e) => {
								CloseMobileMenu(e);
							}}>
							LOGO
						</div>
					</li>
					<li>
						<div
							className='cart-wrapper'
							onClick={(e) => {
								CloseMobileMenu(e);
							}}>
							<FiShoppingCart className='cart' />
						</div>
					</li>
				</ul>
			</div>
			<div className='navbar-inner'>
				<ul className='left-nav'>
					<li>
						<Link to='/'>
							<div
								className='logo'
								onClick={(e) => {
									CloseMobileMenu(e);
								}}>
								Logo
							</div>
						</Link>
					</li>
					<li>
						<Link to='/'>
							<div
								className='nav-item'
								onClick={(e) => {
									CloseMobileMenu(e);
								}}>
								Shop All
							</div>
						</Link>
					</li>
					<li>
						<Link to='/'>
							<div
								className='nav-item'
								onClick={(e) => {
									CloseMobileMenu(e);
								}}>
								Gallery
							</div>
						</Link>
					</li>
					<li>
						<Link to='/'>
							<div
								className='nav-item'
								onClick={(e) => {
									CloseMobileMenu(e);
								}}>
								About
							</div>
						</Link>
					</li>
				</ul>
				<ul className='right-nav'>
					<li>
						<div
							className='nav-item'
							onClick={(e) => {
								CloseMobileMenu(e);
							}}>
							Search
						</div>
					</li>
					<li>
						<Link to='/login'>
							<div
								className='nav-item'
								onClick={(e) => {
									CloseMobileMenu(e);
								}}>
								Account
							</div>
						</Link>
					</li>
					<li>
						<Link to='/login'>
							<div
								className='nav-item'
								onClick={(e) => {
									CloseMobileMenu(e);
								}}>
								<div className='cart-wrapper'>
									<FiShoppingCart className='cart' />
								</div>
							</div>
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
}

export default Navbar;
