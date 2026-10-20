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
- Entry and search share a static abstract SVG background using CSS semantic tokens; avoid WebGL and media downloads on these pages to keep prospecting lightweight.
- Google page tokens are opaque strings validated in the shared search schema and never truncated; rank and deduplicate loaded prospects using observable contact and reputation signals, never conversion probabilities.
