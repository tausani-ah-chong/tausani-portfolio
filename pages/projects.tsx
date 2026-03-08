import { FunctionComponent } from 'react'

const Projects: FunctionComponent = () => (
	<section className="pb-6">
		<div>
			<p
				className="font-bold text-sm text-gray-600"
				style={{ textTransform: 'uppercase', letterSpacing: '0.15em' }}
			>
				Tools &amp; Apps
			</p>
		</div>
		<div>
			<ul className="py-2 list-disc">
				<li className="py-2 text-lg">
					<a className="hover:underline py-2 font-bold" href="/tools/beat-rizz/">
						BeatRizz
					</a>
					<p className="text-base">
						For the culture — tap drum pads over curated tracks or paste your own YouTube playlist.
						Swipe to switch tracks.
					</p>
				</li>
			</ul>
		</div>
	</section>
)

export default Projects
