/* eslint-disable react/display-name */
import fs from 'fs'
import path from 'path'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ReactNode } from 'react'

interface BlogPostProps {
	title: string
	date: string
	content: string
}

interface ChildrenProps {
	children?: ReactNode
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const markdownComponents: Record<string, any> = {
	h1: ({ children }: ChildrenProps) => (
		<h1 className="text-2xl font-bold mt-10 mb-4">{children}</h1>
	),
	h2: ({ children }: ChildrenProps) => <h2 className="text-xl font-bold mt-8 mb-3">{children}</h2>,
	h3: ({ children }: ChildrenProps) => <h3 className="text-lg font-bold mt-6 mb-2">{children}</h3>,
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
		<img src={src} alt={alt || ''} className="rounded-lg my-4 w-full" loading="lazy" />
	),
	strong: ({ children }: ChildrenProps) => <strong className="font-bold">{children}</strong>,
}

export default function BlogPost({ title, date, content }: BlogPostProps): JSX.Element {
	return (
		<>
			<Head>
				<title>{title} | Tausani</title>
			</Head>
			<main className="max-w-xl mx-auto px-8 pt-10 pb-16 text-gray-700 font-sans">
				<Link href="/" className="text-sm text-gray-500 hover:underline">
					&larr; Back home
				</Link>
				<article className="mt-6">
					<h1 className="text-3xl font-bold mb-1">{title}</h1>
					<p className="text-sm text-gray-400 mb-8">{date}</p>
					<ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
						{content}
					</ReactMarkdown>
				</article>
			</main>
		</>
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	const blogDir = path.join(process.cwd(), 'content/blog')
	const files = fs.readdirSync(blogDir).filter((f) => f.endsWith('.md'))
	const paths = files.map((f) => ({ params: { slug: f.replace('.md', '') } }))
	return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const slug = params?.slug as string
	const filePath = path.join(process.cwd(), 'content/blog', `${slug}.md`)
	const raw = fs.readFileSync(filePath, 'utf-8')

	const frontmatterMatch = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
	let title = slug
	let date = ''
	let content = raw

	if (frontmatterMatch) {
		const frontmatter = frontmatterMatch[1]
		content = frontmatterMatch[2]
		const titleMatch = frontmatter.match(/^title:\s*"?(.+?)"?\s*$/m)
		const dateMatch = frontmatter.match(/^date:\s*(.+)$/m)
		if (titleMatch) title = titleMatch[1]
		if (dateMatch) date = dateMatch[1]
	}

	return { props: { title, date, content } }
}
