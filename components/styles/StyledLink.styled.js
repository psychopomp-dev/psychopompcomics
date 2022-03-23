import styled from 'styled-components';
import Link from 'next/link';
import NoScrollLink from '../NoScrollLink.tsx';

const StyledPrimaryLink = styled.div`
	display: inline-flex;
	justify-content: center;
	align-items: center;
	padding: ${({ theme }) => theme.spaces.md};

	a {
		text-transform: uppercase;
	}

	:focus {
		color: hsl(
			var(--brand-hue) var(--brand-saturation)
				calc(var(--brand-lightness) * 1.5)
		);
	}
`;

const StyledPrimaryLinkLg = styled(StyledPrimaryLink)`
	a {
		font-size: ${({ theme }) => theme.fonts.sizes.lg};
		height: ${({ theme }) => theme.spaces.lg};
		min-width: ${({ theme }) => theme.spaces.lg};
		line-height: ${({ theme }) => theme.spaces.lg};
	}
`;

const StyledPrimaryLinkMd = styled(StyledPrimaryLink)`
	a {
		font-size: ${({ theme }) => theme.fonts.sizes.md};
		height: ${({ theme }) => theme.spaces.md};
		min-width: ${({ theme }) => theme.spaces.md};
		line-height: ${({ theme }) => theme.spaces.md};
	}
`;

const StyledPrimaryLinkXs = styled(StyledPrimaryLink)`
	a {
		font-size: ${({ theme }) => theme.fonts.sizes.xs};
		height: ${({ theme }) => theme.spaces.xs};
		min-width: ${({ theme }) => theme.spaces.xs};
		line-height: ${({ theme }) => theme.spaces.xs};
	}
`;

const StyledPrimaryLinkSm = styled(StyledPrimaryLink)`
	a {
		font-size: ${({ theme }) => theme.fonts.sizes.sm};
		height: ${({ theme }) => theme.spaces.sm};
		min-width: ${({ theme }) => theme.spaces.sm};
		line-height: ${({ theme }) => theme.spaces.sm};
	}
`;

const StyledPrimaryLinkXl = styled(StyledPrimaryLink)`
	a {
		font-size: ${({ theme }) => theme.fonts.sizes.xl};
		height: ${({ theme }) => theme.spaces.xl};
		min-width: ${({ theme }) => theme.spaces.xl};
		line-height: ${({ theme }) => theme.spaces.xl};
	}
`;

export function PrimaryLink(props) {
	return (
		<StyledPrimaryLink>
			<Link href={props.href}>
				<a onClick={props.onClick}>{props.children}</a>
			</Link>
		</StyledPrimaryLink>
	);
}

export function PrimaryLinkLg(props) {
	return (
		<StyledPrimaryLinkLg>
			<Link href={props.href}>
				<a onClick={props.onClick}>{props.children}</a>
			</Link>
		</StyledPrimaryLinkLg>
	);
}

export function PrimaryLinkXs(props) {
	return (
		<StyledPrimaryLinkXs>
			<Link href={props.href}>
				<a onClick={props.onClick}>{props.children}</a>
			</Link>
		</StyledPrimaryLinkXs>
	);
}

export function PrimaryLinkSm(props) {
	return (
		<StyledPrimaryLinkSm>
			<Link href={props.href}>
				<a onClick={props.onClick}>{props.children}</a>
			</Link>
		</StyledPrimaryLinkSm>
	);
}

export function PrimaryLinkMd(props) {
	return (
		<StyledPrimaryLinkMd>
			<Link href={props.href}>
				<a onClick={props.onClick}>{props.children}</a>
			</Link>
		</StyledPrimaryLinkMd>
	);
}

export function PrimaryLinkNoScroll(props) {
	return (
		<StyledPrimaryLink>
			<NoScrollLink
				href={props.href}
				passHref={props.passHref}
				scroll={props.scroll}
			>
				<a onClick={props.onClick}>{props.children}</a>
			</NoScrollLink>
		</StyledPrimaryLink>
	);
}

export function PrimaryLinkXsNoScroll(props) {
	return (
		<StyledPrimaryLinkXs>
			<NoScrollLink
				href={props.href}
				passHref={props.passHref}
				scroll={props.scroll}
			>
				<a onClick={props.onClick}>{props.children}</a>
			</NoScrollLink>
		</StyledPrimaryLinkXs>
	);
}

export function PrimaryLinkSmNoScroll(props) {
	return (
		<StyledPrimaryLinkSm>
			<NoScrollLink
				href={props.href}
				passHref={props.passHref}
				scroll={props.scroll}
			>
				<a onClick={props.onClick}>{props.children}</a>
			</NoScrollLink>
		</StyledPrimaryLinkSm>
	);
}

export function PrimaryLinkMdNoScroll(props) {
	return (
		<StyledPrimaryLinkMd>
			<NoScrollLink
				href={props.href}
				passHref={props.passHref}
				scroll={props.scroll}
			>
				<a onClick={props.onClick}>{props.children}</a>
			</NoScrollLink>
		</StyledPrimaryLinkMd>
	);
}

export function PrimaryLinkLgNoScroll(props) {
	return (
		<StyledPrimaryLinkLg>
			<NoScrollLink
				href={props.href}
				passHref={props.passHref}
				scroll={props.scroll}
			>
				<a onClick={props.onClick}>{props.children}</a>
			</NoScrollLink>
		</StyledPrimaryLinkLg>
	);
}
