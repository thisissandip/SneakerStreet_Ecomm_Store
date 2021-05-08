import React, { useEffect, useRef, useState } from 'react';
import './footer.scss';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { gsap } from 'gsap';
import useWidth from '../../Hooks/useWidth';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { newsletter } from '../../api/index';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Footer() {
	const uemail = useSelector((state) => state.userR.email);
	const dispatch = useDispatch();

	const initialValues = {
		NewsEmail: '',
	};

	const FooterMailRef = useRef(null);

	const [width] = useWidth();
	const [didMount, SetdidMount] = useState(false);

	useEffect(() => {
		SetdidMount(true);
		if (didMount) {
			if (width > 850) {
				gsap.to(FooterMailRef.current, {
					css: {
						opacity: 1,
						width: '100%',
					},
					scrollTrigger: {
						trigger: FooterMailRef.current,
						start: 'top-=500 center',
					},
				});
			} else {
				gsap.killTweensOf(FooterMailRef.current);
			}
		}

		return () => {
			SetdidMount(false);
		};
	}, [width, didMount]);

	const ValidationSchema = () => {
		NewsEmail: Yup.string()
			.email('Please enter a valid email')
			.required('Email is Required');
	};

	const ErrorNotify = () => {
		toast.error(`Please Enter your email address!`, {
			position: 'bottom-left',
			autoClose: 6000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
	};

	const onSubmit = async (values) => {
		let email = values.NewsEmail;

		try {
			if (!email) {
				ErrorNotify();
				return;
			}
			const response = await axios.post(
				newsletter,
				{ email },
				{
					'Content-Type': 'application/json',
				}
			);
			const data = response.data;
			if (data.msg === 'Success') {
				SubNotify();
			}
		} catch (err) {
			console.log(err);
		}
	};

	const SubNotify = () => {
		toast.info(`Thank You For Subscribing To Us! Check your Email!`, {
			position: 'bottom-left',
			autoClose: 6000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
	};

	const formik = useFormik({
		initialValues,
		onSubmit,
		ValidationSchema,
	});

	return (
		<>
			<footer id='footer'>
				<div className='footer-wrapper'>
					<section className='footer-left'>
						<div className='footer-logo'>SNEAKER STREET</div>
						<div className='footer-links'>
							<ul className='footer-links-col'>
								<li>Browse</li>
								<Link to='/shopall'>
									<li>Shop All</li>
								</Link>
								<Link to='/about'>
									<li>About</li>
								</Link>
								{uemail === '' || uemail === null ? (
									<Link to='/login'>
										<li>Account</li>
									</Link>
								) : (
									<Link to='/myorders'>
										<li>My Orders</li>
									</Link>
								)}
							</ul>
							<ul className='footer-links-col'>
								<li>Information</li>
								<a href='/#information'>
									<li>Shipping</li>
								</a>
								<a href='/#information'>
									<li>Returns</li>
								</a>
								<a href='/#information'>
									<li>Payment</li>
								</a>
								<a href='/#information'>
									<li>Pre-Booking</li>
								</a>
							</ul>
							<ul className='footer-links-col'>
								<li>Social</li>
								<a target='_blank' href='https://www.facebook.com/'>
									<li>Facebook</li>
								</a>
								<a target='_blank' href='https://www.instagram.com/'>
									<li>Instagram</li>
								</a>
								<a target='_blank' href='https://www.twitter.com/'>
									<li>Twitter</li>
								</a>
							</ul>
						</div>
					</section>
					<section className='footer-right'>
						<div className='newsletter-wrapper'>
							<div className='letter-title'>Newsletter</div>
							<div ref={FooterMailRef} className='footer-letter-container'>
								<form
									onSubmit={formik.handleSubmit}
									className='footer-input-wrapper'>
									<label htmlFor='#footer-email'>Email</label>
									<input
										type='email'
										id='NewsEmail'
										name='NewsEmail'
										value={formik.values.NewsEmail}
										onChange={formik.handleChange}
									/>
									<button className='sub-button' type='submit'>
										Subscribe
									</button>
								</form>
							</div>
						</div>
					</section>
				</div>
			</footer>
			<ToastContainer />
		</>
	);
}

export default Footer;
