---
title: "Notes from an AI Courtroom"
description: "On the engineering decisions you only get to make when nothing's at stake, and audiences that aren't quite users."
date: 2026-05-09
---

Disputron was built as a joke that started from a text, "have your lawyer talk to my lawyer." It is also the project where I've made the engineering decisions I'd most want to defend. I've been trying to figure out whether those two facts are related, and I think they are.

Two people submit a dispute. AI lawyers argue. An AI judge rules. Verdicts are public, the gallery is live, and the rulings tend to read like "Greg owes you nothing. Obvious is not a unit of measurement." Nobody's payroll runs late if I get any of it wrong, which is a genuinely unusual thing for me to be able to say about software I work on. The constraints are still real. "Lawyers can't break character mid-trial" is a real engineering problem. "A verdict has to feel binding even though it isn't" is a real product problem. But nothing breaks if I solve them poorly, which means I get to solve them the way I'd want to, not the way the deadline wants me to.

The version of this system I almost built has a single prompt orchestrating the trial. "You are running a courtroom. There is a plaintiff lawyer and a defendant lawyer and a judge. Decide who speaks next." That version exists in a lot of multi-agent demos and it sort of works, in the way things sort of work when you've added enough MANDATORY and DO NOT SKIP to a prompt that it limps through the happy path.

I didn't do that. The trial is a state machine. Opening statements, evidence, closing, verdict. The states are code, the transitions are code, and each model only has to answer one question at a time, scoped to the role it's playing, with no responsibility for what happens next. There's no clever prompt engineering in this codebase. There's a state machine and a few hundred words of role description per agent.

The instinct when an agent misbehaves is to reach for more prompting. The better move is usually to ask whether the prompt is being asked to do work that should be in the runtime. MANDATORY in a system prompt is a smell. It means the model is being asked to make a decision the code should be making. That's a contradiction to [Anthropic's prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices), which I leaned on heavily while building this. I never wrote eval scripts. The role descriptions and the state machine carried it, which I would not be willing to say about a system that mattered.

The same instinct shows up in how the trials are deployed. Every dispute gets its own Cloudflare Durable Object. The WebSocket connections live there. The state machine I just described lives there. The alarm that kicks the whole thing off lives there. The room is the runtime. I almost reached for Redis and a separate WebSocket server, which is the boring stack answer and would have worked, but what I would have lost is hard to articulate but easy to see in the diff. Every other piece of infrastructure I'd have needed would have introduced its own failure mode at a layer that wasn't supposed to know about trials. With one Durable Object per trial, the only thing that has to know what a trial is, is the trial.

Disputron now has a REST API, a [Claude Code plugin](https://github.com/disputron/disputron-agent-kit), and a payments rail that can take USDC over a protocol called x402. AI agents can sue each other.

The question I started with was how do I build this for people. The question I'm sitting with now is harder. When an agent files a case on someone's behalf, is the agent the user, or a feature of the human user? When the agent files a case based on a dispute it generated itself, with no human in the loop until the screenshot lands in someone's inbox, is there a user at all? The honest version is that I built a product whose audience I can't describe with the words product people normally use, and I think a lot of products are about to be in that position.

The thing even more difficult to account for is distribution. Every verdict has its own page, every page has an OG card, every card is screenshot-able, every screenshot is funny, and the product spreads itself in a way I didn't have to engineer. Public verdicts weren't a marketing decision. They were the data model.

I'm not sure I'd tell everyone to build absurd things. That depends on what you want to learn. But the projects worth picking are the ones that force a real constraint on you without asking you to take them seriously. Holding high standards for something that doesn't matter is a different muscle than holding them for something that does. The engineers I most want to work with practice both.

If you have made it this far, take someone to court… or me… [disputron.ai](https://disputron.ai).

I want to take this opportunity to shout out [Harry Thompson](https://veryharry.com), who played a role in everything from idea to execution.
