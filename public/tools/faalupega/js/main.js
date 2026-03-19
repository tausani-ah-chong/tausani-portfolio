import { WebContainer } from 'https://esm.sh/@webcontainer/api@1.5.1'
import { Terminal } from 'https://esm.sh/@xterm/xterm@5.5.0'
import { FitAddon } from 'https://esm.sh/@xterm/addon-fit@0.10.0'

const statusEl = document.getElementById('status')
const statusText = document.getElementById('status-text')
const terminalEl = document.getElementById('terminal')
const quickCommandsEl = document.getElementById('quick-commands')

let wc = null
let terminal = null
let fitAddon = null
let resolveReadLine = null

function setStatus(msg) {
	statusText.textContent = msg
}

function showTerminal() {
	statusEl.classList.add('hidden')
	terminalEl.classList.add('visible')
	fitAddon.fit()
}

function showError(msg) {
	statusEl.classList.add('hidden')
	terminalEl.classList.add('visible')
	terminal.writeln('\x1b[31m' + msg + '\x1b[0m')
}

function setQuickCommandsVisible(visible) {
	if (quickCommandsEl) {
		quickCommandsEl.classList.toggle('visible', visible)
	}
}

function initTerminal() {
	terminal = new Terminal({
		convertEol: true,
		fontSize: 14,
		fontFamily: "'Menlo', 'Monaco', 'Courier New', monospace",
		theme: {
			background: '#1a1a2e',
			foreground: '#e0e0e0',
			cursor: '#e94560',
			selectionBackground: '#0f3460',
		},
	})
	fitAddon = new FitAddon()
	terminal.loadAddon(fitAddon)
	terminal.open(terminalEl)

	window.addEventListener('resize', () => {
		fitAddon.fit()
	})
}

async function spawnCommand(args) {
	const proc = await wc.spawn('node', ['dist/bin/faalupega.js', ...args])

	proc.output.pipeTo(
		new WritableStream({
			write(chunk) {
				terminal.write(chunk)
			},
		})
	)

	const writer = proc.input.getWriter()
	const onData = terminal.onData((data) => {
		writer.write(data)
	})

	const exitCode = await proc.exit
	onData.dispose()
	return exitCode
}

function submitCommand(argsString) {
	if (!resolveReadLine) return
	terminal.write(argsString)
	terminal.writeln('')
	const resolve = resolveReadLine
	resolveReadLine = null
	resolve(argsString)
}

async function runShell() {
	while (true) {
		terminal.writeln('')
		terminal.writeln(
			'\x1b[90mType a command: village <name>, matai <name>, setup, --help\x1b[0m'
		)
		terminal.write('\x1b[1m$ faalupega \x1b[0m')

		setQuickCommandsVisible(true)
		const input = await readLine()
		setQuickCommandsVisible(false)

		const args = input.trim().split(/\s+/).filter(Boolean)

		if (args.length === 0) continue
		if (args[0] === 'exit' || args[0] === 'quit') {
			terminal.writeln('\x1b[90mGoodbye!\x1b[0m')
			break
		}

		await spawnCommand(args)
	}
}

function readLine() {
	return new Promise((resolve) => {
		let buffer = ''
		resolveReadLine = (value) => {
			onData.dispose()
			resolveReadLine = null
			resolve(value)
		}
		const onData = terminal.onData((data) => {
			if (data === '\r' || data === '\n') {
				terminal.writeln('')
				onData.dispose()
				resolveReadLine = null
				resolve(buffer)
			} else if (data === '\x7f' || data === '\b') {
				if (buffer.length > 0) {
					buffer = buffer.slice(0, -1)
					terminal.write('\b \b')
				}
			} else if (data >= ' ') {
				buffer += data
				terminal.write(data)
			}
		})
	})
}

function initQuickCommands() {
	if (!quickCommandsEl) return
	quickCommandsEl.addEventListener('click', (e) => {
		const btn = e.target.closest('button[data-args]')
		if (!btn) return
		submitCommand(btn.dataset.args)
	})
}

async function boot() {
	if (typeof SharedArrayBuffer === 'undefined') {
		showError(
			'SharedArrayBuffer is not available. This page requires cross-origin isolation headers (COEP/COOP). If running locally, use "npm run build && npm start" instead of "npm run dev".'
		)
		return
	}

	initTerminal()
	initQuickCommands()

	try {
		setStatus('Booting WebContainer...')
		wc = await WebContainer.boot()

		setStatus('Loading CLI filesystem...')
		const snapshot = await fetch('fs-snapshot.json').then((r) => r.json())
		await wc.mount(snapshot)

		showTerminal()
		terminal.writeln('\x1b[32mReady!\x1b[0m\n')

		// Run setup first to show the faalupega banner
		await spawnCommand(['setup']).catch(() => {})

		// Enter interactive loop
		await runShell()
	} catch (err) {
		showError('Failed to boot: ' + err.message)
	}
}

boot()
