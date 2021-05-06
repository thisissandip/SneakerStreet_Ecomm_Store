const SlideRight = (slideamt, innerslider, TotalsliderParts) => {
	if (currentSlideNum < TotalsliderParts) {
		innerslider.style.transform = `translateX(-${slideamt}px)`;
		setcurrentSlideNum(currentSlideNum + 1);
	}
};

const SlideLeft = (slideamt, innerslider) => {
	if (currentSlideNum > 1) {
		innerslider.style.transform = `translateX(-${slideamt}px)`;
		setcurrentSlideNum(currentSlideNum - 1);
	}
};

/* const Slide = (side) => {
		const innerslider = document.querySelector('.slider');
		const sliderWidth = innerslider.getBoundingClientRect().width;
		let TotalsliderParts = Math.ceil(sliderWidth / width);
		let eachPartWidth = sliderWidth / TotalsliderParts;
		let slideamt = 0;

		switch (side) {
			case 'left':
				slideamt = (eachPartWidth + 30) * (currentSlideNum - 2);
				SlideLeft(slideamt, innerslider);
				console.log(currentSlideNum);
				break;
			case 'right':
				slideamt = (eachPartWidth + 30) * currentSlideNum;
				SlideRight(slideamt, innerslider, TotalsliderParts);
				console.log(currentSlideNum);
				break;

			default:
				break;
		}
	}; */
