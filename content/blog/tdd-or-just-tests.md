---
title: TDD or Just Tests? What I Learned Building a TDD Agent in a Weekend
date: February 22, 2026
tags: AI, TDD
---

Being a parent but also a software engineer learning about AI, the kagamea (clothes washing) doesn't stop, a'e sele 😆, but what I love about folding time is chucking on a podcast. That's when I had my most recent aha moment, the one that made LLMs and agents finally click for me.

## The Aha Moment

The podcast was [The Pragmatic Engineer](https://www.pragmaticengineer.com/) (Gergely Orosz) interviewing Martin Fowler: *"How AI Will Change Software Engineering."*

It's been a hot topic for a minute now, with takes coming from all sides. I take most of it with a grain of salt and try to experiment and play around myself. But Martin Fowler walked through the brief history of programming languages:

> Assembly → Fortran → C → Java → JavaScript → English (LLM prompts)

Then he mentioned two words I'd always overheard but never really stopped to understand: **determinism** vs **non-determinism**. I don't know why I never paused on them before, but hearing it in context, and a quick ChatGPT prompt later, I had my aha moment.

Here's the thing: determinism vs non-determinism has always been a concept in computer science, but it never really landed for me day-to-day. You wrote code, the code did what you told it, and the output was predictable. The compiler wasn't going to surprise you.

But now? Now we have non-deterministic systems, LLMs, directly writing our deterministic code. That tension didn't exist before. Every time Claude Code or Codex generates an implementation, it could produce something slightly different from the last run. Same prompt, different code. That's a new problem, and it's why this distinction suddenly matters to every engineer, not just academics.

## Why You Should Care About Determinism vs Non-Determinism

Non-determinism is where LLMs shine. It's a quality we humans share: same input, and the output can vary each time. It's why ChatGPT, Claude, and other LLMs can sound so human.

But software demands strict determinism: same input → same output, every time. That's how we get predictable, trustworthy behaviour.

When we use tools like Claude Code and Codex, we're trading some of that predictability for speed and output. And when you have critical software that must behave predictably, that trade-off becomes the biggest risk in the room.

## What Levers Can We Pull?

A recent [ThoughtWorks retreat](https://www.thoughtworks.com/content/dam/thoughtworks/documents/report/tw_future%20_of_software_development_retreat_%20key_takeaways.pdf), where Martin Fowler has worked for many years, brought together senior engineering practitioners from major technology companies to confront the questions that matter most as AI transforms software development.

Their full document is worth reading, but the line that piqued my interest was:

> *"Where does the rigor go?"*
> Engineering quality doesn't disappear… it migrates to specs, tests, constraints, and risk management.

I decided I wanted to tackle the **tests** part, specifically with Test-Driven Development (TDD).

## Can TDD Increase Determinism?

This weekend I took Claude Code for a drive to see how much we can influence LLM outputs. Can TDD act as a guardrail that pushes AI-generated code toward more predictable, deterministic behaviour?

I tested four approaches, all given the same prompt:

> *"Please complete this task: A user registration service that validates email, hashes a password, and saves to an in-memory store - split across validator.ts, hasher.ts, userStore.ts, registrationService.ts"*

Here's what happened with each.

---

### 1. Custom TDD Coding Agent

This was the most fun and gave me the most challenge and learnings, not that I manually wrote any of the code, but the rigor was still there.

The agent wraps the Claude API directly and enforces strict red-green-refactor through phase gating: it only transitions between phases based on test outcomes, limits Claude to one `it()` block per turn, and enforces minimum implementation. Coming from a frontend web dev background, I quickly learned you need to treat LLM API responses just like any other API call. Account for failures, non-deterministic output, and what the experience looks like when there isn't a happy path.

It got me thinking: what should the user experience be when you're getting an LLM to do TDD? Should the user be in the driver's seat approving each cycle? Or fully commit and wait for the PR? That question led me to build history and snapshots of files during each cycle, a frame-by-frame replay of the TDD loop that's invaluable for review.

The biggest downside is the lack of full capabilities like directory traversal, things Claude Code handles natively. But it's custom, and with more time you could craft a very focused TDD-style user experience.

![tdd-agent running the red-green-refactor loop](/blog/tdd-or-just-tests/tdd-agent-demo.gif)

**Source code:** [tdd-agent](https://github.com/tausani-ah-chong/tdd-agent)

---

### 2. Claude Code with TDD Hooks

This approach gets the best of both worlds: the power of Claude Code, plus stop gates that enforce TDD before the agent writes implementation code.

We wrote two hooks wired into Claude Code's [PreToolUse and PostToolUse events](https://code.claude.com/docs/en/hooks-guide) that intercept all file writes. The pre-hook blocks any implementation write if a corresponding `.test.ts` file doesn't already exist. The post-hook runs `npm test` after every write. For test files it expects failure (red phase), for implementation files it blocks if tests fail and signals green if they pass.

This creates an enforcement loop that Claude Code shouldn't be allowed to bypass. No test file? No implementation. Blocking happens at the tool level, not the prompt level, making it much harder to avoid. And it works with any codebase or language; just change the test command.

The trade-off: no audit trail or cycle snapshots, and hooks verify test existence and pass/fail state, not test quality.

**Source code:** [tdd-hooks](https://github.com/tausani-ah-chong/tdd-hooks)

---

### 3. Vanilla Claude Code (No TDD)

You guessed it, zero tests written. But in its defence, it stuck to what the prompt asked and wrote all the code in 8 seconds.

The untested code is still professional-looking: SCRYPT hashing, timing-safe comparison, UUID generation, email normalisation, sanitised return objects. But it's all unverifiable without tests and has no regression protection.

---

### 4. Claude Code with a TDD Prompt

This was the most interesting approach, not because it's the best, but because it looked like TDD without actually being TDD.

Tests before files. All tests pass. Clean code. And it produced 29 tests, more than double the 13 from either enforcement approach. But the full suites were written in one batch.

As I watched, the "red" was triggered by missing imports, not failing assertions. This is a subtle but important distinction. Authentic TDD red means: "I have a working implementation, and this new test exposes a behaviour it doesn't yet handle." What happened here was: "The file doesn't exist, so the entire test suite crashes at import." The implementation was then written to make the full batch of tests green in one go.

It was the most pepelo (deceptive) of the results, and the most useful illustration of why "tests exist" ≠ "TDD was followed."

Because the full suite of tests was created upfront, this was closer to Spec-Driven Development (SDD), a legit workflow, but just a different process to red-green-refactor.

---

## So Who Won?

![Comparison of all four TDD approaches across prompt, mechanism, tests generated, coverage, process verification, and audit trail](/blog/tdd-or-just-tests/tdd-cycle.svg)

### The one-`it()`-at-a-time constraint is everything

This is what separates TDD from SDD. The custom agent enforces it explicitly, "add exactly ONE new `it()`." Hooks enforce it implicitly, the post-hook runs tests after each write, so Claude learns to write one test and get it green before writing the next. The prompt-only approach gets the file ordering right but misses the granularity, and that's why it produced 29 tests to the enforcement approaches' 13. More tests, but less discipline. Claude planned the full suite as a spec, then implemented against it in one go.

### Why this matters for non-determinism

The real argument for TDD with AI isn't just about discipline, it's that the one-test-at-a-time constraint forces the LLM to make minimal, testable changes. That reduces the surface area for non-deterministic drift. Instead of generating an entire implementation in one shot (where the model has maximum freedom to vary), TDD pins the model to small, verifiable steps.

Think of it as a spectrum of enforcement strength:

```
No tests          Tests exist (unverified process)       Tests + verified process
    |                          |                                |
 no-hooks              tdd-prompt-only                tdd-hooks / tdd-agent
```

![Side-by-side comparison of test counts and coverage across approaches](/blog/tdd-or-just-tests/tdd-comparison.png)

Without guardrails, the LLM's implementation strategy is entirely non-deterministic. SCRYPT vs SHA256, class vs function, sync vs async are all free choices with no specification to anchor them. With prompt-only TDD, the tests specify behaviour, but the process could vary between runs. With hook or agent enforcement, every step is constrained. The failing test at each phase narrows the next implementation decision, pushing toward convergence across runs.

### When to use what

If you're just vibe-coding a prototype, skip TDD. If you already have a clear mental model of the interface and just want it tested, prompt-only TDD is probably good enough.

But if you have critical software where mistakes are expensive, or complex domain logic where the design needs to emerge test-by-test, that's where enforced TDD pays for itself.

Claude hooks are the practical middle ground. They enforce the process mechanically without requiring developers to trust the model's self-reporting, and they scale to any project without custom infrastructure. With the downside that you're locked in to only using Anthropic models and agents. After a quick search not even Codex has this feature, it was actually a blocked PR from OpenAI.

The core finding in one sentence: **prompt-only TDD gets you a tested codebase; enforced TDD gets you a codebase that was built by tests, and only the enforcement approaches can prove the difference.**

The possibilities are endless if you go full custom agent, which sounds like a viable approach for companies that care about their products.

---

## What I Took Away

At the end of the day, I won, not because I built a better coding agent than Anthropic or OpenAI (one dev and a weekend vs full teams working full-time), but because I got my hands dirty and came out with real learnings. The custom TDD agent flow could genuinely be its own product, with a proper UI and UX for reviewing each TDD cycle. I have more ideas now than I did before I started.

That's the move: stop waiting, start building, and let the experiments teach you.
