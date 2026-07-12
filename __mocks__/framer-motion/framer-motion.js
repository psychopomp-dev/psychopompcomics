jest.mock('framer-motion', () => {
	const FakeTransition = jest
		.fn()
		.mockImplementation(({ children }) => children);

	const FakeAnimatePresence = jest
		.fn()
		.mockImplementation(({ children }) => (
			<FakeTransition>{children}</FakeTransition>
		));

	const motion = {
		a: jest
			.fn()
			.mockImplementation(({ children, ...rest }) => (
				<a {...rest}>{children}</a>
			)),
		li: jest.fn().mockImplementation(({ children }) => children),
		span: jest.fn().mockImplementation(({ children }) => children),
		small: jest
			.fn()
			.mockImplementation(({ children }) => <small>{children}</small>),
		h4: jest.fn().mockImplementation(({ children }) => <h4>{children}</h4>),
		h2: jest.fn().mockImplementation(({ children }) => <h2>{children}</h2>),
		p: jest.fn().mockImplementation(({ children }) => <p>{children}</p>),
		div: require('react').forwardRef(({ children, ...rest }, ref) => {
			const { whileTap, animate, initial, variants, ...divProps } = rest;
			return (
				<div {...divProps} ref={ref}>
					{children}
				</div>
			);
		}),
		button: jest
			.fn()
			.mockImplementation(({ children, ...rest }) => (
				<button {...rest}>{children}</button>
			)),
		custom: jest.fn().mockImplementation((props) => props),
	};

	return {
		__esModule: true,
		motion: motion,
		AnimatePresence: FakeAnimatePresence,
		LazyMotion: ({ children }) => children,
		MotionConfig: ({ children }) => children,
		domAnimation: {},
		default: jest.fn(),
	};
});
