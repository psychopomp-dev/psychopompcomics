const FadeIn = {
	hidden: {
		opacity: 0,
		x: 0,
		y: 0,
	},
	visible: {
		opacity: 1,
		x: 0,
		y: 0,
		transition: {
			duration: 0.3,
			type: 'linear',
		},
	},
	viewport: {
		once: true,
	},
};

function VariantFactory(base, props) {
	let MotionVariant = JSON.parse(JSON.stringify(base));
	if (typeof props !== 'undefined') {
		if (props.hasOwnProperty('delay') && props.delay === 'delay') {
			MotionVariant.visible.transition.delay = 0.5;
		} else if (props.hasOwnProperty('delay') && props.delay === 'delayXl') {
			MotionVariant.visible.transition.delay = 1;
		}
		if (props.hasOwnProperty('direction') && props.direction === 'left') {
			MotionVariant.hidden.x = '10rem';
		} else if (
			props.hasOwnProperty('direction') &&
			props.direction === 'right'
		) {
			MotionVariant.hidden.x = '-10rem';
		} else if (
			props.hasOwnProperty('direction') &&
			props.direction === 'down'
		) {
			MotionVariant.hidden.y = '-10rem';
		} else if (props.hasOwnProperty('direction') && props.direction === 'up') {
			MotionVariant.hidden.y = '10rem';
		}
	}

	return MotionVariant;
}

const FadeInDelay = VariantFactory(FadeIn, { delay: 'delay' });
const FadeInDelayXl = VariantFactory(FadeIn, { delay: 'delayXl' });
const FadeInLeft = VariantFactory(FadeIn, { direction: 'left' });
const FadeInRight = VariantFactory(FadeIn, { direction: 'right' });
const FadeInUp = VariantFactory(FadeIn, { direction: 'up' });
const FadeInDown = VariantFactory(FadeIn, { direction: 'down' });
const FadeInLeftDelay = VariantFactory(FadeIn, {
	delay: 'delay',
	direction: 'left',
});
const FadeInRightDelay = VariantFactory(FadeIn, {
	delay: 'delay',
	direction: 'right',
});
const FadeInUpDelay = VariantFactory(FadeIn, {
	delay: 'delay',
	direction: 'up',
});
const FadeInDownDelay = VariantFactory(FadeIn, {
	delay: 'delay',
	direction: 'down',
});
const FadeInLeftDelayXl = VariantFactory(FadeIn, {
	delay: 'delayXl',
	direction: 'left',
});
const FadeInRightDelayXl = VariantFactory(FadeIn, {
	delay: 'delayXl',
	direction: 'right',
});
const FadeInUpDelayXl = VariantFactory(FadeIn, {
	delay: 'delayXl',
	direction: 'up',
});
const FadeInDownDelayXl = VariantFactory(FadeIn, {
	delay: 'delayXl',
	direction: 'down',
});

export {
	FadeIn,
	FadeInDelay,
	FadeInDelayXl,
	FadeInLeft,
	FadeInUp,
	FadeInDown,
	FadeInRight,
	FadeInLeftDelay,
	FadeInUpDelay,
	FadeInDownDelay,
	FadeInRightDelay,
	FadeInLeftDelayXl,
	FadeInRightDelayXl,
	FadeInUpDelayXl,
	FadeInDownDelayXl,
};
