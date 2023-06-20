import React, { MouseEvent, PropsWithRef, useEffect } from 'react';
import Page from './Page';
import { drawCanvas } from '../../utils/CanvasHelper';
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

	useEffect(() => {
		// console.log('useEffect canvas start');
		// console.log(`src ${src}`);
		let current: HTMLCanvasElement | null = canvasRef?.current;

		drawCanvas(current, page, -1);

		return () => {
			let ctx: CanvasRenderingContext2D | null | undefined =
				current?.getContext('2d');
			if (current && ctx) {
				ctx.clearRect(0, 0, current.width, current.height);
			}
		};
	}, [canvasRef, page, src]);

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
