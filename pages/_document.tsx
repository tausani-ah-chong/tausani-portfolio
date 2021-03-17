import Document, { Head, Main, NextScript, Html } from 'next/document'

export default class MyDocument extends Document {
	render(): JSX.Element {
		return (
			<Html>
				<Head>
					<link rel="preconnect" href="https://fonts.gstatic.com" />
					<link
						rel="preload"
						as="style"
						href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
					/>
					<link
						href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
						rel="stylesheet"
						media="print"
					/>
					<noscript>
						<link
							href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
							rel="stylesheet"
						/>
					</noscript>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}
