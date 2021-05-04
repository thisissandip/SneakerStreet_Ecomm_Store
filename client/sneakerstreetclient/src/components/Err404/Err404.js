import React from 'react';
import './error.scss';
import Img404 from '../../images/err.png';

function Err404() {
	return (
		<div className='error-page'>
			{' '}
			<img className='err-img' src={Img404} alt='Empty Cart' />
		</div>
	);
}

export default Err404;
