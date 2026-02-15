---
title: Malo lava, let's build with Cursor -- AI Code Editor
date: August 24, 2024
tags: AI
---

******

*🇼🇸 Talofa! O lo’u igoa o Tausani Ah Chong, e sau mai le nu’u o Puipa’a ma Avao*

*📍 Central Tāmaki Makaurau, Aotearoa*

*💼 Intermediate Software Developer @ Vector ⚡️*

*👨‍👩‍👧‍👦 Proud dad of 2 kids*

******

*Follow me on Instagram! [**@tausani.376**](https://www.instagram.com/tausani.376)*

 *GitHub: [https://github.com/tausani-ah-chong](https://github.com/tausani-ah-chong)*

******

# 🇼🇸 Malo le soifua

Growing up in central Aukilagi our family house was in Grey Lynn. In the late 90's, I went to a full immersion (100% samoan speaking) a'oga amata (Pre school) called A'oga Fa'asamoa, located in Ponsonby — The first of its kind in NZ. Opened by the late Papali'i Dr Pita Taouma and wife Jan Taouma

[Read info here!](https://www.thecoconet.tv/coco-docos/pacific-history/island-archives-aoga-faa-samoa/)

Aaaanyways — My 2 kids currently attend the very same A'oga amata, where im also on the Commitee/Board as a Parent rep — My first question in my first Committee meeting was — "Who maintains the school website?"

Ended up finding out that it was a previous committee member Riki Apa who built it and was launched in 2004 — I saw a chance to modernise it 20 years later, as UI and UX hasn't changed since then

**This below is the current website**

[https://www.aogafaasamoa.school.nz/](https://www.aogafaasamoa.school.nz/)

![Screenshot 2024-08-24 at 5.29.39 PM](/blog/malo-lava-lets-build-with-cursor/Screenshot_2024-08-24_at_5.29.39_PM.png)

---

# Tools for the build

So yo, off the bat I wanted to have a jam at trying out [Cursor — The AI Code Editor](https://www.cursor.com/)

I also wanted to have a go at also:

- Hosting on a AWS S3 bucket (I've only ever used Vercel to deploy)
- GitHub Actions to deploy to S3

---

## Cursor (IDE)

Before you start using Cursor, you'll need to configure what models you want to use.

You can sign up to Cursor Pro which has their own features I decided to just roll with the free features

![Screenshot 2024-08-24 at 6.00.49 PM](/blog/malo-lava-lets-build-with-cursor/Screenshot_2024-08-24_at_6.00.49_PM.png)

You need to also supply you api keys

![Screenshot 2024-08-24 at 6.01.18 PM](/blog/malo-lava-lets-build-with-cursor/Screenshot_2024-08-24_at_6.01.18_PM.png)

### Built in chat feature

With Cursor the main feature is you don't have to open up a browser or another app to ask your questions or revise some code. You just can just stay inside your IDE to chat to the model of your choice.

> You can either:
> 1. Chat in-line, with `cmd + K` or
> 2. Open chat panel `cmd + L`

**In-line chat**

![Screenshot 2024-08-24 at 6.16.24 PM](/blog/malo-lava-lets-build-with-cursor/Screenshot_2024-08-24_at_6.16.24_PM.png)

**Chat panel**

![Screenshot 2024-08-24 at 6.17.59 PM](/blog/malo-lava-lets-build-with-cursor/Screenshot_2024-08-24_at_6.17.59_PM.png)

I enjoyed the flow of creating with Cursor, it says it looks through your repo as context so keep that in mind if you decide to work on a repo that has personal or other information you don't want to link back to OpenAI or Anthropic.

Although even though it looked through the whole repo I still had to reply to some generated code and make sure to use tailwind to style for example, I would have expected that I didn't need to do that.

---

## AWS S3

Pretty simple setup, but would be a lot simpler with a tool like Terraform, but for this I configured all in the console.

1. Create S3 bucket
2. Make it public
3. Enable static website hosting
4. Add bucket policy (permissions)

Create your S3 bucket

![create.png](/blog/malo-lava-lets-build-with-cursor/create.png)

Name your S3

Its good to be quite specific

![name-s3.png](/blog/malo-lava-lets-build-with-cursor/name-s3.png)

Un-check `Block all public access`

Check the box that you acknowledge. We will be using for static website hosting.

"AWS recommends that you turn on block all public access, ***unless public access is required for specific and verified use cases such as static website hosting.***"

![public-s3.png](/blog/malo-lava-lets-build-with-cursor/public-s3.png)

In `Properties` tab scroll all the way down

![scroll.png](/blog/malo-lava-lets-build-with-cursor/scroll.png)

Select `Edit` to configure Static website hosting

![edit-static.png](/blog/malo-lava-lets-build-with-cursor/edit-static.png)

Enable `Static website hosting` and check `Host a static website`

You will need to double check the output of the static files from running a `build` command. It might be different per framework.

e.g. using Next

`next build` generates a `/out` dir and populates `/out/index.html` and `/out/404.html` files

![static.png](/blog/malo-lava-lets-build-with-cursor/static.png)

You will now see a URL populate so you can view your website

![static-url.png](/blog/malo-lava-lets-build-with-cursor/static-url.png)

Next go to `Permissions` tab and select `Edit` to configure `Bucket policy`

![edit-policy.png](/blog/malo-lava-lets-build-with-cursor/edit-policy.png)

```json
{
  "Version": "2012-10-17",
  "Id": "Policy1724460713351",
  "Statement": [
    {
      "Sid": "Stmt1724460711669",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:*",
      "Resource": "arn:aws:s3:::<your S3 bucket name>/*"
    }
  ]
}
```

Paste in the above policy.

I ran into getting a `403` from trying to hit the url if you don't do this step.

Now you're all set to upload your code.

I decided to use `GitHub actions` to upload whenever I push to `main`

![paste-policy.png](/blog/malo-lava-lets-build-with-cursor/paste-policy.png)

---

## GitHub Actions

**Simple steps also:**

1. Generate yaml file
2. Add AWS secrets

You could just create a `/<your-app>/.github/workflows/main.yml` file without going through the GitHub website but I'll show anyways

Select `Actions` tab

Select `set up a workflow yourself`

![setup-actions.png](/blog/malo-lava-lets-build-with-cursor/setup-actions.png)

All you need to do is edit the `main.yml`

Run your specific commands to build your app

Run command that will upload all contents from `/out` directory to your S3 and delete other contents beforehand

Make sure you're `AWS_REGION` matches for where you created your bucket

Commit your changes

![yaml.png](/blog/malo-lava-lets-build-with-cursor/yaml.png)

Next you'll need to populate your `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` Repository secrets, so the above GitHub Action will work

You can add in `Settings` tab, clicking on `Actions` under `Secrets and variables`

Now you're setup so any changes merged to `main` will now trigger to upload your artifacts to S3

![Screenshot 2024-08-24 at 7.48.30 PM](/blog/malo-lava-lets-build-with-cursor/Screenshot_2024-08-24_at_7.48.30_PM.png)

---

# Results

So yeah thats me! Keep in mind this was just a quick weekend quest lol so time was limited.

Here are some changes I wanted to focus on for the first cut:

- Make use of full width of screen
- Modernise the font and keep them consistent (There are a few different fonts used in Before)
- Simplify the user experience
  - Much like 90's, 2000's style of making the website so accessible, to the point where there are multiple links and entry points to navigate the website. It ends up clogging up the page and actually confuses the user
  - Im hoping to keep the navigation in a single place at the top, and reduce the amount of information overload for each page

> I may keep expanding on the site, but all in all the main learnings came from the journey of creating:
> - First time using Cursor
> - First time hosting on S3
> - First time using GitHub Actions
>
> Thats the part Im mostly happy about, and anything after is just a bonus

**Make sure to check out both sites below and let me know your thoughts if you enjoyed this!**

**Ia fa**

### Before

[Link to website](https://www.aogafaasamoa.school.nz/)

![Screenshot 2024-08-24 at 5.29.39 PM](/blog/malo-lava-lets-build-with-cursor/Screenshot_2024-08-24_at_5.29.39_PM%201.png)

### After

[Link to website](http://aoga-faasamoa-web-ui-s3.s3-website-ap-southeast-2.amazonaws.com/)

![Screenshot 2024-08-24 at 5.47.15 PM](/blog/malo-lava-lets-build-with-cursor/Screenshot_2024-08-24_at_5.47.15_PM.png)

******

*🇼🇸 Talofa! O lo’u igoa o Tausani Ah Chong, e sau mai le nu’u o Puipa’a ma Avao*

*📍 Central Tāmaki Makaurau, Aotearoa*

*💼 Intermediate Software Developer @ Vector ⚡️*

*👨‍👩‍👧‍👦 Proud dad of 2 kids*

******

*Follow me on Instagram! [**@tausani.376**](https://www.instagram.com/tausani.376)*

 *GitHub: [https://github.com/tausani-ah-chong](https://github.com/tausani-ah-chong)*

******
