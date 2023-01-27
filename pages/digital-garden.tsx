import Link from 'next/link'
import { FunctionComponent } from 'react'

const DigitalGarden: FunctionComponent = () => {
	const Show = true

	return (
		<div>
			<div>
				<p
					className="font-bold text-sm text-gray-600"
					style={{ textTransform: 'uppercase', letterSpacing: '0.15em' }}
				>
					Digital Garden
				</p>
			</div>
			{!Show ? (
				<div>
					<ul className="py-2 list-disc">
						<li className="py-2 text-lg">
							<Link className="hover:underline py-2 font-bold" href="https://tausani.super.site/">
								Learning to learn
							</Link>
							<p className="text-base">
								2 hours studying !== 2 hours learning, why? Heres a few tips to make the most of
								your study time.
							</p>
						</li>
					</ul>
				</div>
			) : (
				<p className="text-base">(Coming soon)</p>
			)}
		</div>
	)
}

export default DigitalGarden
