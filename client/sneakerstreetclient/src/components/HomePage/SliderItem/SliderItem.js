import React, { useState } from "react";
import "./slideritem.scss";

function SliderItem({ allimages, Name, Price }) {
	const [Img, setImg] = useState(allimages[0]);

	return (
		<div
			className='slide-item'
			/* 		onMouseEnter={() => {
				setImg(allimages[1]);
			}}
			onMouseLeave={() => {
				setImg(allimages[0]);
			}} */
		>
			<div className='slide-item-img-wrapper'>
				<img src={Img} alt={Name} />
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
