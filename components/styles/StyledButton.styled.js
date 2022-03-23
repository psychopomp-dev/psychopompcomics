import styled from 'styled-components';
import Link from 'next/link';

function toRadians(angle) {
	return angle * (Math.PI / 180);
}

function getTriangleWidth(height) {
	const a = (height * Math.sin(toRadians(30))) / Math.sin(toRadians(120));
	const b = a;
	const area = (a * b * Math.sin(toRadians(120))) / 2;
	return Number.parseFloat((2 * area) / height).toFixed(2);
}

/*
To add a box shadow, you have to style the div around the Link element
by adding the following to the ButtonContainer:

  & > div {
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: -1;
      box-shadow: var(--box-shadow-md);
    }
  }

This won't put a shadow on the triangles but you can't tell and it keeps
the box shadow behind the triangles.

    Try adding the following to the ButtonContainer if a shadow is needed:

    &:first-child {
      clip-path: polygon(100% 0, 100% 100%, 0 50%);
    }
    &:last-child {
      clip-path: polygon(0 0, 0 100%, 100% 50%);
    }
*/

const ButtonContainerPrimary = styled.div`
	display: inline-flex;
	justify-content: center;
	align-items: center;

	& a {
		position: relative;
		display: block;
		text-align: center;
		background-color: var(--brand);
		text-decoration: none;
		color: var(--text-on-brand);
		border: none;
		height: ${({ theme }) => theme.spaces.xl};
		min-width: ${({ theme }) => theme.spaces.xxl.replace('rem', '') * 2}rem;
		line-height: ${({ theme }) => theme.spaces.xl};
		padding: 0 ${({ theme }) => theme.spaces.lg};
		cursor: pointer;
		transition: background-color 300ms ease;
		font-weight: bold;
	}

	& > svg {
		height: ${({ theme }) => theme.spaces.xl};
	}

	&:hover {
		& > div:first-child {
			border-right-color: hsl(
				var(--brand-hue) var(--brand-saturation)
					calc(var(--brand-lightness) * 1.2)
			);
		}

		& a {
			background-color: hsl(
				var(--brand-hue) var(--brand-saturation)
					calc(var(--brand-lightness) * 1.2)
			);
			color: var(--text-on-brand);
		}

		& > div:last-child {
			border-left-color: hsl(
				var(--brand-hue) var(--brand-saturation)
					calc(var(--brand-lightness) * 1.2)
			);
		}
	}

	&:focus,
	&:active {
		& > div:first-child {
			border-right-color: hsl(
				var(--brand-hue) var(--brand-saturation)
					calc(var(--brand-lightness) * 1.5)
			);
		}

		& a {
			background-color: hsl(
				var(--brand-hue) var(--brand-saturation)
					calc(var(--brand-lightness) * 1.5)
			);
			color: var(--text-on-brand);
		}

		& > div:last-child {
			border-left-color: hsl(
				var(--brand-hue) var(--brand-saturation)
					calc(var(--brand-lightness) * 1.5)
			);
		}
	}
`;

const Triangle = styled.div`
	position: relative;
	height: 0;
	width: 0;
	border-style: solid;
	transition: border-color 300ms ease;
`;

const TriangleLeftPrimary = styled(Triangle)`
	border-width: ${({ theme }) => theme.spaces.xl.replace('rem', '') / 2}rem
		${({ theme }) => getTriangleWidth(theme.spaces.xl.replace('rem', ''))}rem
		${({ theme }) => theme.spaces.xl.replace('rem', '') / 2}rem 0;
	border-color: transparent var(--brand) transparent transparent;
`;

const TriangleRightPrimary = styled(Triangle)`
	border-width: ${({ theme }) => theme.spaces.xl.replace('rem', '') / 2}rem 0
		${({ theme }) => theme.spaces.xl.replace('rem', '') / 2}rem
		${({ theme }) => getTriangleWidth(theme.spaces.xl.replace('rem', ''))}rem;
	border-color: transparent transparent transparent var(--brand);
`;

