import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './login.scss';
import { Link, useHistory } from 'react-router-dom';
import { loginFacebook } from '../../api';
import Footer from '../Footer/Footer';
import { FaFacebookF } from 'react-icons/fa';
import { fetchUser } from '../../redux/actions/authActions';

function LoginPage() {
	const user = useSelector((state) => state.authR.user);
	const authError = useSelector((state) => state.authR.error);
	const dispatch = useDispatch();
	const history = useHistory();

	let initialValues = {
		Email: '',
		loginpassword: '',
	};

	const [didMount, SetdidMount] = useState(false);

	useEffect(() => {
		SetdidMount(true);
		if (didMount) {
			window.scrollTo(0, 0);
		}
		return () => {
			SetdidMount(false);
		};
	}, [didMount]);

	useEffect(() => {
		if (user) {
			history.push({
				pathname: '/',
			});
		}
	}, [user]);

	const onSubmit = async (values) => {
		//	console.log("Login Details", values);
		let userlogindata = {
			loginemail: values.Email,
			loginpassword: values.loginpassword,
		};
		dispatch(fetchUser(userlogindata));
	};

	const validationSchema = Yup.object({
		Email: Yup.string()
			.email('Please enter a valid email')
			.required('Email is Required'),
		loginpassword: Yup.string().required('Password is Required'),
	});

	const formik = useFormik({
		initialValues,
		onSubmit,
		validationSchema,
	});

	return (
		<>
			<div className='login-page'>
				<div className='login-container'>
					<div className='login-left-cont'>
						<div className='login-left-title'>
							Login to your
							<br /> account
						</div>
						<Link to='/signup'>
							<button className='go-to-login'>I DON'T HAVE AN ACCOUNT</button>
						</Link>
					</div>
					<div className='login-right-cont'>
						<form onSubmit={formik.handleSubmit}>
							<div className='input-wrapper'>
								<label htmlFor='Email'>Email</label>
								<input
									type='email'
									id='Email'
									name='Email'
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									value={formik.values.Email}
								/>
								<div className='placeholder'>
									{formik.values.Email === '' && 'Type your email address'}
								</div>
								{
									<div className='error'>
										{formik.errors.Email &&
											formik.touched.Email &&
											formik.errors.Email}
									</div>
								}
							</div>
							<div className='input-wrapper'>
								<label htmlFor='loginpassword'>Password</label>
								<input
									type='password'
									id='loginpassword'
									name='loginpassword'
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									value={formik.values.loginpassword}
								/>
								<div className='placeholder'>
									{' '}
									{formik.values.loginpassword === '' && 'Type your password'}
								</div>
								{
									<div className='error'>
										{formik.errors.loginpassword &&
											formik.touched.loginpassword &&
											formik.errors.loginpassword}
									</div>
								}
							</div>

							<div className='form-last-row'>
								<div className='terms'>
									<div className='error error-login'>{authError}</div>
								</div>
								<button className='submit-button' type='submit'>
									LOGIN
								</button>
							</div>
						</form>
						<div className='divider'></div>
						<div className='oauth-container'>
							<div className='facebook'>
								<a href={loginFacebook}>
									<button className='facebook-signin-btn'>
										<FaFacebookF />{' '}
										<div className='fb-text'>Sign In with Facebook</div>
									</button>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}

export default LoginPage;
