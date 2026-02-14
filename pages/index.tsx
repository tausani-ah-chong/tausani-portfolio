import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Contact from './contact'
import Blog from './blog'
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
						<h1 className="text-left text-3xl font-bold">
							Tausani Ah Chong (He/Him){' '}
							<span role="img" aria-label="Samoan flag">
								🇼🇸
							</span>{' '}
							<span role="img" aria-label="New Zealand flag">
								🇳🇿
							</span>
						</h1>
					</div>
					<div>
						<p className="py-8">
							<span className="font-bold text-lg">
								Talofa!{' '}
								<span role="img" aria-label="waving hand">
									👋
								</span>
							</span>
						</p>
						<p className="pb-4">
							I&apos;m a Intermediate Full-Stack Software Engineer @{' '}
							<Link href="https://halterhq.com" className="font-bold underline">
								Vector{' '}
								<span role="img" aria-label="lightning">
									⚡️
								</span>
							</Link>{' '}
						</p>
						<p className="pb-4">
							I&apos;m a proud dad of two,{' '}
							<span role="img" aria-label="family">
								👨‍👩‍👧‍👦
							</span>{' '}
							and a curious tinkerer through the world of software engineering.
						</p>
						<p className="pb-8">
							In my spare time I&apos;m embracing the #BuildInPublic movement. Always keen to learn
							and grow!
						</p>
					</div>
				</header>
				{showProjects && <Projects />}
				<Blog />
				<Contact />
			</main>
		</>
	)
}

export default App
