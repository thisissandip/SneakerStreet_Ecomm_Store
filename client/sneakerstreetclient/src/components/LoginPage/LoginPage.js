import React from "react";

function LoginPage() {
	return (
		<div className='signup-page'>
			<div className='signup-container'>
				<div className='signup-left-cont'>
					<div className='signup-left-title'>
						Create an
						<br /> account
					</div>
					<button className='go-to-login'>I ALREADY HAVE AN ACCOUNT</button>
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

export default LoginPage;
