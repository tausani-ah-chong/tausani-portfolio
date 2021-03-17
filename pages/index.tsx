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
			<div className="max-w-xl mx-auto px-4 pt-10 pb-16 text-gray-700 font-sans">
				<div className="flex justify-center">
					<div className="px-4">
						<Image
							className="rounded-full"
							src="/sani-headshot.jpg"
							alt="Picture of the author"
							width={200}
							height={200}
							quality="100"
						></Image>
					</div>
				</div>
				<section>
					<div className="pt-6">
						<h1 className="text-left text-3xl font-bold">Tausani Ah Chong</h1>
					</div>
					<div>
						<p className="py-6">
							<span className="font-bold">Hello!</span> I&apos;m a Full Stack Software Developer
							with a passion for taking a meaningful idea and bringing it to fruition. I’m looking
							to be part of a team that I can grow with, that builds on ideas that are not just
							well-designed apps, but into ideas or tools that are meaningful to society.
						</p>
					</div>
					<div>
						<p
							className="font-bold"
							style={{ textTransform: 'uppercase', letterSpacing: '0.15em' }}
						>
							Projects
						</p>
					</div>
				</section>
			</div>
		</>
	)
}

export default HomePage
