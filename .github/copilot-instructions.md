# Copilot Instructions: Valentine Day Special

## Project Overview
A customizable Valentine-themed animated landing page. The app loads personalization data from `customize.json`, orchestrates CSS/GSAP animations via a linear timeline, and plays background music. No backend—everything is client-side with BrowserSync for local dev.

## Architecture & Data Flow

### Customization Layer
- **Single source of truth**: [customize.json](customize.json) contains `name`, `greetingText`, `wishText`, `imagePath`
- **Injection pattern**: `applyCustomization()` in [script/main.js](script/main.js#L144) maps JSON keys to DOM element IDs
- **Error handling**: fetch errors log to console; missing keys silently skip (no breaking)

### Animation System (GSAP TimelineMax)
- **Entry point**: `animationTimeline()` creates a `TimelineMax` instance that chains 25+ tweens
- **Key techniques**:
  - `buildCharacterSpans()`: Wraps each character in `<span>` for staggered animations
  - Timeline labels like `"party"` enable simultaneous animations (`"+=0.7"` offsets, `-=1` overlaps)
  - `staggerFromTo()` for balloon rise animation (1400px → -1000px over 2.5s)
- **Audio playback**: Triggered mid-timeline via `.call()` callback; uses try-catch for autoplay restrictions
- **Replay**: #replay button element restarts timeline via `.restart()`

### Page Lifecycle
1. `initializePage()` → `fetchData()` → `applyCustomization()` → `animationTimeline()`
2. DOM must have all animation targets (`.one`, `.two`, `.idea-1`..`.idea-6`, `.baloons`, etc.) before timeline executes

## Development Workflow

### Start Local Dev
```bash
npm start
```
On Windows: launches Firefox Developer Edition (hardcoded in package.json) with BrowserSync on port 7777. BrowserSync watches `**/*.css, **/*.html, **/*.js` (excluding node_modules).

### Validate Changes
```bash
npm test  # runs: node --check script/main.js
```
Catches syntax errors in JavaScript before deployment.

### Add Dependencies
- Modify `devDependencies` in package.json (only dev tools: browser-sync, run-script-os)
- GSAP 1.x loaded via CDN in [index.html](index.html#L119)—do NOT npm-install GSAP

## Customization Patterns

### Adding New Text Fields
1. Add key to [customize.json](customize.json)
2. Add element with matching `id` to [index.html](index.html) (e.g., `<span id="newField">default</span>`)
3. `applyCustomization()` auto-populates via `element.textContent = value`

### Adding Image Fields
- Set `imagePath` in customize.json; `applyCustomization()` detects key name and uses `.setAttribute("src", value)`
- Example: [imagePath → #imagePath element](index.html#L78)

### Audio Customization
- Replace `./song/Star.mp3` in [index.html](index.html#L79) with your file path
- Timeline triggers playback at ~90% through animation sequence

## CSS Architecture
- [style/style.css](style/style.css): Flexbox-based responsive layout; 313 lines total
- Animation targets rely on class selectors (`.one`, `.idea-5`, etc.)—CSS is static styling only, GSAP drives animation
- Media queries handle mobile (<= narrow widths)

## Critical Edge Cases

### Browser Autoplay Policy
- Audio starts `muted` in HTML; timeline unmutes via `audio.muted = false`
- `.play().catch()` silently handles autoplay blocking (user must interact first on some browsers)

### Character Spans Side Effect
- `buildCharacterSpans()` destructively wraps text in spans; calling twice corrupts HTML
- Called only once per pageload in `animationTimeline()`

### Timeline Timing Dependencies
- Later tweens depend on earlier ones completing (chained via `.to()`, `.from()`, `.staggerTo()`)
- Modifying duration early in timeline shifts entire animation sequence; test replay thoroughly

## File Reference Guide
| File | Purpose |
|------|---------|
| [script/main.js](script/main.js) | Core: animation timeline, customization logic, initialization |
| [customize.json](customize.json) | User-editable data: name, greeting, wish text, image path |
| [index.html](index.html) | DOM structure with animation class targets & GSAP script |
| [style/style.css](style/style.css) | Static styling + responsive rules; no animation keyframes |
| [package.json](package.json) | Scripts & dev dependencies (BrowserSync); GSAP via CDN |

## Common Tasks

**Adjust animation speed**: Modify durations in `tl.to()` / `tl.from()` calls (first numeric param after selector)
**Change animation easing**: Edit `ease` properties (e.g., `Elastic.easeOut.config()`, `Expo.easeOut`)
**Reorder animation steps**: Move/copy timeline methods; note label-based sync points
**Test offline**: All assets local except GSAP CDN; dev requires npm start (BrowserSync)
**Deploy**: Static site—serve `index.html` + assets; no build step needed (validate with `npm test`)
