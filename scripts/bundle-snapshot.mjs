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

// Runtime deps only — commander is the only one needed since we strip
// @inquirer/select usage from setup.js (it uses node:async_hooks and
// node:util styleText which WebContainers don't fully support on mobile)
const RUNTIME_PACKAGES = ['commander']

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

// Patch setup.js to remove @inquirer/select dependency.
// WebContainers on mobile don't fully support node:async_hooks and
// node:util styleText, which @inquirer/select requires.
// Replace with a banner-only version that doesn't need any @inquirer packages.
const commands = snapshot.dist.directory.src.directory.commands.directory

commands['setup.js'].file.contents = `import { Command } from "commander";
import { printBanner } from "../format.js";
export const setupCommand = new Command("setup")
    .description("Display the faalupega welcome banner.")
    .action(() => {
    printBanner();
    console.log("  Samoan Faalupega Lookup Tool — v0.1.0");
    console.log("  Try: village Puipaa, matai Seiuli, --help\\n");
});
`
console.log('  Patched: setup.js (removed @inquirer/select)')

commands['set-version.js'].file.contents = `import { Command } from "commander";
export const setVersionCommand = new Command("set-version")
    .description("Set the default faalupega version (not available in browser).")
    .action(() => {
    console.log("Version selection is not available in the browser tool.");
    console.log("The default version (1930) is used.");
});
`
console.log('  Patched: set-version.js (removed @inquirer/select)')

const output = JSON.stringify(snapshot, null, 2)
writeFileSync(snapshotPath, output)
console.log(`\nWrote bundled snapshot: ${snapshotPath} (${(output.length / 1024).toFixed(0)} KB)`)
