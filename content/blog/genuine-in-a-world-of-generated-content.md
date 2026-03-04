---
title: Genuine in a World of Generated Content
date: March 5, 2026
tags: Personal, AI
---

******

*🇼🇸 Talofa! O lo'u igoa o Tausani Ah Chong, e sau mai le nu'u o Puipa'a ma Avao*

*📍 Central Tāmaki Makaurau, Aotearoa*

*💼 Intermediate Software Developer @ Vector ⚡️*

*👨‍👩‍👧‍👦 Proud dad of 2 kids*

*📝 Post #3 - Posting every week until my birthday in April 🎂*

******

*Follow me on Instagram! [**@tausani.376**](https://www.instagram.com/tausani.376)*

*GitHub: [https://github.com/tausani-ah-chong](https://github.com/tausani-ah-chong)*

******

Ok I kind of lied to you in my [previous post](/blog/tdd-or-just-tests) and I apologise. So I thought you know writing these posts would be a breeze now because there are many AI tools to help you write (even before we had grammarly). Ok so here we go — my previous post was edited and some parts written by AI.

whoopty doo right? Everything is written or thrown over to AI to improvise these days, but should everything?

## AI, Writing, and What We're Losing

In a world now where we have flooded the internet with AI generated content, we actually lose the humanness. Now yes AI is great for repetitive tasks, and automation. But for writing?

I think this might be one of the few last frontiers, one of the last things we have, to be as genuine as we can online (apart from things like music and livestreamed content).

> **I can honestly say AI didn't write or help edit this for me. You are reading my thoughts directly from me, as raw as they are — you can't get much more human and genuine than that.**

## A Story from Outside My Day Job

A similar thing happened in a role outside of my day job. I want to share a story of mine of when I decided to put my hand up to be Secretary for my kids A'oga Amata (Samoan preschool) committee. And yes it does get more technical later down the post.

I previously had been on as a parent representative, and the former secretary was leaving so there was a gap. I knew taking on the role would be more involved but I just knew I had to step up. I had a few ideas and thought why not and lets use AI to help with the role and tasks

The main tasks are to schedule meetings, and take minutes during those minutes. So I thought lets get AI to help with taking minutes. At my current role for my day job as a Software Engineer we have access to those tools via Microsoft Teams and now with Slack AI tools. They kind of work ok and get the job done. But this time I need to be very careful with what to feed to AI to get back both transcripts and summaries. Privacy and confidentiality would be a big requirement.

## Testing a Local AI Solution

So I thought what about using an AI tool that runs on my local machine and never talks to third party servers.

I researched and ended up finding a [Whisper port](https://github.com/ggerganov/whisper.cpp), based off the O\*\*\*AI (The company who should not be named iykyk) model but ported to C++ for better performance. Did a couple manual tests beforehand with random audio and thought I would try it with a real meeting. So before our meeting, I asked for permission first if I could record and feed into my local AI tool. I then dumped the 1 hour .wav file into the tool and let it do its thing.

I got to test a few different models that you could download that works with the tool and definitely found varying results, some even got stuck in loops. `v3-turbo-q5` ended up giving me the best results. Some were just pretty bad imo

I then tried to get a summary from the transcript and try get some tasks out of it. But I soon realised the quality was pretty bad too and unusable, and missed some pretty important points. Not to the mention the added complexity of Samoan language used throughout the recording.

I could tell off the bat the performance and quality gains are definitely with paid models but you have to live by their rules of stealing and using your data to train etc say bye to your privacy. This exercise got me to question do we really need to use AI for everything? Should you really just offload all tasks for AI improvise?

## Where the Rigor Goes

In this case I came to the conclusion - back to reference the "where does the rigor go?" from my [previous post](/blog/tdd-or-just-tests) here - that it was a lot more accurate and critical if I actually took the effort to decide what and what shouldn't be taken down as minutes.

No one actually goes back to listen to the whole 1 hour meeting or want to read through a full wall of text.

Sure AI can summarise but how do I in the moment say ok at 22minutes 33 seconds take mark this task down as it's important. I may as well just use my pen and take it down right there and then.

> **Intentional.**

Putting intention to actively listen and scribe is a skill in its self, and putting effort and rigor in to making sure important actions are captured is waaaay better than letting AI improvise that. Maybe im a few prompts away from finding the perfect product for my use case - maybe I have to build this myself? Maybe you?

**But to sum up: I think I made a good decision as I can still be intentional, which is where the rigor is. And yes its more effort, but without effort how can you expect to get better and grow in whatever your role is.**

In a world full of generated content, I really do hope genuine content becomes higher impact and accessible. And if you feel you want more raw authentic content please leave a comment, share and follow along the journey.

Ia manuia le aso

---

*Thanks for reading! If you enjoyed this, follow me on Instagram [**@tausani.376**](https://www.instagram.com/tausani.376) and connect with me on LinkedIn [**Tausani Ah Chong**](https://www.linkedin.com/in/tausaniahchong).*

*I'm posting every week until my birthday in April - tune in for the next one!*
