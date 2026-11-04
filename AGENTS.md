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
- Business analysis runs fully client-side: /analise uses the deterministic local engine (src/lib/business-analysis-local.ts) with only the manually entered data and must never import the AI analysis server function, so opening it cannot use AI credit. The AI path (src/lib/business-analysis.functions.ts) is reserved for the paid Pro version; it still validates input and output with zod, analyses only supplied data and never writes clients or stage metrics.
- Result filtering and sorting run locally on loaded prospects; message previews reuse the saved welcome template, and only explicit contact confirmation changes the client's stage.
- Contacted lead markers are stored only in browser localStorage; existing account-owned records remain private and are not exposed to anonymous visitors.
- Client follow-up uses a shared browser-local store for stages, stage dates and next-contact reminders; reminders appear in the panel, never in public demonstration records.
- No-response is a manually set client flag independent of stage history; confirmed client removal only changes the browser-local follow-up store, never public demonstrations or account-owned records.
- The contact agenda derives priorities from due reminders and actual stages, offers editable stage-specific messages, and schedules through the shared follow-up store; copying or opening WhatsApp never changes stages or metrics.
- Client charts aggregate unique clients per metric and period from persisted stage-event history; WhatsApp opens are not proof of sending, and legacy records contribute only their known current-stage date.
- Chart format only changes presentation: bar/line use event-period series and pie uses unique-client totals per metric, which may overlap and are never represented as conversion rates.
- Entry and search share a static abstract SVG background using CSS semantic tokens; avoid WebGL and media downloads on these pages to keep prospecting lightweight.
- Google page tokens are opaque strings validated in the shared search schema and never truncated; rank and deduplicate loaded prospects using observable contact and reputation signals, never conversion probabilities.
- Demonstrations are immutable public business-only records with no access to account-owned leads; browser-local history lists created links and typed public server reads load the share page.
- Manual demonstration removal requires confirmation and only changes browser-local link history; existing shared pages remain available.
- Generate demonstration sharing URLs through the shared link helper using the active published domain outside localhost, so preview addresses and obsolete domains are never sent to clients.
- Named demonstration URLs encode the complete UUID losslessly in a URL-safe code and include a cosmetic business slug; legacy /demo/:id links remain valid and both routes share the same exact-id query and activity read.
- Demonstration sites expose three interactive views (home, sector catalog, contact); contact forms only prepare WhatsApp messages and never claim delivery, with illustrative content clearly identified.
- Demonstration verification fetches the published share page with a bounded request; when the worker cannot reach its own domain it confirms the record the share page reads. Results live only in browser history and expire after 24h.
- Website concepts use sector-matched illustrative assets and editable client details, never fabricated reviews, opening hours, certifications or services; drafts move from search through sessionStorage.
- Demonstration image overrides live in a browser-safe category photo resolver, independent of catalog and draft rules, so more specific photos also apply to previously shared sites without changing stored records.
- Client data lives only in this browser: the panel exports manual CSV/JSON downloads and restores backups by merge, keeping the newest stage date and never losing existing clients; exports are never auto-uploaded anywhere.
- Each share-page view stamps the demonstration's last-opened time server-side; the browser list removes (but never deletes from the database) demos nobody opened in 24h, falling back to creation time, and tells the user which were removed.
- Paid access = row in verified_profiles; source 'subscription' rows are synced only by the subscriptions trigger from the payments webhook, 'manual' rows are never touched. Why: one badge source for free and paid accounts.
- Search limits and demo creation are enforced server-side (consume_search / am_i_verified); UI gates are UX only. Why: client checks can be bypassed.
- Private account search filters only the rows returned by admin_accounts in the browser; preserve the existing server authorization so search never expands access to account emails.
