import Link from 'next/link'
import { FunctionComponent } from 'react'

const Blog: FunctionComponent = () => {
	const Show = true

	return (
		<div>
			<div>
				<div className="flex items-center gap-3">
					<p
						className="font-bold text-sm text-gray-600"
						style={{ textTransform: 'uppercase', letterSpacing: '0.15em' }}
					>
						Blog
					</p>
					<a
						href="/feed.xml"
						className="text-xs text-orange-500 hover:text-orange-600 font-medium"
						title="RSS Feed"
					>
						RSS
					</a>
				</div>
			</div>
			{Show ? (
				<div>
					<ul className="py-2 list-disc">
						<li className="py-2 text-lg">
							<Link className="hover:underline py-2 font-bold" href="/blog/copilot">
								Building a Coding Agent from Scratch
							</Link>
							<p className="text-base">
								No API. No CLI. No agentic tooling. How I cracked M365 Copilot&apos;s enterprise
								barriers and built a fully agentic development flow using a secret ingredient.
							</p>
						</li>
						<li className="py-2 text-lg">
							<Link
								className="hover:underline py-2 font-bold"
								href="/blog/the-model-just-wants-to-use-tools"
							>
								The Model Just Wants to Use Tools
							</Link>
							<p className="text-base">
								Building the Faalupega CLI - a tool for Samoan chiefly honourifics, inspired by my
								my own struggles with research and the need for tooling for AI agents.
							</p>
						</li>
						<li className="py-2 text-lg">
							<Link
								className="hover:underline py-2 font-bold"
								href="/blog/genuine-in-a-world-of-generated-content"
							>
								Genuine in a World of Generated Content
							</Link>
							<p className="text-base">
								On AI writing, local Whisper models, and why being intentional beats letting AI
								improvise.
							</p>
						</li>
						<li className="py-2 text-lg">
							<Link className="hover:underline py-2 font-bold" href="/blog/tdd-or-just-tests">
								TDD or Just Tests? What I Learned Building a TDD Agent in a Weekend
							</Link>
							<p className="text-base">
								Determinism, non-determinism, and what actually happens when you enforce TDD with an
								AI agent.
							</p>
						</li>
						<li className="py-2 text-lg">
							<Link className="hover:underline py-2 font-bold" href="/blog/first-post-2026">
								First Post 2026 - Shipping Code Feels Safe, Sharing Opinions Feels Risky
							</Link>
							<p className="text-base">7 posts. 2 rules. Let&apos;s go.</p>
						</li>
						<li className="py-2 text-lg">
							<Link
								className="hover:underline py-2 font-bold"
								href="/blog/malo-lava-lets-build-with-cursor"
							>
								Malo lava, let&apos;s build with Cursor — AI Code Editor{' '}
								<span role="img" aria-label="sparkles">
									✨
								</span>
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
							<p className="text-base">
								A quick overview of how I built it{' '}
								<span role="img" aria-label="rocket">
									🚀
								</span>
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

export default Blog
