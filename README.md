# Cocktail Club PHL

A quarterly cocktail meetup in Philadelphia. Seven seats, a new bar each time, everyone welcome.

The whole site is one static HTML page (~10 KB, with inline CSS and an inline SVG for the QR code). It uses no frameworks and no build step, and it loads no web fonts or images. A small service worker caches it, so the page opens offline after the first visit.

## Files

| File | What it is |
| --- | --- |
| `index.html` | The site |
| `cocktail-club-2027-08.ics` | Calendar invite for the next round |
| `sw.js` | Service worker that handles offline caching |
| `manifest.webmanifest`, `icon.svg` | Lets people install the page on their home screen |

## Running locally

```bash
python3 -m http.server 8000
```

## Each quarter

1. **Seats:** as people Venmo you, add `class="taken"` to one `<i>` inside `.seats` per paid seat. Then update the `0 of 7 taken` text and the `aria-label`.
2. **Archive the last round:** move it into the list in the `#archive` section. A commented example is in the HTML.
3. **New round:** update the `#next` card. Make a new `.ics` file by copying the old one and changing `UID`, `DTSTART`, `DTEND` (in Philadelphia time, `TZID=America/New_York`), and the text. Then update the Google Calendar link's `dates=` (local time; it keeps `ctz=America/New_York`) and the Venmo note.
4. **Bump `VERSION` in `sw.js`** (e.g. `v1` → `v2`), and add any new `.ics` file to `ASSETS`. Returning visitors then get the update.

## Hosting

To publish on GitHub Pages: open Settings → Pages and choose Deploy from branch, root folder. Any other static host works as well.

---

Built with <3 by [helenvholmes](https://helenvholmes.com).
