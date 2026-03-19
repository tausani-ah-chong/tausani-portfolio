#!/usr/bin/env node

/**
 * Bundles node_modules from faalupega-cli into the fs-snapshot.json
 * so WebContainers can skip `npm install` at runtime.
 *
 * Usage: node scripts/bundle-snapshot.mjs <path-to-faalupega-cli>
 * Example: node scripts/bundle-snapshot.mjs ../faalupega-cli
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs'
import { join, resolve } from 'path'

const cliDir = resolve(process.argv[2] || '../faalupega-cli')
const snapshotPath = resolve('public/tools/faalupega/fs-snapshot.json')

// Runtime deps only (transitive deps of @inquirer/select + commander)
const RUNTIME_PACKAGES = [
	'@inquirer/ansi',
	'@inquirer/core',
	'@inquirer/figures',
	'@inquirer/select',
	'@inquirer/type',
	'cli-width',
	'commander',
	'fast-wrap-ansi',
	'fast-string-truncated-width',
	'fast-string-width',
	'mute-stream',
	'signal-exit',
]

function walkDir(dirPath) {
	const tree = {}
	const entries = readdirSync(dirPath)

	for (const entry of entries) {
		const fullPath = join(dirPath, entry)
		const stat = statSync(fullPath)

		if (stat.isDirectory()) {
			tree[entry] = { directory: walkDir(fullPath) }
		} else if (stat.isFile()) {
			try {
				const contents = readFileSync(fullPath, 'utf-8')
				tree[entry] = { file: { contents } }
			} catch {
				// Skip binary/unreadable files
			}
		}
	}

	return tree
}

console.log(`Reading snapshot from ${snapshotPath}`)
const snapshot = JSON.parse(readFileSync(snapshotPath, 'utf-8'))

console.log(`Reading node_modules from ${cliDir}`)
const nodeModulesTree = {}

for (const pkg of RUNTIME_PACKAGES) {
	const parts = pkg.split('/')
	const pkgPath = join(cliDir, 'node_modules', ...parts)

	try {
		statSync(pkgPath)
	} catch {
		console.warn(`  SKIP: ${pkg} not found at ${pkgPath}`)
		continue
	}

	console.log(`  Adding: ${pkg}`)
	const tree = walkDir(pkgPath)

	if (parts.length === 2) {
		// Scoped package like @inquirer/select
		const [scope, name] = parts
		if (!nodeModulesTree[scope]) {
			nodeModulesTree[scope] = { directory: {} }
		}
		nodeModulesTree[scope].directory[name] = { directory: tree }
	} else {
		nodeModulesTree[pkg] = { directory: tree }
	}
}

snapshot['node_modules'] = { directory: nodeModulesTree }

const output = JSON.stringify(snapshot, null, 2)
writeFileSync(snapshotPath, output)
console.log(`\nWrote bundled snapshot: ${snapshotPath} (${(output.length / 1024).toFixed(0)} KB)`)
