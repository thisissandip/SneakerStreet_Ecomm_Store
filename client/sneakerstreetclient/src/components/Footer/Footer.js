import React, { useEffect } from "react";
import "./footer.scss";
import * as Yup from "yup";
import { useFormik } from "formik";

function Footer() {
	const initialValues = {
		NewsEmail: "",
	};

	const ValidationSchema = () => {
		NewsEmail: Yup.string()
			.email("Please enter a valid email")
			.required("Email is Required");
	};

	const onSubmit = (values) => {
		console.log(values.NewsEmail);
		console.log(formik.errors);
	};

	const formik = useFormik({
		initialValues,
		onSubmit,
		ValidationSchema,
	});

	return (
		<footer>
			<div className='footer-wrapper'>
				<section className='footer-left'>
					<div className='footer-logo'>Logo</div>
					<div className='footer-links'>
						<ul className='footer-links-col'>
							<li>Browse</li>
							<li>Shop All</li>
							<li>Gallery</li>
							<li>About</li>
							<li>Account</li>
						</ul>
						<ul className='footer-links-col'>
							<li>Information</li>
							<li>Shipping</li>
							<li>Returns</li>
							<li>Payment</li>
							<li>Pre-Booking</li>
						</ul>
						<ul className='footer-links-col'>
							<li>Social</li>
							<li>Facebook</li>
							<li>Instagram</li>
							<li>Twitter</li>
						</ul>
					</div>
				</section>
				<section className='footer-right'>
					<div className='newsletter-wrapper'>
						<div className='letter-title'>Newsletter</div>
						<div className='footer-letter-container'>
							<form
								onSubmit={formik.handleSubmit}
								className='footer-input-wrapper'>
								<label htmlFor='#footer-email'>Email</label>
								<input
									type='email'
									id='footer-email'
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
	);
}

export default Footer;
