import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './productitem.scss';

function ProductItem({ allimages, Name, Price, pagename, id }) {
	const [Img, setImg] = useState(allimages[0]);

	const productClassname =
		pagename === 'homepage' ? 'product-item' : 'shop-item';

	return (
		<div
			onMouseOver={() => {
				if (pagename === 'shopall') {
					setImg(allimages[2]);
				}
			}}
			onMouseLeave={() => {
				if (pagename === 'shopall') {
					setImg(allimages[0]);
				}
			}}
			className={`${productClassname}`}>
			<Link to={`/sneaker/${id}`}>
				<div className='product-item-img-wrapper'>
					<img src={Img} alt={Name} />
				</div>
				<div className='product-item-details'>
					<div className='product-item-name'>{Name}</div>
					<div className='product-item-price'>
						{' '}
						<span className='rupee'>Rs.</span> {Price}
					</div>
				</div>
			</Link>
		</div>
	);
}

export default ProductItem;
