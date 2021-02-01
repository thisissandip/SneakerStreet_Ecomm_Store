import React from "react";
import "./ourbrands.scss";

function OurBrands() {
	return (
		<>
			<section className='others-section'>
				<hr />
				<div className='others-container'>
					<div className='others-col'>
						<div className='others-title'>Shippping</div>
						<div className='others-details'>
							We are currently shipping each parcel directly from Japan to your
							door in France. Regular shipping would take around 2 weeks,
							however due to the unexpected situation with COVID-19, delivery
							time can delay without notice.
						</div>
					</div>
					<div className='others-col'>
						<div className='others-title'>Returns</div>
						<div className='others-details'>
							You have the possibility to return or exchange your order within
							14 days after delivery. The printed invoice which has been sent
							via email must be included. Your return parcel can be sent to our
							Paris office at your expense. Learn more in the Questions and
							Informations section in the footer
						</div>
					</div>
					<div className='others-col'>
						<div className='others-title'>Payment</div>
						<div className='others-details'>
							We use a securised shopify payment process. Therefore, you can pay
							with Visa, Mastercard, American Express, Apple Pay, Google Pay and
							Stripe
						</div>
					</div>
					<div className='others-col'>
						<div className='others-title'>Pre-Booking</div>
						<div className='others-details'>
							A pre-order is an order placed for an item that has not yet been
							released. The idea for pre-orders came because people found it
							hard to get popular items in stores because of their popularity.
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export default OurBrands;
