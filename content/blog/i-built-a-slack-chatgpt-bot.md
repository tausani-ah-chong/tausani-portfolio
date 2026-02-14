---
title: 🤖 I built a Slack ChatGPT Bot
date: March 23, 2023
tags: ChatGPT, AI
---

****

*Talofa! I’m Tausani, Junior Software Engineer @ [Halter](https://halterhq.com/) shaping the future of dairy farming 🐄*

*I'm a proud dad of 2 👨‍👩‍👧‍👦* 

*Just over 18 months into coding, where I transitioned from a music production background 🎹 to software after a 15-week bootcamp @ [Dev Academy Aotearoa](https://devacademy.co.nz/)*

*In my spare time (Which isn’t much with a small family!) I'm embracing the #BuildInPublic movement.* 

*Always keen to learn and grow!*

****

*Follow me on **Twitter**! [**@tausani93**](https://twitter.com/tausani93)*

*Join the **Pasifika Tech Network discord** using [this form](https://docs.google.com/forms/d/e/1FAIpQLSf-uH02Pawmwkf0FIXHoUdyX_zjJyzhBXNkezZph6lGf3EA8Q/viewform)*

*GitHub: [https://github.com/tausani-ah-chong](https://github.com/tausani-ah-chong)*

****

# Malo le soifua!

This is my first digital garden post - Whoop whoop!

I've been holding back a bit, with my excuse being that I haven't found the right project to build or topic to choose.

Lately I've been inspired by my fellow peers in the **Pasifika Tech Network discord** as we share our new learnings and geek out about all things tech, with a island flavour of course. I've also been inspired by tech twitter raving about ChatGPT and posting about their projects, so I thought it was time I had a go.

Pretty much in this post, I'll go you through an overview rather than a deep dive of the process of building a Slack ChatGPT bot, and some the challenges and the learnings I gained.

- Repo: [https://github.com/tausani-ah-chong/ask-chatgpt](https://github.com/tausani-ah-chong/ask-chatgpt)
- End result:

![Screenshot 2023-03-22 at 1.15.13 PM](/blog/i-built-a-slack-chatgpt-bot/Screenshot_2023-03-22_at_1.15.13_PM.png)

![Screenshot 2023-03-22 at 1.15.38 PM](/blog/i-built-a-slack-chatgpt-bot/Screenshot_2023-03-22_at_1.15.38_PM.png)

![Screenshot 2023-03-22 at 1.15.49 PM](/blog/i-built-a-slack-chatgpt-bot/Screenshot_2023-03-22_at_1.15.49_PM.png)

### Agenda:

- Set up new Slack App/bot
- Bolt + Slack API for App Mentions and Slash Commands
- OpenAI/ChatGPT API for Completions
- Learnings When Using ChatGPT to Guide You
- Hosting, Security, and Privacy Concerns

---

### Setup new Slack App/bot

To check set up a new Slack app/bot start off by following [this link](https://api.slack.com/apps?new_granular_bot_app=1)

![Screenshot 2023-03-22 at 12.10.43 PM](/blog/i-built-a-slack-chatgpt-bot/Screenshot_2023-03-22_at_12.10.43_PM.png)

Once you're in you'll need to also need to add scopes/permissions so that you can use the App mentions and slash commands:

![Screenshot 2023-03-22 at 12.14.24 PM](/blog/i-built-a-slack-chatgpt-bot/Screenshot_2023-03-22_at_12.14.24_PM.png)

![Screenshot 2023-03-22 at 12.14.49 PM](/blog/i-built-a-slack-chatgpt-bot/Screenshot_2023-03-22_at_12.14.49_PM.png)

---

### Bolt + Slack API for App Mentions and Slash Commands

[Bolt](https://api.slack.com/bolt) is a user-friendly framework developed by Slack that simplifies building Slack apps. Think [ExpressJS](https://expressjs.com/) but with a layer on top for Slack API methods

Now you can enable the App mentions events + create slash command by setting up your URL in 2 places

![Screenshot 2023-03-22 at 12.13.51 PM](/blog/i-built-a-slack-chatgpt-bot/Screenshot_2023-03-22_at_12.13.51_PM.png)

![Screenshot 2023-03-22 at 12.11.09 PM](/blog/i-built-a-slack-chatgpt-bot/Screenshot_2023-03-22_at_12.11.09_PM.png)

![Screenshot 2023-03-22 at 12.12.32 PM](/blog/i-built-a-slack-chatgpt-bot/Screenshot_2023-03-22_at_12.12.32_PM.png)

**A couple things tripped me up here:**

1. Make sure to use `{your-hosted-URL}/slack/events`
   1. I thought I could create any route but turns out it **needs** to end with `/slack/events` for both commands to work. Wasn't clear at all in the docs which took a bit of time trying to debug why I was getting errors
2. You need to verify your App URL
   1. Setting up an event for app mentions also required a specific URL for verification, and the documentation lacked clear examples of the necessary HTTP methods.
   2. You'll need a POST route that returns a `challenge` parameter
3. Don't use Express & Bolt at the same time
   1. I tried to use Express to create my POST route (In my defence ChatGPT imported Express as well as Bolt) i.e. I had Express routes for my POST route and Bolt for my command routes
   2. Instead use the 'ExpressReceiver' method to handle Express-like functionality without importing both Express and Bolt.

![bolt.png](/blog/i-built-a-slack-chatgpt-bot/bolt.png)

From there you can also write your command methods

**Slash command:**

i.e. */ask-chatgpt [question]*

![slasj.png](/blog/i-built-a-slack-chatgpt-bot/slasj.png)

**App mention:**

i.e. *@ask-chatGPT [question]*

![appMention.png](/blog/i-built-a-slack-chatgpt-bot/appMention.png)

---

### OpenAI API for Completions

Once your Slack app is configured you can now we can use the openAI API - [OpenAI API docs](https://platform.openai.com/docs/api-reference/completions).

**One learning here:**

### *Always read the API spec/docs!*

I know it sounds cliche but because I was using ChatGPT to guide me making this I relied on it a bit too much that I didn't read the docs. I made an obvious mistake in hindsight.

ChatGPT gave me an outdated URL which took way too much time for me to debug. I guess that happens when the dataset was from 2022.

*Yup blame ChatGPT not the developer aye*

But hey, it was a good lesson learned. This is why you always need to get your hands dirty, and try build something from scratch.

Anyways heres the code (For the current API spec lol this may change in the future)

![chatGPT-api.png](/blog/i-built-a-slack-chatgpt-bot/chatGPT-api.png)

---

### Learnings When Using ChatGPT to Guide You

So yeah back to blaming ChatGPT (lol im kidding) I think doing this project definitely cemented that AI isn't just ready yet, and our jobs are safe **(for now)**

Be aware of potential **hallucinations** and outdated information. Just use it as a tool. Foundational knowledge is still super important for you to make the best judgement.

Was still a fun way to build software though, definitely will carry on using ChatGPT (I think thats a no brainer) It still helped me get probably 70% of the project built.

Cool explanation about **Hallucinations** with AI:

[https://www.youtube.com/watch?v=6_hjykO03N0](https://www.youtube.com/watch?v=6_hjykO03N0)

---

### Hosting, Security, and Privacy Concerns

I only got it to work properly locally, but I did try host on Vercel but requests kept timing out. My guess is because I was using the Hobby account. But I still need to deep dive further. Maybe you could help me!

I also had to consider privacy and security concerns as I would have needed to store chat data in database on the server. So decided this was a little bit too out of scope for this project.

I just ended up using an in-memory solution to store the chat data

---

### Conclusion

Building the Slack ChatGPT bot was a valuable learning experience, despite the time spent debugging the Slack and ChatGPT APIs. I gained insights into the Bolt framework, Slack API, and ChatGPT API, which will undoubtedly be useful for future projects. I hope that sharing my challenges and learnings can help others working on similar projects or those who are just getting started.

Feel free to check out the repo: [https://github.com/tausani-ah-chong/ask-chatgpt](https://github.com/tausani-ah-chong/ask-chatgpt)

### On a closing note

I want to highlight the amazing **Pasifika Tech Network** community. After sharing a screen recording of my project on the discord server, the head honcho OG said he was "nerd sniped" and built a ChatGPT bot for our discord within the same day. This is a prime example of community and inspiration from peers. I love this community and can't wait to see what we'll achieve together in the future.

---

### 🌱 Want to build your own Digital garden?

Follow this [guide from Gerald Tuimalealiifano](https://geraldtui.super.site/posts/how-to-setup-a-website-using-notion-and-super) who is also part of the dream team on the **Pasifika Tech Network discord**

****

*Follow me on **Twitter**! [**@tausani93**](https://twitter.com/tausani93)*

*Join the **Pasifika Tech Network discord** using [this form](https://docs.google.com/forms/d/e/1FAIpQLSf-uH02Pawmwkf0FIXHoUdyX_zjJyzhBXNkezZph6lGf3EA8Q/viewform)*

*GitHub: [https://github.com/tausani-ah-chong](https://github.com/tausani-ah-chong)*

****
