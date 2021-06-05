import React from 'react';
import Sneaker from '../../images/HomeSneaker.png';
import header1 from '../../images/cool.png';
import './Header.scss';

function Header() {
	return (
		<div className='header'>
			<img className='home-sneaker' src={Sneaker} alt='Sneaker Street' />

			<div className='header-title-container'>
				<div className='header-title'> THE WOLF OF SNEAKER STREET</div>
			</div>
		</div>
	);
}

export default Header;
