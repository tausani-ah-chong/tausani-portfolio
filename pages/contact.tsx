import { FunctionComponent } from 'react'

const Contact: FunctionComponent = () => (
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
							href="https://www.instagram.com/tausani_mai_manu/"
							target="_blank"
							rel="noopener noreferrer"
						>
							@tausani_mai_manu
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
				<li className="py-2 text-lg">
					<p className="font-bold text-base">
						Mobile:{' '}
						<a
							className="hover:bg-gray-100 underline py-2 font-normal"
							href="#"
							target="_blank"
							rel="noopener noreferrer"
						>
							+64224960891
						</a>
					</p>
				</li>
			</ul>
		</div>
	</section>
)

export default Contact
