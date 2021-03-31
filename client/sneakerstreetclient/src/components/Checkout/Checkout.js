import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import './checkout.scss';
import { useSelector, useDispatch } from 'react-redux';

const PUBLIC_KEY =
	'pk_test_51IaZabSA3ZYbv4sW7t1mUOMX1qNB9BJQ0YwztHjcaqYiA6DMjiASkVYidOlcbNFRxOEgKxvU95TnmhzGP5VeJysG00UWrAzxwe';

const promise = loadStripe(PUBLIC_KEY);

function Checkout() {
	const carttotal = useSelector((state) => state.userR.cTotal);
	const allproducts = useSelector((state) => state.productR.allproducts);
	const cart = useSelector((state) => state.userR.cart);

	const [Cartproducts, setCartproducts] = useState([]);
	let allcartproducts = [];

	useEffect(() => {
		cart.forEach((productID) => {
			allproducts.forEach((item) => {
				if (item._id === productID) {
					allcartproducts.push(item);
				}
			});
		});
		setCartproducts(allcartproducts);
	}, [cart]);

	const ordervalue = Cartproducts.reduce((total, item) => {
		return total + parseInt(item.BuyNew);
	}, 0);

	const tax = 0.18 * ordervalue;

	const displayALLproductDIV = Cartproducts.map((product) => (
		<div key={product._id} className='product-container'>
			<div className='product-left'>
				<div className='product-img'>
					<img src={product.Images[0]} alt={product.Name} />{' '}
				</div>

				<div className='product-deets'>
					<div className='name'>{product.Name}</div>

					<div>
						<span>Color :</span> {product.Details.Color}
					</div>
					<div>
						<span>Brand :</span> {product.Details.Brand}
					</div>
				</div>
			</div>

			<div className='product-right'>Rs. {product.BuyNew}</div>
		</div>
	));

	return (
		<div className='checkout-page'>
			<div className='checkout-container'>
				<Elements stripe={promise}>
					<CheckoutForm />
				</Elements>
			</div>

			<div className='summary-container'>
				<div className='order-total-container'>
					<div>Order Total : Rs. {carttotal}</div>
					<br />
					<div className='order-total-details'>
						<div>Actual Total : Rs. {ordervalue} </div>
						<div>Tax: Rs. {Math.round(tax)} &#40; 18% &#41;</div>
					</div>
				</div>

				<div className='order-items-wrapper'>
					<div className='order-items-title'>Order Items</div>
					{displayALLproductDIV}
				</div>
			</div>
		</div>
	);
}

export default Checkout;
