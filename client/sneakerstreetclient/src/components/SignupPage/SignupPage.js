import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./signup.scss";
import { Link } from "react-router-dom";
import { url } from "../../api";

function SignupPage() {
	let initialValues = {
		fname: "",
		lname: "",
		email: "",
		password: "",
		cpassword: "",
		terms: false,
	};
	const onSubmit = async (values) => {
		console.log("Form Values", values);
		const response = await fetch(`${url}/signup`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(values),
		});
		const data = await response.json();
		console.log("Sign up server data", data);
	};

	let passwordregex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

	const validationSchema = Yup.object({
		fname: Yup.string().required("First Name Required"),
		lname: Yup.string().required("Last Name Required"),
		email: Yup.string().email().required("Email is Required"),
		password: Yup.string()
			.required("Password is Required")
			.matches(
				passwordregex,
				"Minimum 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
			),
		cpassword: Yup.string().oneOf(
			[Yup.ref("password"), null],
			"Passwords Must Match"
		),
		terms: Yup.boolean()
			.required("Terms and conditions must be accepted. ")
			.oneOf([true], "Terms and conditions must be accepted."),
	});

	const formik = useFormik({
		initialValues,
		onSubmit,
		validationSchema,
	});

	//console.log("Formik Values", formik.values);
	//console.log("Formik Errors", formik.errors);
	//console.log("Formik Visited", formik.touched);

	return (
		<div className='signup-page'>
			<div className='signup-container'>
				<div className='signup-left-cont'>
					<div className='signup-left-title'>
						Create an
						<br /> account
					</div>
					<Link to='/login'>
						<button className='go-to-login'>I ALREADY HAVE AN ACCOUNT</button>
					</Link>
				</div>
				<div className='signup-right-cont'>
					<form onSubmit={formik.handleSubmit}>
						<div className='form-first-row'>
							<div className='input-wrapper'>
								<label htmlFor='fname'>First Name</label>
								<input
									type='text'
									id='fname'
									name='fname'
									value={formik.values.fname}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								/>
								<div className='placeholder'>
									{formik.values.fname === "" && "Type your first name"}{" "}
								</div>
								{
									<div className='error'>
										{formik.errors.fname &&
											formik.touched.fname &&
											formik.errors.fname}
									</div>
								}
							</div>
							<div className='input-wrapper'>
								<label htmlFor='lname'>Last Name</label>
								<input
									type='text'
									id='lname'
									name='lname'
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									value={formik.values.lname}
								/>
								<div className='placeholder'>
									{formik.values.lname === "" && "Type your last name"}
								</div>
								{
									<div className='error'>
										{formik.errors.lname &&
											formik.touched.lname &&
											formik.errors.lname}
									</div>
								}
							</div>
						</div>

						<div className='input-wrapper'>
							<label htmlFor='email'>Email</label>
							<input
								type='email'
								id='email'
								name='email'
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								value={formik.values.email}
							/>
							<div className='placeholder'>
								{formik.values.email === "" && "Type your email address"}
							</div>
							{
								<div className='error'>
									{formik.errors.email &&
										formik.touched.email &&
										formik.errors.email}
								</div>
							}
						</div>
						<div className='input-wrapper'>
							<label htmlFor='password'>Password</label>
							<input
								type='password'
								id='password'
								name='password'
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								value={formik.values.password}
							/>
							<div className='placeholder'>
								{" "}
								{formik.values.password === "" && "Type your password"}
							</div>
							{
								<div className='error'>
									{formik.errors.password &&
										formik.touched.password &&
										formik.errors.password}
								</div>
							}
						</div>
						<div className='input-wrapper'>
							<label htmlFor='password'>Confirm Password</label>
							<input
								type='password'
								id='cpassword'
								name='cpassword'
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								value={formik.values.cpassword}
							/>
							<div className='placeholder'>
								{formik.values.cpassword === "" && "Re-Type your password"}
							</div>
							{
								<div className='error'>
									{formik.errors.cpassword &&
										formik.touched.cpassword &&
										formik.errors.cpassword}
								</div>
							}
						</div>
						<div className='form-last-row'>
							<div className='terms'>
								<input
									type='checkbox'
									id='terms'
									name='terms'
									value={formik.values.terms}
									onChange={formik.handleChange}
								/>
								<label htmlFor='terms'>Accept Terms and Conditions</label>
								{
									<div className='error'>
										{formik.errors.terms &&
											formik.touched.terms &&
											formik.errors.terms}
									</div>
								}
							</div>
							<button className='submit-button' type='submit'>
								SUBMIT
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default SignupPage;
