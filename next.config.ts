import type { NextConfig } from 'next'

const config: NextConfig = {
	async rewrites() {
		return [
			{
				source: "/api/auth/:path*",
				destination: `https://medi-store-backend-rust.vercel.app/api/auth/:path*`,
			},
		];
	},

	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**',
			},
		],
	},

}





export default config