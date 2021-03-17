import Head from 'next/head'
import Image from 'next/image'

function HomePage(): JSX.Element {
	return (
		<>
			<Head>
				<meta charSet="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<link href="/path/to/tailwind.css" rel="stylesheet" />
				<title>Tausani Portfolio</title>
			</Head>
			<div className="max-w-xl mx-auto px-4 pt-8 pb-16 text-gray-900">
				<div>
					<div className="flex justify-center pt-8">
						<Image
							className="rounded-full"
							src="/sani-headshot.jpg"
							alt="Picture of the author"
							width={200}
							height={200}
							quality="100"
						></Image>
					</div>
					<div className="p-6">
						<h1 className="text-center text-2xl font-sans font-bold">Tausani Ah Chong</h1>
					</div>
				</div>
				<section>
					<div>
						<p className="p-2">
							I am a Full Stack Software Developer with a passion for taking a meaningful idea and
							bringing it to fruition.
						</p>
						<p className="p-2">
							I’m looking to be part of a team that I can grow with, that builds on ideas that are
							not just well-designed apps, into ideas or tools that are meaningful to society.
						</p>
					</div>
				</section>
			</div>
		</>
	)
}

export default HomePage
