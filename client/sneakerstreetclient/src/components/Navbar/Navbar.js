import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CgMenuLeftAlt } from 'react-icons/cg';
import { MdClose } from 'react-icons/md';
import { FiShoppingCart } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { isUserloggedIn, logoutUser } from '../../redux/actions/authActions';
import { fetchUserDetails } from '../../redux/actions/userActions';
import { fetchall } from '../../redux/actions/productActions';

import './Navbar.scss';

function Navbar() {
	const user = useSelector((state) => state.authR.user);
	const cart = useSelector((state) => state.userR.cart);
	const fname = useSelector((state) => state.userR.fname);

	/* 	Fetch all products to Display */
	useEffect(() => {
		dispatch(fetchall());
	}, []);

	const dispatch = useDispatch();

	/* 	Check if the User is logged In */
	useEffect(() => {
		dispatch(isUserloggedIn());
	}, []);

	/* If User is Logged in, fetch User Details */
	useEffect(() => {
		console.log('user', user);
		if (user !== '') {
			dispatch(fetchUserDetails(user));
		}
	}, [user]);

	/* User Cart Console Log */
	useEffect(() => {
		console.log(cart);
	}, [cart]);

	const OpenmMobileMenu = () => {
		const mobilemenu = document.querySelector('.navbar-inner');
		const hamburger = document.querySelector('.hamburger-icon');
		const closemenu = document.querySelector('.close-btn');
		const navitems = document.querySelectorAll('.nav-item');
		mobilemenu.style.left = '0%';
		hamburger.style.display = 'none';
		closemenu.style.display = 'initial';
		navitems.forEach((item) => {
			item.classList.add('openmenu');
		});
	};

	const CloseMobileMenu = () => {
		const mobilemenu = document.querySelector('.navbar-inner');
		const hamburger = document.querySelector('.hamburger-icon');
		const closemenu = document.querySelector('.close-btn');
		const navitems = document.querySelectorAll('.nav-item');
		mobilemenu.style.left = '-100%';
		hamburger.style.display = 'initial';
		closemenu.style.display = 'none';
		navitems.forEach((item) => {
			item.classList.remove('openmenu');
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
						<Link to='/'>
							<div
								className='logo'
								onClick={(e) => {
									CloseMobileMenu(e);
									window.scrollTo(0, 0);
								}}>
								LOGO
							</div>
						</Link>
					</li>
					<li>
						<Link to='/cart'>
							<div
								className='cart-wrapper'
								onClick={(e) => {
									CloseMobileMenu(e);
								}}>
								<FiShoppingCart className='cart' />
								{/* For Time Being Display None it */}
								<div className='cart-item-count'>{cart?.length}</div>
							</div>
						</Link>
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
									window.scrollTo(0, 0);
								}}>
								Logo
							</div>
						</Link>
					</li>
					<li>
						<Link to='/shopall'>
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
						<Link to='/gallery'>
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
						<Link to='/about'>
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
					{user == '' ? (
						<>
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
						</>
					) : (
						<>
							<li>
								<Link to='/login'>
									<div className='nav-item'>Hi, {fname}</div>
								</Link>
							</li>
							<li>
								<Link to='/'>
									<div
										className='nav-item'
										onClick={(e) => {
											dispatch(logoutUser());
											window.location.reload();
										}}>
										Logout
									</div>
								</Link>
							</li>
						</>
					)}

					<li>
						<Link to='/cart'>
							<div
								className='nav-item'
								onClick={(e) => {
									CloseMobileMenu(e);
								}}>
								<div className='cart-wrapper'>
									<FiShoppingCart className='cart' />
									<div className='cart-item-count'>{cart?.length}</div>
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