const ButtonTest = styled.a`
	display: block;
	text-align: center;
	background-color: var(--brand);
	text-decoration: none;
	color: var(--text-on-brand);
	border: none;
	height: ${({ theme }) => theme.spaces.xl};
	min-width: ${({ theme }) => theme.spaces.xxl.replace('rem', '') * 2}rem;
	line-height: ${({ theme }) => theme.spaces.xl};
	padding: 0 ${({ theme }) => theme.spaces.lg};
	cursor: pointer;
	transition: background-color 300ms ease;
	font-weight: bold;
`;

function LinkPrimary(props) {
	return (
		<ButtonContainerPrimary>
			<TriangleLeftPrimary />
			<div>
				<Link {...props} />
			</div>
			<TriangleRightPrimary />
		</ButtonContainerPrimary>
	);
}

const ButtonContainerPrimarySm = styled(ButtonContainerPrimary)`
	& a {
		font-size: ${({ theme }) => theme.fonts.sizes.xs};
		height: ${({ theme }) => theme.spaces.lg};
		min-width: ${({ theme }) => theme.spaces.xxl.replace('rem', '')}rem;
		line-height: ${({ theme }) => theme.spaces.lg};
	}
`;

const TriangleLeftPrimarySm = styled(TriangleLeftPrimary)`
	border-width: ${({ theme }) => theme.spaces.lg.replace('rem', '') / 2}rem
		${({ theme }) => getTriangleWidth(theme.spaces.lg.replace('rem', ''))}rem
		${({ theme }) => theme.spaces.lg.replace('rem', '') / 2}rem 0;
`;

const TriangleRightPrimarySm = styled(TriangleRightPrimary)`
	border-width: ${({ theme }) => theme.spaces.lg.replace('rem', '') / 2}rem 0
		${({ theme }) => theme.spaces.lg.replace('rem', '') / 2}rem
		${({ theme }) => getTriangleWidth(theme.spaces.lg.replace('rem', ''))}rem;
`;

export function LinkPrimarySm(props) {
	return (
		<ButtonContainerPrimarySm>
			<TriangleLeftPrimarySm />
			<Link {...props} />
			<TriangleRightPrimarySm />
		</ButtonContainerPrimarySm>
	);
}

const ButtonContainerPrimaryLg = styled(ButtonContainerPrimary)`
	& a {
		font-size: ${({ theme }) => theme.fonts.sizes.md};
		height: ${({ theme }) => theme.spaces.lg.replace('rem', '') * 2}rem;
		min-width: ${({ theme }) => theme.spaces.xxl.replace('rem', '') * 2}rem;
		line-height: ${({ theme }) => theme.spaces.lg.replace('rem', '') * 2}rem;
	}
`;

const TriangleLeftPrimaryLg = styled(TriangleLeftPrimary)`
	border-width: ${({ theme }) => theme.spaces.lg.replace('rem', '')}rem
		${({ theme }) =>
			getTriangleWidth(theme.spaces.lg.replace('rem', '') * 2)}rem
		${({ theme }) => theme.spaces.lg.replace('rem', '')}rem 0;
`;

const TriangleRightPrimaryLg = styled(TriangleRightPrimary)`
	border-width: ${({ theme }) => theme.spaces.lg.replace('rem', '')}rem 0
		${({ theme }) => theme.spaces.lg.replace('rem', '')}rem
		${({ theme }) =>
			getTriangleWidth(theme.spaces.lg.replace('rem', '') * 2)}rem;
`;

export function LinkPrimaryLg(props) {
	return (
		<ButtonContainerPrimaryLg>
			<TriangleLeftPrimaryLg />
			<div>
				<Link {...props} />
			</div>
			<TriangleRightPrimaryLg />
		</ButtonContainerPrimaryLg>
	);
}

