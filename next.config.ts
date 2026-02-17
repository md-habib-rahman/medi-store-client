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
	async rewrites() {
		return [
			{
				source: "/api/auth/:path*",
				destination: `https://medi-store-backend-rust.vercel.app/api/auth/:path*`,
			},
		];
	},
}





export default config