---
title: The Model Just Wants to Use Tools
date: March 13, 2026
tags: AI, Faasamoa
---

******

*🇼🇸 Talofa! O lo'u igoa o Tausani Ah Chong, e sau mai le nu'u o Puipa'a ma Avao*

*📍 Central Tāmaki Makaurau, Aotearoa*

*💼 Intermediate Software Developer @ Vector ⚡️*

*👨‍👩‍👧‍👦 Proud dad of 2 kids*

*📝 Post #4 - Posting every week until my birthday in April 🎂*

******

*Follow me on Instagram! [**@tausani.376**](https://www.instagram.com/tausani.376)*

*GitHub: [https://github.com/tausani-ah-chong](https://github.com/tausani-ah-chong)*

******

> "The model just wants to use tools"

That's the part that stuck out for me from Boris (Creator of Claude Code) from his latest chat with [Gergely Orosz on The Pragmatic Engineer](https://newsletter.pragmaticengineer.com/p/building-claude-code-with-boris-cherny).

This came up after he spoke about what tools or skills you will need to succeed in this new era of agents/AI.

He basically said it's more useful now to understand one level deeper than the current abstraction that you are working at. For example if you were a React developer, one level deeper would be understanding how it works under the hood to get the most gains.

But what does that look like now? Is it frameworks that the model could choose like Next.js or TanStack? Or is it literally understanding how AI models work?

To which Boris decided to study what is going on under the hood for Claude Code, which is the model.

The finding — "The model just wants to use tools" — means don't just put it in a box and let it run. What you should be doing is setting it free and giving it tools to use.

Which led me to thinking ok, let's put this into practice — what tool should I build…

## Introducing… FAALUPEGA CLI 🎉

So you're probably on one of 2 sides. One side you're probably like what is that? And the other side you're like 😬 ooh um are you tackling that?

**What is Faalupega?** It is probably one of the most important records to Samoa apart from the Bible itself. These are records of Samoan chiefly honourifics grouped by village called *O Le Tusi Faalupega o Samoa* or just a Faalupega. Before any records were written (before Samoan was a written language) it was all oral and passed down through generations and is still practiced to this day by master Orators, or we call Tulafale.

There are over 150 villages across Samoa and each with their set of Matai chiefly titles — so we need an easy way to search across villages and matai title names.

And just like the technology upgrade from oral to written to printed books, it is definitely time to adapt to the new era in AI. So it's important that this should be able to be easily used by both AI agents and other technical folks.

There were a few other ideas for tools that came to mind but thought I would go with the most unique and one that will actually help myself, and I'm sure others that are on the same journey as me learning about Faasamoa and Faamatai — the ways of Samoa and chiefly honourifics.

I figured it would be a great research tool and a foundational layer for both technical folks or AI agents to use. We'll get to a nice UI soon — or better yet you could build it using this tool 😉

Also why a CLI? Why not just build a website first? Because anyone can build a website or app, what's missing is the foundation and underlying platform. This CLI will be one of the first building blocks.

## Tradeoffs

I've never built a CLI tool before, and instead of telling you what prompts I used, here are a couple tradeoffs I had to think about.

### 1. Language

It was basically TypeScript/Node vs Rust.

For example OpenAI's Codex was first built with TypeScript/Node but then rewritten in Rust.

**TypeScript:**
- Faster to prototype? (I don't think this is a thing anymore with AI coding agents imho)
- I am already used to reading and understanding the Node & npm world

**Rust:**
- Yeah definitely better performance so they say lol — I've never built anything with Rust
- Apparently builds all the way down to a single binary — which means you only need to download 1 thing
  - As opposed to TypeScript, the user also needs to download Node — although you can package it together now with [Bun](https://bun.com/docs/bundler/executables#cli)

This decision would also influence the next tradeoff…

### 2. Distribution

I come from a web dev background where the only distribution is the browser, so I never needed to think about users needing to access apps I built. I'm just glad I fell into tech after the Internet Explorer era 🤏

Now with a CLI I had to think about different OS's — your Macs, Linux or Windows users. It seems like the way to go is to support all.

### 3. API vs Local Storage

I don't mean local storage from the browser context, but instead in-memory.

Sure I could create an API and store data in a database — this way even more users will be able to access the data.

The downside to in-memory is the size of bundle and also staleness of data. But the upside is I can continue to keep building on the small features and data I currently have.

## The CLI in Action

I wanted to keep the CLI initial features very basic — just a couple text match searches, via village or matai title name. This is the main product: you would usually look up a village to study, or partial match on matai names across villages.

**Search by village:**

```text
$ faalupega nuu pui

┌──────────────┐
│ Version 1930 │
└──────────────┘
════════════════════════════
  PUIPAʻA — Faleata, Upolu
════════════════════════════

Tulouna lau tofa ʻUlu ma lo outou aiga o Seiulialii ma Laufou

MALAE-FONO:
  Lepea — Fono o le manino (filemu)
  Vaitagutu — Fono o le ʻaʻava (taua)

MAOTA O ALII:
  Mataiʻa — Vaiala
  Faumuinā, Letele, Mataʻafa — Lepea
  Seiuli — Vaiusu
  Pepe, Fanene — Falefasa

O IGOA-IPU A ALII:
  Mataiʻa — Tolotūpō
  Faumuinā:
    1. Fai ʻava le ita
    2. Talitigā
    3. Numia ma Tumua
  Seiuli — Seufagafaga
  Le Mataʻafa — Pago talitali le ipu a e taute le Mataʻafa
  Galumalemana — Lagofaatasi
  Letele — Fotualagoataata
  Pepe — Taumailelei
  Fanene — E tapa fua
  Manuʻa — Alo talitali le ipu a e taute le Manuʻalesā
  Latafale — Tamaalii faaea Faleupolu
  Sāvali — Ulugia ma Faleʻafa

SAʻOTAMAʻITAʻI:
  Faumuinā — Letelesā
  Mataiʻa — Latafale
  Seiuli — Tooā
  Pepe, Fanene — Latafale (Safune)
  Leitulua — Muniao
  Une — Tonuu
  Leleua — Ufagafā
  Ale — Tauaiupolu
  ʻUlu — Alofasaupo
```

**Search by matai title name:**

```text
$ faalupega suafa ale

┌──────────────┐
│ Version 1930 │
└──────────────┘
════════════════════════════
  PUIPAʻA — Faleata, Upolu
════════════════════════════

  MAOTA O ALII:
    Pepe, Fanene — Falefasa
  O IGOA-IPU A ALII:
    Galumalemana — Lagofaatasi
    Manuʻa — Alo talitali le ipu a e taute le Manuʻalesā
    Latafale — Tamaalii faaea Faleupolu
    Sāvali — Ulugia ma Faleʻafa
  SAʻOTAMAʻITAʻI:
    Mataiʻa — Latafale
    Pepe, Fanene — Latafale (Safune)
    Ale — Tauaiupolu

═══════════════════════════
  TOAMUA — Faleata, Upolu
═══════════════════════════

  TULOU:
    Tulouna lau tofa Ale ma Inaʻilau na oo i lo outou aiga,
    o Tupalaimuli ma Tauaiupolu, ma le Aoaniu ma le Momoti
```

## Versions and the Source of Truth

Naturally there are parts about the Faalupega in general that are a bit controversial and people take pride (and they should) in the hierarchy and order of the honourifics based on who is most important. There is not one single source of truth. Since the records have been documented there are many versions, and also naturally each village or family may record their own separate Faalupega records.

So this was the next challenge and I hope that in the form of versions, much like how there are many English translations for the Bible, we would need to enforce that in this tool. A user should be able to toggle or search between versions.

And in future I would hope they too can upload their own records alongside the publicly available ones — damn we could make a marketplace 🔥 but the main point is this tool would provide the platform to research regardless of the "correctness" — as that could get me cancelled aye 😬

## What's Next

So yeah go check it out here: [Faalupega CLI on GitHub](https://github.com/tausani-ah-chong/faalupega-cli) — it's all open source. I decided to go with TypeScript/Node for now as we build up features and add more villages to the data set. And may port to Rust eventually.

Next steps is to add more villages! I've got 3 down, 149 to go. I also am in week 3 of my 10 week Faamatai course — getting this up and running will help myself with my homework and hopefully my classmates too.

---

*Thanks for reading! If you enjoyed this, follow me on Instagram [**@tausani.376**](https://www.instagram.com/tausani.376) and connect with me on LinkedIn [**Tausani Ah Chong**](https://www.linkedin.com/in/tausaniahchong).*

*I'm posting every week until my birthday in April - tune in for the next one!*