const ButtonContainerPrimaryOutline = styled(ButtonContainerPrimary)`
	& a {
		background-color: transparent;
		color: var(--brand);
		border-top: 0.1rem solid var(--brand);
		border-bottom: 0.1rem solid var(--brand);
	}

	& svg {
		path {
			transition: fill 300ms ease;
			fill: transparent;
			stroke: rgb(var(--brand-rgb));
			background-color: inherit;
		}
	}

	&:hover {
		a {
			background-color: rgba(var(--brand-rgb), 0.2);
		}
		svg path {
			fill: rgba(var(--brand-rgb), 0.2);
		}
	}

	&:focus,
	&:active {
		a {
			background-color: rgba(var(--brand-rgb), 0.3);
		}
		svg path {
			fill: rgba(var(--brand-rgb), 0.3);
		}
	}
`;

export function LinkPrimaryOutline(props) {
	return (
		<ButtonContainerPrimaryOutline>
			<svg
				data-name='Left Triangle'
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 9.24 32'
			>
				<path
					fill='transparent'
					stroke='#8ec63f'
					strokeMiterlimit='10'
					d='M12.76-5.06v42.12L.59 15.99 12.76-5.06z'
				/>
			</svg>
			<div>
				<Link {...props} />
			</div>
			<svg
				data-name='Right Triangle'
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 9.24 32'
			>
				<path
					fill='transparent'
					stroke='#8ec63f'
					strokeMiterlimit='10'
					d='M-3.52-5.06v42.12L8.65 15.99-3.52-5.06z'
				/>
			</svg>
		</ButtonContainerPrimaryOutline>
	);
}

const ButtonContainerPrimaryOutlineSm = styled(ButtonContainerPrimaryOutline)`
	& > svg {
		height: ${({ theme }) => theme.spaces.lg};
	}
	& a {
		font-size: ${({ theme }) => theme.fonts.sizes.xs};
		height: ${({ theme }) => theme.spaces.lg};
		min-width: ${({ theme }) => theme.spaces.xxl.replace('rem', '')}rem;
		line-height: ${({ theme }) => theme.spaces.lg};
	}
`;

export function LinkPrimaryOutlineSm(props) {
	return (
		<ButtonContainerPrimaryOutlineSm>
			<svg
				data-name='Large Left Triangle'
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 6.93 24'
			>
				<path
					fill='transparent'
					stroke='#8ec63f'
					strokeMiterlimit='10'
					d='M12.76-9.06v42.12L.59 11.99 12.76-9.06z'
				/>
			</svg>
			<div>
				<Link {...props} />
			</div>
			<svg
				data-name='Small Right Triangle'
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 6.93 24'
			>
				<path
					fill='transparent'
					stroke='#8ec63f'
					strokeMiterlimit='10'
					d='M-5.83-9.06v42.12L6.34 11.99-5.83-9.06z'
				/>
			</svg>
		</ButtonContainerPrimaryOutlineSm>
	);
}

const ButtonContainerPrimaryOutlineLg = styled(ButtonContainerPrimaryOutline)`
	& > svg {
		height: ${({ theme }) => theme.spaces.lg.replace('rem', '') * 2}rem;
	}
	& a {
		font-size: ${({ theme }) => theme.fonts.sizes.md};
		height: ${({ theme }) => theme.spaces.lg.replace('rem', '') * 2}rem;
		min-width: ${({ theme }) => theme.spaces.xxl.replace('rem', '') * 2}rem;
		line-height: ${({ theme }) => theme.spaces.lg.replace('rem', '') * 2}rem;
	}
`;

export function LinkPrimaryOutlineLg(props) {
	return (
		<ButtonContainerPrimaryOutlineLg>
			<svg
				data-name='Large Left Triangle'
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 13.86 48'
			>
				<path
					fill='transparent'
					stroke='#8ec63f'
					strokeMiterlimit='10'
					d='M19.25-8.29v64.58L.6 23.99 19.25-8.29z'
				/>
			</svg>

			<div>
				<Link {...props} />
			</div>
			<svg
				data-name='Large Right Triangle'
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 13.86 48'
			>
				<path
					fill='transparent'
					stroke='#8ec63f'
					strokeMiterlimit='10'
					d='M-5.39-8.29v64.58l18.65-32.3L-5.39-8.29z'
				/>
			</svg>
		</ButtonContainerPrimaryOutlineLg>
	);
}

export default LinkPrimary;
