---
title: Should You Learn Assembly in 2026?
date: August 17, 2026
tags: Assembly, Docker, Learning, Warriors
---

******

*🇼🇸 Talofa! O lo'u igoa o Tausani Ah Chong, e sau mai le nu'u o Puipa'a ma Avao*

*📍 Central Tāmaki Makaurau, Aotearoa*

*💼 Intermediate Software Developer @ Vector ⚡️*

*👨‍👩‍👧‍👦 Proud dad of 2 kids*

*📝 This is officially post 7/7 (which I missed 😭)*

******

TL:DR;

Im learning assembly, and hit a few roadblocks trying to run programs on my M1, but got it running on my machine
And you can too via my Warriors themed OS: https://hla.tausani.net

![WahsOS home screen](/blog/assembly/home-screen.png)

******

Is it still worth learning about how to write Assembly in 2026? Given the pace and advancement of AI coding agents these days, why should it matter?

I was talking with the CTO of my company about the challenges that I have myself and possibly for others that would be new to join a role like a software engineer. It was around how to balance out learning, all the while claude code can just pump out code.

## What should you learn?

We both agreed that the way you interact now with AI models to create software is a new jump in abstraction layer, everyone knows that.

To that point, if you have expertise in the layer below the abstraction you are working with you will get more leverage. Wherever you are in the abstraction.

So I was suggested to go deeper into the abstractions, via *The Art of Assembly Language, 2nd Edition* by Randall Hyde. 

Here I am trying to see what I can get out of it.

The aim is to start at the CPU level and make my way back up, gathering a good understanding at each level. 

Then the is also the GPU side and CUDA kernels etc but that can be for another time.

## *The Art of Assembly Language, 2nd Edition* by Randall Hyde

My goals for this first session were small on purpose:

- Read the contents to get a broad picture of what the book will be about
- Read the first chapter
- Compile and run a very simple program

So chapter 1 is about the introduction to HLA, High Level Assembly, which is as it suggests a language that sits just above and compiles to low level assembly. It comes with a few libraries and types that you would find in modern languages

I never went to formal education for anything related to computer science, so was actually really cool to read at a simple level the 3 main components and how they interact with each other to run/build software.

1. CPU
2. i/o components (keyboard, mouse etc)
3. Memory

For 3. I haven't quite worked out if it relates to RAM or hard drive

All 3 are communicate to each other via a bus and a register (Still not sure what a register relates to yet)

Cool, then I went to run a program and hit a road block off the bat

## The first roadblock - 80x86 Apples, Silicon Oranges

Ok so in order to run the HLA program, it doesn't run on the latest mac os x.

I have a MacBook Air M1, arm64/Apple Silicon. Whereas HLA targets 80x86 32-bit. so yup first proper hardware roadblock. Can't get any low level than that! That was a cool learning.

So then first instinct was, what about a linux VM, maybe via Docker.

And yup so I went hunting and tried to get an Ubuntu image working and try download HLA and run it

After a bit of back and forth with claude I eventually git it all working

## How to run a HLA program on an Apple Silicon MacBook 🤔

### 1. Start an amd64 Ubuntu container

```bash
docker run --platform linux/amd64 -it --name hla-ubuntu ubuntu:latest /bin/bash
```

### 2. Add the i386 architecture and update

```bash
dpkg --add-architecture i386

apt update
apt install -y wget
```

### 3. Download HLA

```bash
wget https://www.plantation-productions.com/Webster/HighLevelAsm/HLAv2.16/linux64.hla.tar.gz
```

### 4. Install the dependencies and unpack

```bash
apt-get install -y libarchive-tools 2>/dev/null

// I couldn't use tar for some reason
bsdtar -xzf linux64.hla.tar.gz

apt-get install -y binutils

apt-get install -y libc6-dev-i386
```

### 5. Put HLA on the PATH

```bash
export PATH="/usr/hla:$PATH"
```

### 6. Write the program

```bash
cat > sayUpTheWahs.hla <<'EOF'
program sayUpTheWahs;

#include( "stdlib.hhf" )

begin sayUpTheWahs;

  stdout.put( "UP THE WAHS! BABY!", nl );

end sayUpTheWahs;
EOF
```

### 7. Compile and run

```bash
hla sayUpTheWahs.hla

./sayUpTheWahs
```

```
UP THE WAHS! BABY!
```

That felt good, my first HLA program running locally.

But now lets take it a step further and script this into a Dockerfile

## Making it repeatable with a Dockerfile

Doing all of that by hand once is fine. Doing it every time I close a container is not.

```dockerfile
FROM --platform=linux/amd64 ubuntu:latest

RUN dpkg --add-architecture i386

RUN apt-get update && apt-get install -y \
    wget \
    libarchive-tools \
    binutils \
    libc6-dev-i386 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /
RUN wget https://www.plantation-productions.com/Webster/HighLevelAsm/HLAv2.16/linux64.hla.tar.gz \
    && bsdtar -xzf linux64.hla.tar.gz \
    && rm linux64.hla.tar.gz

WORKDIR /root
CMD ["/bin/bash"]
```

Build it and run it:

```bash
docker build -t hla-ubuntu .

docker run --platform linux/amd64 -it --name hla-ubuntu hla-ubuntu
```

And to come back to it later:

```bash
docker start -ai hla-ubuntu
```

Then the same three steps as before:

```bash
export PATH="/usr/hla:$PATH"

cat > sayUpTheWahs.hla <<'EOF'
program sayUpTheWahs;

#include( "stdlib.hhf" )

begin sayUpTheWahs;

  stdout.put( "UP THE WAHS! BABY!", nl );

end sayUpTheWahs;
EOF

hla sayUpTheWahs.hla

./sayUpTheWahs
```

```
UP THE WAHS! BABY!
```

Why not take it a step further, what if I knew how difficult it was just to try run HLA locally, I thought while im studying the rest of the chapter, I vibe code a way to have it run in a browser

This was when I worked on a bit of my creative magic, and you'll be able to see what kind of NRL fan I am. Am I a Wahs bandwagon fan?

## WahsOS - HLA in the browser

**Try it here: https://hla.tausani.net**

All booted with vim and HLA. Network features are all disabled.

Home screen, with a dope wallpaper I gotta say.

![WahsOS home screen](/blog/assembly/home-screen.png)

Custom bootsplash for the premium fans!

![WahsOS bootsplash screen](/blog/assembly/bootsplash.png)

Full screen mode for the tokenmaxxers

![WahsOS running in full-screen mode](/blog/assembly/full-screen.png)


But yeah so now I can move forward with the next few chapters and keep practicing writing HLA programs and you can too!

See you in the next one!

---

*Thanks for reading! If you enjoyed this, follow me on Instagram [**@tausani.376**](https://www.instagram.com/tausani.376) and connect with me on LinkedIn [**Tausani Ah Chong**](https://www.linkedin.com/in/tausaniahchong).*
