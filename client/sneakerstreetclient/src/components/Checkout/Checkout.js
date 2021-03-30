import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

import './checkout.scss';

const PUBLIC_KEY =
	'pk_test_51IaZabSA3ZYbv4sW7t1mUOMX1qNB9BJQ0YwztHjcaqYiA6DMjiASkVYidOlcbNFRxOEgKxvU95TnmhzGP5VeJysG00UWrAzxwe';

const promise = loadStripe(PUBLIC_KEY);

function Checkout() {
	return (
		<div className='checkout-page'>
			<div className='checkout-container'>
				<Elements stripe={promise}>
					<CheckoutForm />
				</Elements>
			</div>
			<div className='summary-container'>Summary</div>
		</div>
	);
}

export default Checkout;
