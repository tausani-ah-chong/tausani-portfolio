import { WebContainer } from 'https://esm.sh/@webcontainer/api@1.5.1'
import { Terminal } from 'https://esm.sh/@xterm/xterm@5.5.0'
import { FitAddon } from 'https://esm.sh/@xterm/addon-fit@0.10.0'

const statusEl = document.getElementById('status')
const statusText = document.getElementById('status-text')
const terminalEl = document.getElementById('terminal')

let wc = null
let terminal = null
let fitAddon = null

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

async function runShell() {
	// After initial command, provide a simple prompt loop
	while (true) {
		terminal.writeln('')
		terminal.writeln(
			'\x1b[90mType a command: village <name>, matai <name>, setup, --help\x1b[0m'
		)
		terminal.write('\x1b[1m$ faalupega \x1b[0m')

		const input = await readLine()
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
		const onData = terminal.onData((data) => {
			if (data === '\r' || data === '\n') {
				terminal.writeln('')
				onData.dispose()
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

async function boot() {
	if (typeof SharedArrayBuffer === 'undefined') {
		showError(
			'SharedArrayBuffer is not available. This page requires cross-origin isolation headers (COEP/COOP). If running locally, use "npm run build && npm start" instead of "npm run dev".'
		)
		return
	}

	initTerminal()

	try {
		setStatus('Booting WebContainer...')
		wc = await WebContainer.boot()

		setStatus('Loading CLI filesystem...')
		const snapshot = await fetch('fs-snapshot.json').then((r) => r.json())
		await wc.mount(snapshot)

		setStatus('Installing dependencies...')
		showTerminal()
		terminal.writeln('Installing dependencies...\n')

		const install = await wc.spawn('npm', ['install'])
		install.output.pipeTo(
			new WritableStream({
				write(chunk) {
					terminal.write(chunk)
				},
			})
		)

		const installExitCode = await install.exit
		if (installExitCode !== 0) {
			terminal.writeln('\n\x1b[31mnpm install failed.\x1b[0m')
			return
		}

		terminal.writeln('\n\x1b[32mReady!\x1b[0m')

		// Run help first to show available commands
		await spawnCommand(['--help']).catch(() => {})

		// Enter interactive loop
		await runShell()
	} catch (err) {
		showError('Failed to boot: ' + err.message)
	}
}

boot()
