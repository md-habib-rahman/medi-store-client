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
}

export default config