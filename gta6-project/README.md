# GTA VI Concept Site (Unofficial Fan Project)

A single-page fan-made concept site for GTA VI — hero section with live countdown, world overview, story cards, timeline, platforms, FAQ accordion, and a local-only "notify me" form.

## Structure
```
gta6-project/
├── index.html   Markup
├── styles.css   All styling (tokens/vars, layout, animations, responsive rules)
├── script.js    Mobile nav toggle, countdown timer, FAQ accordion, notify form, parallax
└── README.md
```

## Running it
No build step needed. Just open `index.html` in a browser, or serve the folder locally, e.g.:

```
npx serve .
```
or
```
python3 -m http.server 8000
```

## Notes
- The countdown target date is set in `script.js` (`var target = new Date('2026-11-19T00:00:00');`) — update this if the release date changes.
- The "Notify me" form only saves the email to `localStorage` in the visitor's browser — no server/backend is wired up.
- This is an unofficial, non-commercial fan concept. Not affiliated with Rockstar Games or Take-Two Interactive.
