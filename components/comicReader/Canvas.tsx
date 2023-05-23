import React, { MouseEvent, PropsWithRef, useEffect, useState } from 'react';
import Page from './Page';
import {
	getImageToCanvasScale,
	getCanvasDimension,
	getDrawImagePropsFromPage,
} from '../../utils/CanvasHelper';
import { Dimension } from './DimensionType';
import styled from 'styled-components';

const StyledCanvas = styled.canvas`
	width: 100%;
	height: 100%;
`;

interface BaseImageProps {
	width: number;
	height: number;
	src: string;
	alt?: string;
	layout?: 'fixed' | 'fill' | 'intrinsic' | 'responsive' | undefined;
	objectPosition: string;
	page: Page;
	canvasRef: React.RefObject<HTMLCanvasElement>;
}

interface CanvasProps extends PropsWithRef<BaseImageProps> {}

export const Canvas = (props: CanvasProps) => {
	const {
		canvasRef,
		width,
		height,
		src,
		alt,
		layout,
		objectPosition,
		page,
		...other
	} = props;
	const [scale, setScale] = useState<number>(1);

	useEffect(() => {
		console.log('useEffect canvas start');
		console.log(`src ${src}`);
		let current: HTMLCanvasElement | null = canvasRef?.current;

		let ctx: CanvasRenderingContext2D | null | undefined =
			current?.getContext('2d');
		const comicImage = new Image();

		comicImage.onload = () => {
			if (ctx && current) {
				current.height = getCanvasDimension(current, Dimension.Height);
				current.width = getCanvasDimension(current, Dimension.Width);
				// ctx.canvas.style.width = current.getBoundingClientRect().width + 'px';
				// ctx.canvas.style.height = current.getBoundingClientRect().height + 'px';

				const { offsetX, offsetY, scaledWidth, scaledHeight } =
					getDrawImagePropsFromPage(page, current);

				// this will scale to fit the image on the canvas, nice and centered
				setScale(
					getImageToCanvasScale(comicImage.width, comicImage.height, current)
				);

				// console.log('comicImage.width', comicImage.width);
				// console.log('comicImage.height', comicImage.height);
				// console.log('current.height', current.height);
				// console.log('current.height', current.height);

				ctx.drawImage(
					comicImage,
					offsetX,
					offsetY,
					scaledWidth, //scales the image up/down to fit the canvas
					scaledHeight //scales the image up/down to fit the canvas
				);
			}
		};

		comicImage.src = src;

		return () => {
			if (current && ctx) {
				ctx.clearRect(0, 0, current.width, current.height);
			}
		};
	}, [canvasRef, page, scale, src]);

	/**
	 * Click to zoom functionality
	 *
	 * @param event
	 */
	function handleOnClick(event: MouseEvent<HTMLCanvasElement>) {
		const rect = canvasRef.current?.getBoundingClientRect();
		if (rect) {
			const x = event.clientX - rect.left;
			const y = event.clientY - rect.top;
			console.log(`x: ${x} y: ${y}`);
		}
	}

	return (
		<>
			<StyledCanvas
				ref={canvasRef}
				width={width}
				height={height}
				onClick={handleOnClick}
				{...other}
			/>
		</>
	);
};
