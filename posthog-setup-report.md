<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into eriktaheri.com. PostHog is initialized via a web snippet in `src/components/posthog.astro`, which is included in the shared `Layout.astro` so it loads on every page. The initialization guard (`window.__posthog_initialized`) prevents stack overflow errors during Astro's ClientRouter soft navigation. Pageviews are tracked automatically via `capture_pageview: 'history_change'`. Nine custom events were instrumented across five files covering the newsletter subscription funnel, audio playback engagement, project interest signals, and external link clicks.

| Event | Description | File |
|---|---|---|
| `writing_post_viewed` | User viewed a specific writing post (top of read → subscribe funnel) | `src/pages/writing/[...slug].astro` |
| `newsletter_subscribed` | User submitted the newsletter subscription form in the footer | `src/components/Footer.astro` |
| `audio_playback_started` | User clicked the Listen button to start audio playback on a writing post | `src/components/ListenButton.astro` |
| `audio_playback_completed` | Audio playback finished (reached the end) on a writing post | `src/components/ListenButton.astro` |
| `project_viewed` | User viewed a specific project page (top of project interest funnel) | `src/pages/projects/[...slug].astro` |
| `project_demo_clicked` | User clicked the Demo link on a project page | `src/pages/projects/[...slug].astro` |
| `project_repo_clicked` | User clicked the Repo link on a project page | `src/pages/projects/[...slug].astro` |
| `social_link_clicked` | User clicked a social link in the footer | `src/components/Footer.astro` |
| `links_page_item_clicked` | User clicked an external link on the /links page (Book a Call, Email, etc.) | `src/pages/links.astro` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics dashboard](/dashboard/1567259)
- [Writing post views over time](/insights/Mrs3lacJ)
- [Read-to-subscribe conversion funnel](/insights/oxEOhhdT)
- [Project engagement](/insights/3jZbvvFq)
- [Audio playback engagement](/insights/TLjPgOWd)
- [Links page external clicks](/insights/CvVGMe6t)

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
