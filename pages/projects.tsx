import { FunctionComponent } from 'react'

const Projects: FunctionComponent = () => (
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
					<p className="pb-2 text-sm italic">
						WIP: Currently only responsive on laptops and bigger screens.
					</p>
					<p className="text-base">
						A platform for developers to be able to showcase their portfolios and connect with
						employers.
					</p>
				</li>
			</ul>
		</div>
	</section>
)

export default Projects
