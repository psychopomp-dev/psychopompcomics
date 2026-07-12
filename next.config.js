const shouldAnalyzeBundles = process.env.ANALYZE === 'true';

let nextConfig = {
	typescript: {
		ignoreBuildErrors: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'via.placeholder.com',
			},
		],
	},
	reactStrictMode: true,
	compiler: {
		styledComponents: true,
	},
};

if (shouldAnalyzeBundles) {
	const withBundleAnalyzer = require('@next/bundle-analyzer')({
		enabled: process.env.ANALYZE === 'true',
	});
	nextConfig = withBundleAnalyzer(nextConfig);
}

module.exports = nextConfig;
