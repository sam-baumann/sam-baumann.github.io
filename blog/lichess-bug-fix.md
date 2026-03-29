---
title: "Fixing a Bug in the Lichess Mobile App"
date: "Mar 29 2026"
description: "How I traced and fixed a regression in Lichess's puzzle streak feature — and learned Flutter along the way."
tags: ["programming", "open-source", "chess"]
---
### Intro

I fixed a small bug in the Lichess mobile app which caused a bugged state in one of the puzzle games. My fix was accepted and is live in the app now. In doing this, I learned flutter, and got to learn and work in a large unfamiliar codebase. 
### What was the bug?

[Puzzle streak](https://lichess.org/streak) is a chess training game on [Lichess](https://lichess.org) which involves solving progressively harder chess puzzles. I started noticing a bug where if I failed on the very first puzzle of the streak, the app would go into a glitched state and I had to back out and re-load the puzzle streak screen. Of course, the 'true' fix here would be to just get the easiest puzzle right every time, but I'm not good enough at chess for that!

I've never worked in a flutter/dart codebase before - so this was a good opportunity to get my feet wet and learn a new environment as well.

### Previous fix/ regression

I started by checking if there was an existing issue for this bug on the project's issue tracker. I found it at [\#1951](https://github.com/lichess-org/mobile/issues/1951), and I found that there had already been a fix for this issue, and the bug I was seeing now was a regression to that fix

### Writing a test

Because there had been a regression, the natural first step was to create a test to ensure the regression didn't happen again after my fix. This was my first entry into the codebase itself, so I started by identifying the relevant source files I'd need to edit: `test/view/puzzle/streak_screen_test.dart` (the test file), and `lib/src/view/puzzle/streak_screen.dart` (the actual puzzle streak source file).

I wrote the test by first writing out in English the steps to reproduce:
1. start puzzle streak
2. Do one correct move
3. Do one wrong move
4. Game over expected
5. Press new streak
6. Your turn text pops up

The key was the last part - in the bugged state, the "your turn" text was part of the expected flow, but it was not appearing. So now I had a failing test that would pass once the issue was fixed.

### The Actual Fix

My next step was understanding what the previous fix was trying to do, and why it was not working correctly.

The previous fix was listening to the state of the puzzle streak \(`puzzleStreakControllerProvider`\) - and explicitly checking for every time the puzzle on the screen changed, and it refreshed the screen if so:

```dart
currentPuzzle.puzzle.id != previousPuzzle.puzzle.id
```

This is a working fix, if and only if the puzzle has changed. If the new puzzle being loaded is the same as the old one, then this check won't fire and the app won't correctly reload the screen.

**Here's where the regression happened**: if you fail a puzzle streak very quickly, the same puzzle sequence gets sent back to the app. This is a behavior at the Lichess server level, not the app.

When I fail on the first puzzle **AND** the new puzzle sequence is the same as the previous one, the `currentPuzzle` and `previousPuzzle` above will have the same ID, so it won't be reloaded from the previous check

I replaced the puzzle equivalence check with a check for the state: if the previous state is finished, and now it's started, always reload the screen. This check is always true when restarting a streak, regardless of puzzle content:

```dart
next.streak.finished == false &&
previous.streak.finished == true
```

My test was passing, and I was ready to submit a PR. The maintainer had some minor comments (in particular, when I wrote the test, I added a 'key' to one of the UI elements so I could have my test automatically press the button. This isn't how they do testing in the project, so I [replaced that key with a UI-based selector](https://github.com/lichess-org/mobile/pull/2452/changes/7466ae63bfb1cd3f3459e15e550c45e59f747767)), I worked with him to get those resolved, and my PR was merged within a few days.
### Summary:

Lichess, to me, is a shining example of the power of open source - a large, polished project that's better than any paid alternatives. I hope to contribute again soon.

I enjoyed learning dart/flutter paradigms, and how they work in a large codebase. I had not used flutter before, but now it's on the short list of frameworks if I'm starting a project. I even used flutter for a small throwaway app at work not long after this.

One other lesson here: writing a test is not just good practice, but can be a good tool to learn a new codebase

The PR can be found here: [\#2452](https://github.com/lichess-org/mobile/pull/2452) for the more technical details
#### AI Disclosure

AI was used in this project to help understand the codebase, but all actual code and contribution was my own, along with all words on this page.