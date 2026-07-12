import React, { MouseEvent, PropsWithRef, useEffect, useState } from 'react';
import Page from './Page';
import { drawCanvas } from '../../utils/CanvasHelper';
import styled from 'styled-components';
import MotionLogo from '../styles/MotionLogo.styled';

const CanvasContainer = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
`;

const StyledCanvas = styled.canvas`
	width: 100%;
	height: 100%;
`;

const LoadingOverlay = styled.div<{ $visible: boolean }>`
	position: absolute;
	inset: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	background: var(--surface1);
	pointer-events: none;
	opacity: ${({ $visible }) => ($visible ? 1 : 0)};
	transition: opacity 0.3s ease;
	z-index: 1;

	svg {
		width: 35%;
		max-width: 12rem;
	}
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
	initialPanel?: number;
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
		initialPanel,
		...other
	} = props;

	const [isLoading, setIsLoading] = useState(true);
	const [showOverlay, setShowOverlay] = useState(true);

	useEffect(() => {
		let cancelled = false;
		setIsLoading(true);
		setShowOverlay(true);

		const current: HTMLCanvasElement | null = canvasRef?.current;
		const panelIndex =
			page.panels[initialPanel] === undefined ? -1 : initialPanel;

		(async () => {
			try {
				if (current) {
					await drawCanvas(current, page, panelIndex);
				}
			} catch (error) {
				console.error('Failed to draw comic page:', error);
			} finally {
				if (!cancelled) {
					setIsLoading(false);
				}
			}
		})();

		return () => {
			cancelled = true;
			const ctx: CanvasRenderingContext2D | null | undefined =
				current?.getContext('2d');
			if (current && ctx) {
				ctx.clearRect(0, 0, current.width, current.height);
			}
		};
	}, [canvasRef, initialPanel, page, src]);

	useEffect(() => {
		if (!isLoading) {
			const timer = setTimeout(() => setShowOverlay(false), 300);
			return () => clearTimeout(timer);
		}
	}, [isLoading]);

	function handleOnClick(event: MouseEvent<HTMLCanvasElement>) {
		const rect = canvasRef.current?.getBoundingClientRect();
		if (rect) {
			const x = event.clientX - rect.left;
			const y = event.clientY - rect.top;
			console.log(`x: ${x} y: ${y}`);
		}
	}

	return (
		<CanvasContainer>
			{showOverlay && (
				<LoadingOverlay
					$visible={isLoading}
					aria-hidden='true'
					data-testid='canvas-loading-overlay'
				>
					<MotionLogo loop />
				</LoadingOverlay>
			)}
			<StyledCanvas
				ref={canvasRef}
				width={width}
				height={height}
				onClick={handleOnClick}
				{...other}
			/>
		</CanvasContainer>
	);
};
