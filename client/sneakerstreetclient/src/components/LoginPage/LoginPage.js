import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./login.scss";
import { Link, useHistory } from "react-router-dom";
import { url } from "../../api";

function LoginPage() {
	const history = useHistory();
	const [LoginError, setLoginError] = useState("");
	const [user, setuser] = useState(null); // implement redux // encrypt password using bcrypt
	let initialValues = {
		Email: "",
		loginpassword: "",
	};
	useEffect(() => {
		if (user) {
			history.push({
				pathname: "/",
			});
		}
	}, [user]);

	const onSubmit = async (values) => {
		//		console.log("Login Details", values);

		let userlogindata = {
			loginemail: values.Email,
			loginpassword: values.loginpassword,
		};

		const res = await fetch(`${url}/login`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(userlogindata),
		});
		const data = await res.json();
		if (data.errors) {
			setLoginError(data.errors);
		} else {
			setLoginError("");
			setuser(data.userid);
			//console.log(data.userid);
		}
	};

	const validationSchema = Yup.object({
		Email: Yup.string().email().required("Email is Required"),
		loginpassword: Yup.string().required("Password is Required"),
	});

	const formik = useFormik({
		initialValues,
		onSubmit,
		validationSchema,
	});

	return (
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
								{formik.values.Email === "" && "Type your email address"}
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
								{" "}
								{formik.values.loginpassword === "" && "Type your password"}
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
								<a
									rel='noreferrer'
									href='https://www.google.com/'
									target='_blank'>
									Forgot Your Password?
								</a>
								{<div className='error'>{LoginError}</div>}
							</div>
							<button className='submit-button' type='submit'>
								LOGIN
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default LoginPage;
