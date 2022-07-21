import styled from 'styled-components';
import Link from 'next/link';
import NoScrollLink from '../NoScrollLink.tsx';

const StyledPrimaryLink = styled.div`
	display: inline-flex;
	justify-content: center;
	align-items: center;
	padding: var(--space-md);

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
		font-size: var(--font-size-lg);
		height: var(--space-lg);
		min-width: var(--space-lg);
		line-height: var(--space-lg);
	}
`;

const StyledPrimaryLinkMd = styled(StyledPrimaryLink)`
	a {
		font-size: var(--font-size-md);
		height: var(--space-md);
		min-width: var(--space-md);
		line-height: var(--space-md);
	}
`;

const StyledPrimaryLinkXs = styled(StyledPrimaryLink)`
	a {
		font-size: var(--font-size-xs);
		height: var(--space-xs);
		min-width: var(--space-xs);
		line-height: var(--space-xs);
	}
`;

const StyledPrimaryLinkSm = styled(StyledPrimaryLink)`
	a {
		font-size: var(--font-size-sm);
		height: var(--space-sm);
		min-width: var(--space-sm);
		line-height: var(--space-sm);
	}
`;

const StyledPrimaryLinkXl = styled(StyledPrimaryLink)`
	a {
		font-size: var(--font-size-xl);
		height: var(--space-xl);
		min-width: var(--space-xl);
		line-height: var(--space-xl);
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
			<NoScrollLink href={props.href} passHref={props.passHref}>
				<a onClick={props.onClick}>{props.children}</a>
			</NoScrollLink>
		</StyledPrimaryLink>
	);
}

export function PrimaryLinkXsNoScroll(props) {
	return (
		<StyledPrimaryLinkXs>
			<NoScrollLink href={props.href} passHref={props.passHref}>
				<a onClick={props.onClick}>{props.children}</a>
			</NoScrollLink>
		</StyledPrimaryLinkXs>
	);
}

export function PrimaryLinkSmNoScroll(props) {
	return (
		<StyledPrimaryLinkSm>
			<NoScrollLink href={props.href} passHref={props.passHref}>
				<a onClick={props.onClick}>{props.children}</a>
			</NoScrollLink>
		</StyledPrimaryLinkSm>
	);
}

export function PrimaryLinkMdNoScroll(props) {
	return (
		<StyledPrimaryLinkMd>
			<NoScrollLink href={props.href} passHref={props.passHref}>
				<a onClick={props.onClick}>{props.children}</a>
			</NoScrollLink>
		</StyledPrimaryLinkMd>
	);
}

export function PrimaryLinkLgNoScroll(props) {
	return (
		<StyledPrimaryLinkLg>
			<NoScrollLink href={props.href} passHref={props.passHref}>
				<a onClick={props.onClick}>{props.children}</a>
			</NoScrollLink>
		</StyledPrimaryLinkLg>
	);
}
