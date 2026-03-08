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
					<a className="hover:underline py-2 font-bold" href="/tools/live-drumz/">
						live-drumz
					</a>
					<p className="text-base">
						A mobile-first drum machine that layers Web Audio API drum pads over any YouTube
						playlist. Swipe to change track, tap pads to play — built with zero dependencies.
					</p>
				</li>
			</ul>
		</div>
	</section>
)

export default Projects
