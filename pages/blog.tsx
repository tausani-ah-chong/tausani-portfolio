import Link from 'next/link'
import { FunctionComponent } from 'react'

const Blog: FunctionComponent = () => {
	const Show = true

	return (
		<div>
			<div>
				<p
					className="font-bold text-sm text-gray-600"
					style={{ textTransform: 'uppercase', letterSpacing: '0.15em' }}
				>
					Blog
				</p>
			</div>
			{Show ? (
				<div>
					<ul className="py-2 list-disc">
						<li className="py-2 text-lg">
							<Link
								className="hover:underline py-2 font-bold"
								href="/blog/malo-lava-lets-build-with-cursor"
							>
								Malo lava, let&apos;s build with Cursor — AI Code Editor ✨
							</Link>
							<p className="text-base">What&apos;s all the hype about?</p>
						</li>
						<li className="py-2 text-lg">
							<Link
								className="hover:underline py-2 font-bold"
								href="/blog/i-built-a-slack-chatgpt-bot"
							>
								I built a Slack ChatGPT Bot
							</Link>
							<p className="text-base">A quick overview of how I built it 🚀</p>
						</li>
					</ul>
				</div>
			) : (
				<p className="text-base">(Coming soon)</p>
			)}
		</div>
	)
}

export default Blog
