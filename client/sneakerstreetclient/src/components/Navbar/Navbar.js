import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { CgMenuLeftAlt } from 'react-icons/cg';
import { MdClose } from 'react-icons/md';
import { FiShoppingCart } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { isUserloggedIn, logoutUser } from '../../redux/actions/authActions';
import { fetchUserDetails } from '../../redux/actions/userActions';
import { fetchall } from '../../redux/actions/productActions';
import useWidth from '../../Hooks/useWidth';

import './Navbar.scss';

function Navbar() {
	const user = useSelector((state) => state.authR.user);
	const cart = useSelector((state) => state.userR.cart);
	const fname = useSelector((state) => state.userR.fname);

	const [width] = useWidth();

	const dispatch = useDispatch();

	const history = useHistory();

	const isAuthenticated = localStorage.getItem('ssauth');

	/* 	Fetch all products to Display */
	useEffect(() => {
		dispatch(fetchall());
	}, []);

	/* 	Check if the User is logged In */
	useEffect(() => {
		dispatch(isUserloggedIn());
	}, []);

	/* If User is Logged in, fetch User Details */
	useEffect(() => {
		console.log('user', user);
		if (user !== '' && user !== null) {
			dispatch(fetchUserDetails(user));
		} /* else if (isAuthenticated == null) {
			history.push({
				pathname: '/',
			});
		} */
	}, [user]);

	/* User Cart Console Log */
	useEffect(() => {
		console.log('Cart', cart);
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
		mobilemenu.style.left = '-150%';
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
						<NavLink exact to='/'>
							<div
								className='logo'
								onClick={(e) => {
									CloseMobileMenu(e);
									window.scrollTo(0, 0);
								}}>
								SNEAKER STREET
							</div>
						</NavLink>
					</li>
					<li>
						<NavLink activeClassName='is-active' to='/cart'>
							<div
								className='cart-wrapper'
								onClick={(e) => {
									CloseMobileMenu(e);
								}}>
								<FiShoppingCart className='cart' />
								{/* For Time Being Display None it */}
								<div className='cart-item-count'>{cart?.length}</div>
							</div>
						</NavLink>
					</li>
				</ul>
			</div>
			<div className='navbar-inner'>
				<ul className='left-nav'>
					<li>
						<NavLink exact activeClassName='is-active' to='/'>
							<div
								className='logo'
								onClick={(e) => {
									CloseMobileMenu(e);
									window.scrollTo(0, 0);
								}}>
								SNEAKER STREET
							</div>
						</NavLink>
					</li>

					{width > 850 ? null : (
						<li>
							<div className='nav-item hi-mobile'>
								Hi, {user ? fname : 'Guest'}
							</div>
						</li>
					)}

					<li>
						<NavLink activeClassName='is-active' to='/shopall'>
							<div
								className='nav-item'
								onClick={(e) => {
									CloseMobileMenu(e);
								}}>
								Shop All
							</div>
						</NavLink>
					</li>

					<li>
						<NavLink activeClassName='is-active' to='/about'>
							<div
								className='nav-item'
								onClick={(e) => {
									CloseMobileMenu(e);
								}}>
								About
							</div>
						</NavLink>
					</li>
				</ul>
				<ul className='right-nav'>
					{user == null ? (
						<>
							<li>
								<NavLink activeClassName='is-active' to='/login'>
									<div
										className='nav-item'
										onClick={(e) => {
											CloseMobileMenu(e);
										}}>
										Account
									</div>
								</NavLink>
							</li>
						</>
					) : (
						<>
							<li className='my-profile'>
								{width < 850 ? null : (
									<div className='nav-item'>Hi, {user ? fname : 'Guest'}</div>
								)}

								<ul className='dropdown-menu'>
									<li className='my-orders'>
										<NavLink activeClassName='is-active' to='/myorders'>
											<div
												onClick={(e) => {
													CloseMobileMenu(e);
												}}>
												My Orders
											</div>
										</NavLink>
									</li>
									<li>
										<NavLink exact to='/'>
											<div
												className='logout-btn'
												onClick={(e) => {
													dispatch(logoutUser());
												}}>
												Logout
											</div>
										</NavLink>
									</li>
								</ul>
							</li>
							{/* 	<li>
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
							</li> */}
						</>
					)}

					<li className='cart-item-btn'>
						<NavLink activeClassName='is-active' to='/cart'>
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
						</NavLink>
					</li>
				</ul>
			</div>
		</nav>
	);
}

export default Navbar;
