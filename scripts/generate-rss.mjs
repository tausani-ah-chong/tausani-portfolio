import fs from 'fs'
import path from 'path'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'

const SITE_URL = 'https://tausani.net'
const SITE_TITLE = 'Tausani Ah Chong'
const SITE_DESCRIPTION = 'Personal portfolio and blog by Tausani Ah Chong'

function escapeXml(str) {
	return str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;')
}

function parseFrontmatter(raw, slug) {
	const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
	let title = slug
	let date = ''
	let content = raw

	if (match) {
		const frontmatter = match[1]
		content = match[2]
		const titleMatch = frontmatter.match(/^title:\s*"?(.+?)"?\s*$/m)
		const dateMatch = frontmatter.match(/^date:\s*(.+)$/m)
		if (titleMatch) title = titleMatch[1]
		if (dateMatch) date = dateMatch[1]
	}

	return { slug, title, date, content }
}

function getDescription(content) {
	const lines = content.split('\n')
	const meaningful = lines
		.filter((line) => {
			const trimmed = line.trim()
			if (!trimmed) return false
			if (/^\*{3,}$/.test(trimmed)) return false
			if (/^\*[^*].*\*$/.test(trimmed)) return false
			return true
		})
		.join(' ')
		.replace(/[#*_`[\]()]/g, '')
		.trim()
	return meaningful.length > 200 ? meaningful.slice(0, 200) + '...' : meaningful
}

async function markdownToHtml(markdown) {
	const result = await unified()
		.use(remarkParse)
		.use(remarkGfm)
		.use(remarkBreaks)
		.use(remarkRehype, { allowDangerousHtml: true })
		.use(rehypeStringify, { allowDangerousHtml: true })
		.process(markdown)
	return String(result)
}

function absolutizeUrls(html) {
	return html
		.replace(/(<img\s[^>]*src=")\//g, `$1${SITE_URL}/`)
		.replace(/(<a\s[^>]*href=")\//g, `$1${SITE_URL}/`)
}

function extractFirstImage(content) {
	const match = content.match(/!\[.*?\]\(([^)]+)\)/)
	if (!match) return null
	const src = match[1]
	return src.startsWith('/') ? `${SITE_URL}${src}` : src
}

const blogDir = path.join(process.cwd(), 'content/blog')
const files = fs.readdirSync(blogDir).filter((f) => f.endsWith('.md'))

const posts = files
	.map((f) => {
		const raw = fs.readFileSync(path.join(blogDir, f), 'utf-8')
		return parseFrontmatter(raw, f.replace('.md', ''))
	})
	.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

const items = await Promise.all(
	posts.map(async (post) => {
		const link = `${SITE_URL}/blog/${post.slug}/`
		const pubDate = new Date(post.date).toUTCString()
		const description = escapeXml(getDescription(post.content))
		const rawHtml = await markdownToHtml(post.content)
		const html = absolutizeUrls(rawHtml)
		const firstImage = extractFirstImage(post.content)

		let mediaElements = ''
		if (firstImage) {
			mediaElements = `
      <media:content url="${firstImage}" medium="image"/>
      <media:thumbnail url="${firstImage}"/>`
		}

		return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${link}</link>
      <guid>${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${description}</description>
      <content:encoded><![CDATA[${html}]]></content:encoded>${mediaElements}
    </item>`
	})
)

const itemsStr = items.join('\n')

const lastBuildDate =
	posts.length > 0 ? new Date(posts[0].date).toUTCString() : new Date().toUTCString()

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${SITE_URL}/sani-headshot.jpg</url>
      <title>${escapeXml(SITE_TITLE)}</title>
      <link>${SITE_URL}</link>
    </image>
${itemsStr}
  </channel>
</rss>
`

const outPath = path.join(process.cwd(), 'public/feed.xml')
fs.writeFileSync(outPath, rss, 'utf-8')
console.log(`RSS feed generated: ${outPath} (${posts.length} posts)`)
