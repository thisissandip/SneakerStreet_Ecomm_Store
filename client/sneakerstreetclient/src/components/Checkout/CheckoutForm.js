import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { createPaymentIntent } from '../../api';
import { useSelector, useDispatch } from 'react-redux';
import useForm from '../../Hooks/useForm';
import { useHistory } from 'react-router-dom';
import { UpdateMyOrders } from '../../redux/actions/userActions';

function CheckoutForm() {
	const useremail = useSelector((state) => state.userR.email);
	const ucart = useSelector((state) => state.userR.cart);
	const user = useSelector((state) => state.authR.user);

	const history = useHistory();
	const dispatch = useDispatch();

	/* Err Message for validation */
	const [errmsg, setErrmsg] = useState('');

	/* Payment States */
	const [error, setError] = useState(null);
	const [processing, setProcessing] = useState('');
	const [disabled, setDisabled] = useState(false);
	const [succeeded, setSucceeded] = useState(false);
	const [clientSecret, setClientSecret] = useState('');

	const stripe = useStripe();
	const elements = useElements();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	/* onSubmit */
	const finalsubmit = async () => {
		setErrmsg({});
		//console.log(inputs);

		if (inputs.name === null || inputs.name === '') {
			setErrmsg((errmsg) => ({ ...errmsg, errname: 'Name is Required' }));
			return;
		}
		if (inputs.address === null || inputs.address === '') {
			setErrmsg((errmsg) => ({ ...errmsg, erraddress: 'Address is Required' }));
			return;
		}
		if (inputs.pcode === null || inputs.pcode === '') {
			setErrmsg((errmsg) => ({
				...errmsg,
				errpcode: 'Postal Code is Required',
			}));
			return;
		}
		if (inputs.city === null || inputs.city === '') {
			setErrmsg((errmsg) => ({ ...errmsg, errcity: 'City is Required' }));
			return;
		}
		if (inputs.state === null || inputs.state === '') {
			setErrmsg((errmsg) => ({ ...errmsg, errstate: 'State is Required' }));
			return;
		}
		if (inputs.country === null || inputs.country === '') {
			setErrmsg((errmsg) => ({ ...errmsg, errcountry: 'Country is Required' }));
			return;
		}

		const response = await axios.post(
			createPaymentIntent,
			{ useremail, inputs },
			{ 'Content-Type': 'application/json' }
		);
		//console.log(response);
		if (response.data.clientSecret) {
			setClientSecret(response.data.clientSecret);
			setProcessing(true);
		} else {
			setError(`Your Card Data is Incomplete`);
		}
	};

	const { inputs, handleSubmit, handleInputChange } = useForm(finalsubmit);

	useEffect(() => {
		async function checkClientSecret() {
			if (clientSecret !== '' && clientSecret !== null) {
				const payload = await stripe.confirmCardPayment(clientSecret, {
					payment_method: {
						card: elements.getElement(CardElement),
					},
				});

				if (payload.error) {
					setError(`${payload.error.message}`);
					setProcessing(false);
					setDisabled(false);
				} else {
					setError(null);
					setProcessing(false);
					setSucceeded(true);

					dispatch(UpdateMyOrders(useremail, ucart, user));
				}
			}
		}
		checkClientSecret();
	}, [clientSecret]);

	useEffect(() => {
		if (ucart.length === 0) {
			history.push('/');
		}
	}, [ucart]);

	const cardStyle = {
		style: {
			base: {
				color: 'black',
				fontFamily: 'Arial, sans-serif',
				fontSmoothing: 'antialiased',
				fontSize: '18px',
				'::placeholder': {
					color: 'grey',
				},
			},
			invalid: {
				color: '#fa755a',
				iconColor: '#fa755a',
			},
		},
	};

	const handleChange = async (event) => {
		// Listen for changes in the CardElement
		// and display any errors as the customer types their card details
		//setDisabled(event.empty);
		setError(event.error ? event.error.message : '');
	};

	return (
		<div className='form-container'>
			<div className='title'>Card Details</div>
			<form id='payment-form' onSubmit={handleSubmit}>
				<div className='form-control'>
					<label htmlFor='name'>Name</label>
					<input
						type='text'
						id='name'
						name='name'
						onChange={handleInputChange}
						value={inputs.name || ''}
					/>
					<div className='placeholder'>
						{inputs.name ? '' : 'Type your full name'}
					</div>
					<div className='error'>{errmsg.errname && errmsg.errname}</div>
				</div>

				<div className='form-control'>
					<label htmlFor='address'>Address</label>
					<input
						type='text'
						id='address'
						name='address'
						onChange={handleInputChange}
						value={inputs.address || ''}
					/>
					<div className='placeholder'>
						{inputs.address ? '' : 'Flat Number, Locality, Street Name'}
					</div>
					<div className='error'>{errmsg.erraddress && errmsg.erraddress}</div>
				</div>
				<div className='form-row'>
					<div className='form-control'>
						<label htmlFor='pcode'>Postal Code</label>
						<input
							type='text'
							id='pcode'
							name='pcode'
							onChange={handleInputChange}
							value={inputs.pcode || ''}
						/>
						<div className='placeholder'>
							{inputs.pcode ? '' : 'Type your postal code'}
						</div>
						<div className='error'>{errmsg.errpcode && errmsg.errpcode}</div>
					</div>
					<div className='form-control'>
						<label htmlFor='city'>City</label>
						<input
							type='text'
							id='city'
							name='city'
							onChange={handleInputChange}
							value={inputs.city || ''}
						/>
						<div className='placeholder'>{inputs.city ? '' : 'eg.Mumbai'}</div>
						<div className='error'>{errmsg.errcity && errmsg.errcity}</div>
					</div>
				</div>
				<div className='form-row'>
					<div className='form-control'>
						<label htmlFor='pcode'>State</label>
						<input
							type='text'
							id='state'
							name='state'
							onChange={handleInputChange}
							value={inputs.state || ''}
						/>
						<div className='placeholder'>
							{' '}
							{inputs.state ? '' : 'eg.Maharashtra'}
						</div>
						<div className='error'>{errmsg.errstate && errmsg.errstate}</div>
					</div>
					<div className='form-control'>
						<label htmlFor='country'>Country</label>
						<input
							type='text'
							id='country'
							name='country'
							onChange={handleInputChange}
							value={inputs.country || ''}
						/>
						<div className='placeholder'>
							{inputs.country ? '' : 'eg.India'}
						</div>
						<div className='error'>
							{errmsg.errcountry && errmsg.errcountry}
						</div>
					</div>
				</div>

				<div className='form-group'>
					<CardElement
						id='card-element'
						options={cardStyle}
						onChange={handleChange}
					/>
					<div className='error-card'>{error && error}</div>
					<div className='card-number-hint'>
						<div> Use 4242 4242 4242 4242 4242</div>
					</div>
				</div>

				<button
					type='submit'
					id='submit'
					disabled={disabled || processing || succeeded}>
					<span>
						{processing
							? 'PROCESSING'
							: succeeded
							? 'PAYMENT SUCCESSFUL'
							: 'PAY'}
					</span>
				</button>
			</form>
		</div>
	);
}

export default CheckoutForm;
