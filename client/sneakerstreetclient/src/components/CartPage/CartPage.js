import React, { useEffect, useState } from 'react';
import './cartpage.scss';
import { useSelector, useDispatch } from 'react-redux';
import { RemovefromCart, NewCartTotal } from '../../redux/actions/userActions';
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';
import emptyCartImg from '../../images/empty-cart.png';

function CartPage() {
	const uemail = useSelector((state) => state.userR.email);
	const allproducts = useSelector((state) => state.productR.allproducts);
	const cart = useSelector((state) => state.userR.cart);

	const [Cartproducts, setCartproducts] = useState([]);
	let allcartproducts = [];

	const dispatch = useDispatch();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		console.log(cart);
		cart.forEach((productID) => {
			allproducts.forEach((item) => {
				if (item._id === productID) {
					allcartproducts.push(item);
				}
			});
		});
		setCartproducts(allcartproducts);
	}, [cart]);

	useEffect(() => {
		console.log(Cartproducts);
	}, [Cartproducts]);

	const Remove = (itemid) => {
		const requireddetails = {
			uemail,
			productid: itemid,
			type: 'REMOVE',
		};
		dispatch(RemovefromCart(requireddetails));
	};

	const displayALLproductDIV = Cartproducts.map((product) => (
		<div key={product._id} className='product-container'>
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

					<button
						onClick={(e) => {
							Remove(product._id);
						}}>
						Remove
					</button>
				</div>
			</div>

			<div className='product-right'>Rs. {product.BuyNew}</div>
		</div>
	));

	const ordervalue = Cartproducts.reduce((total, item) => {
		return total + parseInt(item.BuyNew);
	}, 0);

	const tax = 0.18 * ordervalue;

	const totalorder = ordervalue + tax;

	const newCartTotal = () => {
		let finalamt = {
			value: Math.round(totalorder),
			user: uemail,
		};
		dispatch(NewCartTotal(finalamt));
	};

	return (
		<>
			<div className='cart-page'>
				{cart?.length === 0 ? (
					<div className='empty-cart'>
						<img
							className='empty-cart-img'
							src={emptyCartImg}
							alt='Empty Cart'
						/>
						<span>There no Items in your Cart</span>
					</div>
				) : (
					<>
						<div className='cart-page-left'>
							<div className='my-cart-container'>
								<div className='cart-title'>My Cart</div>
								<div className='cart-all-products'>{displayALLproductDIV}</div>
							</div>
						</div>
						<div className='cart-page-right'>
							<div className='summary-title'>Order Summary</div>

							<div className='order-details'>
								<div>Order Value</div>
								<div>Rs. {ordervalue}</div>
							</div>
							<div className='order-details'>
								<div>Tax (18%)</div>
								<div>Rs. {Math.round(tax)}</div>
							</div>
							<div className='order-details'>
								<div>Shipping</div>
								<div>FREE</div>
							</div>
							<div className='order-details TOTAL-DIV'>
								<div className='total'>Total</div>
								<div className='total'>Rs. {Math.round(totalorder)}</div>
							</div>
							<Link to='/checkout'>
								<button className='checkout-btn' onClick={() => newCartTotal()}>
									PROCEED TO CHECKOUT
								</button>
							</Link>
						</div>
					</>
				)}
			</div>
			<Footer />
		</>
	);
}

export default CartPage;
