import Link, { LinkProps } from 'next/link';
import React, { ReactNode } from 'react';

interface IProps extends LinkProps {
	children: ReactNode;
}

const NoScrollLink = ({ children, href, scroll = false, ...props }: IProps) => (
	<Link href={href} scroll={scroll} {...props}>
		{children}
	</Link>
);

export default NoScrollLink;
