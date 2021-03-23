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
						<h1 className="text-left text-3xl font-bold">Tausani Ah Chong</h1>
					</div>
					<div>
						<p className="py-8">
							<span className="font-bold text-lg">Hello!</span> I&apos;m a Full Stack Software
							Developer with a passion for taking a meaningful idea and bringing it to fruition. I’m
							looking to be part of a team I can grow with, where we challenge each other to
							improve. I want to work in a team where we create well-designed apps that are
							meaningful to society, for now, and for future generations.
						</p>
					</div>
				</header>
				<section>
					<div>
						<p
							className="font-bold text-sm text-gray-600"
							style={{ textTransform: 'uppercase', letterSpacing: '0.15em' }}
						>
							Projects
						</p>
					</div>
					<div>
						<ul className="py-2 list-disc">
							<li className="py-2 text-lg">
								<a
									className="hover:underline py-2 font-bold"
									href="https://dev-portfolio-21.herokuapp.com"
									target="_blank"
									rel="noopener noreferrer"
								>
									DevPortfolio
								</a>
								<p className="py-2 text-base">
									WIP: A platform for developers to be able to showcase their portfolios and connect
									with employers.
								</p>
								<p className="text-xs text-gray-600">March 19, 2021</p>
							</li>
						</ul>
					</div>
				</section>
				<section className="pt-6">
					<div>
						<p
							className="font-bold text-sm text-gray-600"
							style={{ textTransform: 'uppercase', letterSpacing: '0.15em' }}
						>
							Contact
						</p>
					</div>
					<div>
						<ul className="py-2 list-disc">
							<li className="py-2 text-lg">
								<p className="font-bold text-base">
									Github:{' '}
									<a
										className="hover:bg-gray-100 underline py-2 font-normal"
										href="https://github.com/tausani-ah-chong"
										target="_blank"
										rel="noopener noreferrer"
									>
										@tausani-ah-chong
									</a>
								</p>
							</li>
							<li className="py-2 text-lg">
								<p className="font-bold text-base">
									Email: <span className="py-2 font-normal">tausani93@gmail.com</span>
								</p>
							</li>
							<li className="py-2 text-lg">
								<p className="font-bold text-base">
									Instagram:{' '}
									<a
										className="hover:bg-gray-100 underline py-2 font-normal"
										href="https://www.instagram.com/apollo_45k/"
										target="_blank"
										rel="noopener noreferrer"
									>
										@apollo_45k
									</a>
								</p>
							</li>
							<li className="py-2 text-lg">
								<p className="font-bold text-base">
									LinkedIn:{' '}
									<a
										className="hover:bg-gray-100 underline py-2 font-normal"
										href="https://www.linkedin.com/in/tausaniahchong/"
										target="_blank"
										rel="noopener noreferrer"
									>
										@tausaniahchong
									</a>
								</p>
							</li>
						</ul>
					</div>
				</section>
			</main>
		</>
	)
}

export default HomePage
