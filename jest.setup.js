import '@testing-library/jest-dom';

jest.mock('next/image', () => {
	return function MockImage({ src, alt, fill, width, height, ...props }) {
		return (
			<img
				src={typeof src === 'string' ? src : src?.src}
				alt={alt}
				data-fill={fill ? 'true' : undefined}
				width={width}
				height={height}
				{...props}
			/>
		);
	};
});
