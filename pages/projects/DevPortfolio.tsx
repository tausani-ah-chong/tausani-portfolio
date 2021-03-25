import Head from 'next/head'

function DevPortfolio(): JSX.Element {
	return (
		<>
			<Head>
				<meta charSet="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<link href="/path/to/tailwind.css" rel="stylesheet" />
				<title>Tausani Portfolio</title>
			</Head>
			<main className="max-w-xl mx-auto px-8 pt-10 pb-16 text-gray-700 font-sans">
				<header>
					<h1 className="text-center text-3xl font-bold">This is my project DevPortfolio!</h1>
				</header>
			</main>
		</>
	)
}

export default DevPortfolio
