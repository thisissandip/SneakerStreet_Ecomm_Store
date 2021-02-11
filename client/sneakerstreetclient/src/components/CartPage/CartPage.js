import React, { useEffect } from 'react';
import './cartpage.scss';
import { useSelector, useDispatch } from 'react-redux';

function CartPage() {
	const user = useSelector((state) => state.authR.user);
	const cart = useSelector((state) => state.userR.cart);

	useEffect(() => {
		console.log(cart);
	}, [cart]);

	useEffect(() => {
		console.log(user);
	}, [user]);

	return <div className='cart-page'></div>;
}

export default CartPage;
