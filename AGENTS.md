<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Entry and search are public routes with no account requirement; the search server function is public to support account-free access.
- Contacted lead markers are stored only in browser localStorage; existing account-owned records remain private and are not exposed to anonymous visitors.
- Client follow-up uses a shared browser-local store for stages, stage dates and next-contact reminders; reminders appear in the panel, never in public demonstration records.
- Client charts aggregate unique clients per metric and period from persisted stage-event history; WhatsApp opens are not proof of sending, and legacy records contribute only their known current-stage date.
- Entry and search share a static abstract SVG background using CSS semantic tokens; avoid WebGL and media downloads on these pages to keep prospecting lightweight.
- Google page tokens are opaque strings validated in the shared search schema and never truncated; rank and deduplicate loaded prospects using observable contact and reputation signals, never conversion probabilities.
- Demonstrations are immutable public business-only records with no access to account-owned leads; browser-local history lists created links and typed public server reads load the share page.
- Generate demonstration sharing URLs through the shared link helper using the active published domain outside localhost, so preview addresses and obsolete domains are never sent to clients.
- Website concepts use sector-matched illustrative assets and editable client details, never fabricated reviews, opening hours, certifications or services; drafts move from search through sessionStorage.
