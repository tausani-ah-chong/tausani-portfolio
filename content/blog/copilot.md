---
title: Building a Coding Agent from Scratch
date: March 29, 2026
tags: AI, Career
---

******

*🇼🇸 Talofa! O lo'u igoa o Tausani Ah Chong, e sau mai le nu'u o Puipa'a ma Avao*

*📍 Central Tāmaki Makaurau, Aotearoa*

*💼 Intermediate Software Developer @ Vector ⚡️*

*👨‍👩‍👧‍👦 Proud dad of 2 kids*

*📝 Post #6 - Posting every week until my birthday in April 🎂*

******

*Follow me on Instagram! [**@tausani.376**](https://www.instagram.com/tausani.376)*

*GitHub: [https://github.com/tausani-ah-chong](https://github.com/tausani-ah-chong)*

******

# Enterprise barriers? Hold my beer 🍺

## The constraint that I just couldn't shake

No api. No cli. No agentic tooling.

That's the reality of working with M365 Copilot.

My cmd+c, cmd+v has never been faster 😅 up until last week though 👀👀

I finally cracked it.

I don't even remember when the idea popped in my head and I went and tried it and yup this was ***"the last ingredient I needed to make this work"***

I'm very, very close to closing the loop and making M365 Copilot fully agentic.

So yeah, I'm building a coding agent from scratch. And it's been the most fun with constant learning.

I've already spent my small career learning to build apps, now it's time to learn to build the thing that builds the thing.

Here it is in action:

![Agent in action](/blog/copilot/in-action.gif)

![Agent in action screenshot 1](/blog/copilot/in-action-1.png)

![Agent in action screenshot 2](/blog/copilot/in-action-2.png)

## Non agentic development flow

Let's take a look at what the current flow for any developer using M365 Copilot looks like:

![Non agentic development flow](/blog/copilot/non-agentic.png)

As you can see, it is very simple and linear.

**User -> M365 Copilot -> copy + paste -> IDE**

Bruz you could even swap out M365 Copilot for Stack Overflow 🫣 See what I mean - it feels old school already.

But hey it works, but we all know it can be a lot better. Read the room.

## Agentic development flow

Below is where we introduce an agentic loop & ***"the last ingredient I needed to make this work"***. This is the very same foundation of tools like Claude Code & Codex:

![Agentic development flow](/blog/copilot/agentic.png)

So a couple new terms to get used to if you are not already familiar:

### Agent loop

Nothing fancy, it's just a while-loop with an AI assistant. 

You start with a task, and the loop ends when the task is complete.

### Tool calling

This part is fire 🔥

You tell the AI assistant you have some tools they can use during the loop. 

Things like reading, editing, searching in files & running bash commands. 

All it has to do is respond by calling the tool of choice. The loop returns back to the AI assistant the output of these tools. 

From here an automated copy + paste loop is born.

You will notice if you use Claude on the web you can pick the built-in tool to browse the web.

### Human-on-the-loop

There's a reason they called something YOLO mode for coding agents. To give full confidence and permission to control your machine 😬

Or you can sit in the driver's seat and approve tool calls, steering the ship.

There are tradeoffs but it's better to lean on smart defaults. 

The loop will pause until human approval of tool calls.

### Example of my read_file tool:

![Example of a tool](/blog/copilot/example-tool.png)

## The build

Enterprise barriers? Hold my beer 🍺 (Shoutout to my toko Tino for giving me this feedback on this project)

The idea was the easy part.

There was already infrastructure to learn from in terms of foundations of agent loops, TUI and tool calling.

The hardest part was actually parsing the responses from Copilot.

Now please bear in mind this agent is still a young puppy, so it still doesn't work all the time for the range of responses the model returns to us. It is a work in progress.

The part I'm still learning about is the relationship between a model like Anthropic's Opus and agentic tooling like Claude Code.

For example, built into the api to call Claude models is a parameter for a list of tools:

![Claude API example](/blog/copilot/claude-api-example.png)

But because we are using "the last ingredient to make this work" we don't have an api to call.

The limitation is that the only option we have is to send our list of tools as part of our system prompt.

My guess is with the above api calls with tools baked into the api, there is some other mechanism on the other side of the api to manage the way the responses get given back as tool calls.

Models like Opus and Sonnet are trained to return tool calls as first class citizens, whereas with my approach without an api and just purely with a system prompt, all we can do is hope the model responds accordingly.

This is where non determinism could work against us.

Not because the code or system prompt was wrong but purely because my tool calls aren't first class citizens.

Read my previous post about [determinism vs non determinism](/blog/tdd-or-just-tests)

You can see the errors in the screenshots below.

There's been a few times where we can't parse properly and our tool calls don't register even though the response we give to the user looks fine.

It comes down to what is in the full response. Sometimes the tool call is buried within the response.

We'll get there with more iterations and the more I tweak the system prompt maybe? I have a few ideas.

![Tool error screenshot 1](/blog/copilot/tool-error-1.png)

![Tool error screenshot 2](/blog/copilot/tool-error-2.png)

## "the last ingredient to make this work"

There's slang in NZ that gets thrown around whenever you feel let down or led on by someone. You would call someone or something "Build ups".

Where they've hyped something up so much that the hype was more entertaining than the actual reveal 💀 You don't want to be build ups, not even your dad.

So I'm hoping this last ingredient isn't build ups.

Because I know you've read this far, and I thank you, you're the real deal.

So here goes..

My last ingredient...

...

**The ingredient is [Playwright](https://playwright.dev)**

...

All I needed was to automate copying and pasting requests and responses between the loop and M365 Copilot.

With Playwright you can spin up a browser and interact with a web page using code. Simple right?

So there we have it, some of the best ideas come from free rein and no restraints..but lets not forget about even greater ideas that come from restraints.

Enterprise barriers are there for good reason, and I fully agree that enterprises with big contracts and influence should be very critical of any new tech and tooling.

Last question for you:

Was my reveal build ups? 😆 let me know by commenting on my linkedIn post, since you made it this far 🫰

See you in the next one!

---

*Thanks for reading! If you enjoyed this, follow me on Instagram [**@tausani.376**](https://www.instagram.com/tausani.376) and connect with me on LinkedIn [**Tausani Ah Chong**](https://www.linkedin.com/in/tausaniahchong).*

*I'm posting every week until my birthday in April - tune in for the next one!*
