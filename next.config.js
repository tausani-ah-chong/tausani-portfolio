/** @type {import('next').NextConfig} */
const nextConfig = {
	trailingSlash: true,
	async rewrites() {
		return [
			{
				source: '/tools/beat-rizz/',
				destination: '/tools/beat-rizz/index.html',
			},
			{
				source: '/tools/faalupega/',
				destination: '/tools/faalupega/index.html',
			},
		]
	},
	async headers() {
		return [
			{
				source: '/tools/faalupega/:path*',
				headers: [
					{ key: 'Cross-Origin-Embedder-Policy', value: 'require-corp' },
					{ key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
				],
			},
		]
	},
}

module.exports = nextConfig
