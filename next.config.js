/** @type {import('next').NextConfig} */
const nextConfig = {
	trailingSlash: true,
	async rewrites() {
		return [
			{
				source: '/tools/beat-rizz/',
				destination: '/tools/beat-rizz/index.html',
			},
		]
	},
}

module.exports = nextConfig
