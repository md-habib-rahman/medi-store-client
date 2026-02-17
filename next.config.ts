import type { NextConfig } from 'next'

const config: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**',
			},
		],
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	// async rewrites() {
	// 	return [
	// 		{
	// 			source: "/api/auth/:path*",
	// 			destination: `${process.env.NEXT_PUBLIC_BASE_API}/api/auth/:path*`,
	// 		},
	// 	];
	// },
}





export default config