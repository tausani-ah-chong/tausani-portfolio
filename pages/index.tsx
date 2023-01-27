import Head from 'next/head'
import Image from 'next/image'
import Contact from './contact'
import DigitalGarden from './digital-garden'
import Projects from './projects'

function App(): JSX.Element {
	// Not showing projects until complete
	const showProjects = false

	return (
		<>
			<Head>
				<meta charSet="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<link href="/path/to/tailwind.css" rel="stylesheet" />
				<title>Tausani Portfolio</title>
			</Head>
			<main className="max-w-xl mx-auto px-8 pt-10 pb-16 text-gray-700 font-sans">
				<figure className="flex justify-center">
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
				</figure>
				<header>
					<div className="pt-6">
						<h1 className="text-left text-3xl font-bold">Tausani Ah Chong (He/Him)</h1>
					</div>
					<div>
						<p className="py-8">
							<span className="font-bold text-lg">Mālō!</span> I&apos;m a Full Stack Software
							Engineer at Halter. I love working with a team I can grow with, where we challenge
							each other to improve. I also strive to create well-designed apps & tools that are
							meaningful to society, for now, and for future generations.
						</p>
					</div>
				</header>
				{showProjects && <Projects />}
				<DigitalGarden />
				<Contact />
			</main>
		</>
	)
}

export default App
