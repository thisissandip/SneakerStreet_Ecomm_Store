import React from 'react';
import header2 from '../../images/header2.jpg';
import header1 from '../../images/header1.jpg';
import './Header.scss';

function Header({ pagename }) {
	const styles = {
		backgroundImage:
			pagename == 'homepage' ? `url(${header2})` : `url(${header1})`,
	};

	return <div style={styles} className='header'></div>;
}

export default Header;
