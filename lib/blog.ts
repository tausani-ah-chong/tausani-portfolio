import fs from 'fs'
import path from 'path'

export interface BlogPost {
	slug: string
	title: string
	date: string
	tags: string[]
	content: string
}

function parseFrontmatter(raw: string, slug: string): BlogPost {
	const frontmatterMatch = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
	let title = slug
	let date = ''
	let tags: string[] = []
	let content = raw

	if (frontmatterMatch) {
		const frontmatter = frontmatterMatch[1]
		content = frontmatterMatch[2]
		const titleMatch = frontmatter.match(/^title:\s*"?(.+?)"?\s*$/m)
		const dateMatch = frontmatter.match(/^date:\s*(.+)$/m)
		const tagsMatch = frontmatter.match(/^tags:\s*(.+)$/m)
		if (titleMatch) title = titleMatch[1]
		if (dateMatch) date = dateMatch[1]
		if (tagsMatch) tags = tagsMatch[1].split(',').map((t) => t.trim())
	}

	return { slug, title, date, tags, content }
}

export function getPostBySlug(slug: string): BlogPost {
	const filePath = path.join(process.cwd(), 'content/blog', `${slug}.md`)
	const raw = fs.readFileSync(filePath, 'utf-8')
	return parseFrontmatter(raw, slug)
}

export function getAllPosts(): BlogPost[] {
	const blogDir = path.join(process.cwd(), 'content/blog')
	const files = fs.readdirSync(blogDir).filter((f) => f.endsWith('.md'))
	const posts = files.map((f) => getPostBySlug(f.replace('.md', '')))
	return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}
