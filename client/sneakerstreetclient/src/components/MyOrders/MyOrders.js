import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import emptyCartImg from '../../images/emptyorders.png';
import Footer from '../Footer/Footer';
import './myorders.scss';

function MyOrders() {
	const uemail = useSelector((state) => state.userR.email);
	const allproducts = useSelector((state) => state.productR.allproducts);
	const cart = useSelector((state) => state.userR.orders);

	const [Cartproducts, setCartproducts] = useState([]);
	let allcartproducts = [];

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		//console.log(cart);
		if (uemail && cart) {
			cart.forEach((productID) => {
				allproducts.forEach((item) => {
					if (item._id === productID) {
						allcartproducts.push(item);
					}
				});
			});
			setCartproducts(allcartproducts);
		}
	}, [cart, allproducts]);

	const displayALLproductDIV = Cartproducts.map((product, i) => (
		<div key={i} className='product-container'>
			<div className='product-left'>
				<Link to={`/sneaker/${product._id}`}>
					<div className='product-img'>
						<img src={product.Images[0]} alt={product.Name} />{' '}
					</div>
				</Link>
				<div className='product-deets'>
					<Link to={`/sneaker/${product._id}`}>
						<div className='name'>{product.Name}</div>
					</Link>
					<div>
						<span>Color :</span> {product.Details.Color}
					</div>
					<div>
						<span>Brand :</span> {product.Details.Brand}
					</div>
					<div className='product-right'>Rs. {product.BuyNew}</div>
				</div>
			</div>
		</div>
	));

	return (
		<>
			<div className='my-orders-page'>
				{allproducts.length !== 0 ? (
					cart?.length === 0 ? (
						<div className='empty-cart'>
							<img
								className='empty-cart-img'
								src={emptyCartImg}
								alt='Empty Cart'
								style={{ opacity: 0.7 }}
							/>
							<span>You Haven't Ordered Anything Yet</span>
						</div>
					) : (
						<>
							<div className='cart-page-left'>
								<div className='my-cart-container'>
									<div className='cart-title'>My Orders</div>
									<div className='cart-all-products'>
										{displayALLproductDIV}
									</div>
								</div>
							</div>
						</>
					)
				) : (
					<svg className='spinner' viewBox='0 0 50 50'>
						<circle
							className='path'
							cx='25'
							cy='25'
							r='20'
							fill='none'
							strokeWidth='5'></circle>
					</svg>
				)}
			</div>
			<Footer />
		</>
	);
}

export default MyOrders;
