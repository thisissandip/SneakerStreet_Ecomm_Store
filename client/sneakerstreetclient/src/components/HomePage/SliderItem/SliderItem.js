import React from "react";
import "./slideritem.scss";

function SliderItem({ allimages, Name, Price }) {
	return (
		<div className='slide-item'>
			<div className='slide-item-img-wrapper'>
				<img src={allimages[0]} alt={Name} />
			</div>
			<div className='slide-item-details'>
				{" "}
				<div className='slide-item-name'>{Name}</div>
				<div className='slide-item-price'>$ {Price}</div>
			</div>
		</div>
	);
}

export default SliderItem;
