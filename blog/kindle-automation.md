---
title: "My custom Kindle -> Obsidian automation"
date: "Apr 7 2026"
description: "How I automated a clunky part of personal knowledge managment."
tags: ["programming", "zettelkasten"]
---
I created an automation that pulls my highlights from kindle and drops them into my obsidian vault. 
### Why?
When I'm reading, and I see something I'd like to keep track of later, I use the 'highlight' feature on Kindle. The only problem: those highlights turn into a black hole - I never go back and review, I never add my own thoughts. There's essentially no point.

In the past year, I've started using my own flavor of a [Zettelkasten](https://en.wikipedia.org/wiki/Zettelkasten)-like workflow using [Obsidian](https://obsidian.md/) for personal knowledge management. I wanted each passage that I thought was worth highlighting to have its own note.

### The Solution
Amazon doesn't expose an API for kindle highlights - but at read.kindle.com, you can see all highlights

I created a script that:
1. Logs into the kindle web interface using [playwright](https://playwright.dev/)
2. Pulls all the latest highlights, until it encounters one it's seen before
3. Each note is summarized into 5 words or fewer using Llama3.2:1b, running locally on [Ollama](https://ollama.com/)
4. Creates new note files for each highlight. Each note uses the summary generated in step 3 as its title.
5. Notes are synced into my Obsidian vault using [obsidian-headless](https://obsidian.md/help/headless)

### Using a coding agent
I've never used playwright before - my normal workflow would be to read over the documentation, or prompt \[INSERT CLAUDE/CHATGPT/ETC] to understand how to use the library for my use case. This time around, I used Claude code. I still used it in the 'stackoverflow replacement' kind of way at the start, but as I saw how capable it was to make changes, especially in this very small simple codebase, I started doing less direct coding and more just working with the agent to get it done. 

I'd still call myself a bit of a skeptic, but I'll continue to try out coding agents in more use cases to see how capable they really are.

### Takeaways
For now, I'm just running this on my desktop whenever I want to sync. I'm still working through my backlog of highlights - but once I finish that, I'll set this up on a cron job to run once per day. So far, working through my backlog - there have been several "why did I highlight that" items, but some gems that I'm glad I got to rescue from the black hole.

Code is open source and can be found at: [GitHub](https://github.com/sam-baumann/kindle-automation/)