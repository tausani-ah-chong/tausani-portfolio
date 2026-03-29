/* eslint-disable react/display-name */
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'
import { ReactNode, useState, useEffect, useCallback } from 'react'
import { getAllPosts, getPostBySlug } from '../../lib/blog'

interface BlogPostProps {
	title: string
	date: string
	tags: string[]
	content: string
}

const tagColors: Record<string, string> = {
	AI: 'bg-purple-100 text-purple-700',
	ChatGPT: 'bg-green-100 text-green-700',
	Personal: 'bg-blue-100 text-blue-700',
	Career: 'bg-amber-100 text-amber-700',
	Faasamoa: 'bg-teal-100 text-teal-700',
}

const defaultTagColor = 'bg-gray-100 text-gray-700'

interface ChildrenProps {
	children?: ReactNode
}

export default function BlogPost({ title, date, tags, content }: BlogPostProps): JSX.Element {
	const [lightboxSrc, setLightboxSrc] = useState<string | null>(null)

	const closeLightbox = useCallback(() => setLightboxSrc(null), [])

	useEffect((): void | (() => void) => {
		if (!lightboxSrc) return
		const handleKey = (e: KeyboardEvent): void => {
			if (e.key === 'Escape') closeLightbox()
		}
		document.addEventListener('keydown', handleKey)
		return () => document.removeEventListener('keydown', handleKey)
	}, [lightboxSrc, closeLightbox])

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const markdownComponents: Record<string, any> = {
		h1: ({ children }: ChildrenProps) => (
			<h1 className="text-2xl font-bold mt-10 mb-4">{children}</h1>
		),
		h2: ({ children }: ChildrenProps) => (
			<h2 className="text-xl font-bold mt-8 mb-3">{children}</h2>
		),
		h3: ({ children }: ChildrenProps) => (
			<h3 className="text-lg font-bold mt-6 mb-2">{children}</h3>
		),
		p: ({ children }: ChildrenProps) => <p className="mb-4 leading-relaxed">{children}</p>,
		a: ({ href, children }: { href?: string; children?: ReactNode }) => (
			<a
				href={href}
				className="text-blue-600 hover:underline"
				target="_blank"
				rel="noopener noreferrer"
			>
				{children}
			</a>
		),
		ul: ({ children }: ChildrenProps) => (
			<ul className="list-disc pl-6 mb-4 space-y-1">{children}</ul>
		),
		ol: ({ children }: ChildrenProps) => (
			<ol className="list-decimal pl-6 mb-4 space-y-1">{children}</ol>
		),
		li: ({ children }: ChildrenProps) => <li className="leading-relaxed">{children}</li>,
		blockquote: ({ children }: ChildrenProps) => (
			<blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4">
				{children}
			</blockquote>
		),
		code: ({ className, children }: { className?: string; children?: ReactNode }) => {
			if (className?.includes('language-')) {
				return (
					<code className="block bg-gray-100 rounded p-4 text-sm overflow-x-auto mb-4 whitespace-pre">
						{children}
					</code>
				)
			}
			return <code className="bg-gray-100 rounded px-1.5 py-0.5 text-sm">{children}</code>
		},
		pre: ({ children }: ChildrenProps) => <pre className="mb-4">{children}</pre>,
		hr: () => <hr className="my-8 border-gray-200" />,
		img: ({ src, alt }: { src?: string; alt?: string }) => (
			<button
				type="button"
				onClick={() => setLightboxSrc(src || null)}
				className="block w-full my-4 cursor-pointer bg-transparent border-0 p-0"
				aria-label={`View full size: ${alt || 'image'}`}
			>
				<img src={src} alt={alt || ''} className="rounded-lg w-full" loading="lazy" />
			</button>
		),
		strong: ({ children }: ChildrenProps) => <strong className="font-bold">{children}</strong>,
	}

	return (
		<>
			<Head>
				<title>{`${title} | Tausani`}</title>
			</Head>
			<main className="max-w-3xl mx-auto px-8 md:px-16 pt-10 pb-16 text-gray-700 font-sans">
				<div className="flex items-center justify-between">
					<Link href="/" className="text-sm text-gray-500 hover:underline">
						&larr; Back home
					</Link>
					<a
						href="/feed.xml"
						className="text-xs text-orange-500 hover:text-orange-600 font-medium"
						title="RSS Feed"
					>
						RSS
					</a>
				</div>
				<article className="mt-6">
					<h1 className="text-3xl font-bold mb-1">{title}</h1>
					<div className="flex flex-wrap items-center gap-3 mb-8">
						<p className="text-sm text-gray-400">{date}</p>
						{tags.length > 0 && (
							<div className="flex flex-wrap items-center gap-2">
								{tags.map((tag) => (
									<span
										key={tag}
										className={`text-xs font-medium px-2.5 py-1 rounded-full ${
											tagColors[tag] || defaultTagColor
										}`}
									>
										{tag}
									</span>
								))}
							</div>
						)}
					</div>
					<ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]} components={markdownComponents}>
						{content}
					</ReactMarkdown>
				</article>
			</main>
			{lightboxSrc && (
				<div
					className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
					onClick={closeLightbox}
					onKeyDown={(e) => {
						if (e.key === 'Escape') closeLightbox()
					}}
					role="button"
					tabIndex={0}
					aria-label="Close full size image"
				>
					<button
						type="button"
						onClick={closeLightbox}
						className="absolute top-4 right-4 text-white text-3xl font-bold bg-transparent border-0 cursor-pointer z-10 leading-none"
						aria-label="Close full size image"
					>
						&times;
					</button>
					{/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */}
					<img
						src={lightboxSrc}
						alt=""
						className="max-w-full max-h-full object-contain p-4"
						onClick={(e) => e.stopPropagation()}
					/>
				</div>
			)}
		</>
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	const posts = getAllPosts()
	const paths = posts.map((p) => ({ params: { slug: p.slug } }))
	return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const slug = params?.slug as string
	const { title, date, tags, content } = getPostBySlug(slug)
	return { props: { title, date, tags, content } }
}
