---
title: "Citrine"
description: "A community-first consumer credit card and companion app, built around a Mastercard World Elite product."
date: 2024-01-01
demoURL: "https://apps.apple.com/us/app/citrine-members/id6550923036"
---

A community-first fintech product: a Mastercard World Elite consumer credit card paired with iOS and web apps that handle onboarding, spend, statements, transfers, and rewards. Built the engineering organization and platform from scratch as the founding engineering hire, then scaled the team across mobile, frontend, backend, and data.

The platform stitches together the modern fintech stack: Plaid for bank linking, Experian for credit decisioning, Highnote for card issuance and ledgering, and Stripe for payments. The mobile app is Expo / React Native with a tRPC API behind it, persisted on fintech-compliant cloud infrastructure. Card and spend analytics flow into Snowflake via Highnote's data share, then out to product surfaces and PostHog. Push notifications, white-label support for partner communities, and a Duffel-powered travel booking experience round out the surface area.

**Built with:** TypeScript, Expo, React Native, tRPC, Highnote, Plaid, Stripe, Experian, Snowflake, PostHog
