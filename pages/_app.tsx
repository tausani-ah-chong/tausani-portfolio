import type { AppProps /*, AppContext */ } from 'next/app'
import { Analytics } from '@vercel/analytics/react'
import 'tailwindcss/tailwind.css'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
	return (
		<>
			<Component {...pageProps} />
			<Analytics />
		</>
	)
}

export default MyApp
