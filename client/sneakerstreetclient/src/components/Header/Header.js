import React from 'react';
import Sneaker from '../../images/HomeSneaker.png';
import header1 from '../../images/cool.webp';
import './Header.scss';

function Header({ pagename }) {
	const styles = {
		backgroundImage: pagename === 'homepage' ? `` : `url(${header1})`,
	};

	return (
		<div
			style={styles}
			className={pagename === 'homepage' ? 'header' : 'shop-all-header'}>
			{pagename === 'homepage' ? (
				<>
					<img className='home-sneaker' src={Sneaker} alt='Sneaker Street' />

					<div className='header-title-container'>
						<div className='header-title'> THE WOLF OF SNEAKER STREET</div>
					</div>
				</>
			) : (
				<></>
			)}
		</div>
	);
}

export default Header;
