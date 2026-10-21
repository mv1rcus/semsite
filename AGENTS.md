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
- Result filtering and sorting run locally on loaded prospects; message previews reuse the saved welcome template, and only explicit contact confirmation changes the client's stage.
- Contacted lead markers are stored only in browser localStorage; existing account-owned records remain private and are not exposed to anonymous visitors.
- Client follow-up uses a shared browser-local store for stages, stage dates and next-contact reminders; reminders appear in the panel, never in public demonstration records.
- No-response is a manually set client flag independent of stage history; confirmed client removal only changes the browser-local follow-up store, never public demonstrations or account-owned records.
- The contact agenda derives priorities from due reminders and actual stages, offers editable stage-specific messages, and schedules through the shared follow-up store; copying or opening WhatsApp never changes stages or metrics.
- Client charts aggregate unique clients per metric and period from persisted stage-event history; WhatsApp opens are not proof of sending, and legacy records contribute only their known current-stage date.
- Entry and search share a static abstract SVG background using CSS semantic tokens; avoid WebGL and media downloads on these pages to keep prospecting lightweight.
- Google page tokens are opaque strings validated in the shared search schema and never truncated; rank and deduplicate loaded prospects using observable contact and reputation signals, never conversion probabilities.
- Demonstrations are immutable public business-only records with no access to account-owned leads; browser-local history lists created links and typed public server reads load the share page.
- Generate demonstration sharing URLs through the shared link helper using the active published domain outside localhost, so preview addresses and obsolete domains are never sent to clients.
- Demonstration verification fetches the published share page with a bounded request; when the worker cannot reach its own domain it confirms the record the share page reads. Results live only in browser history and expire after 24h.
- Website concepts use sector-matched illustrative assets and editable client details, never fabricated reviews, opening hours, certifications or services; drafts move from search through sessionStorage.
- Client data lives only in this browser: the panel exports manual CSV/JSON downloads and restores backups by merge, keeping the newest stage date and never losing existing clients; exports are never auto-uploaded anywhere.
- Each share-page view stamps the demonstration's last-opened time server-side; the browser list removes (but never deletes from the database) demos nobody opened in 24h, falling back to creation time, and tells the user which were removed.
