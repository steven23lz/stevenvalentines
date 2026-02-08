# Valentine Day Special 💘

A customizable Valentine-themed web page with timeline-based animations, Spotify-style music player, floating balloons, and stunning modern romantic design.

## ✨ Features

- 🎬 GSAP-powered sequential story animation
- 🎵 Beautiful Spotify-style audio player with progress control
- 🖼️ High-quality image display with modern glassmorphism
- 🎨 Modern romantic gradient background with subtle animations
- 🖼️ Easy personalization via single `customize.json` file
- 📱 Fully responsive design (desktop, tablet, mobile)
- 🔁 Replay support without page reload
- 🌙 Dark theme with romantic color palette

## Tech Stack

- HTML5
- CSS3 (Glassmorphism, Gradients, Animations)
- JavaScript (ES6)
- [GSAP TweenMax 1.x](https://cdnjs.com/libraries/gsap)
- BrowserSync (local development)

## Project Structure

```text
.
├── customize.json              # Editable: name, greeting, wish, image
├── index.html                  # Page markup with animation targets
├── script/main.js              # Animation timeline + player logic
├── style/style.css             # Modern romantic styles (571 lines)
├── img/                        # Visual assets (balloons, hearts, etc)
├── song/                       # Background music (MP3)
├── DEPLOYMENT_GUIDE.md         # Free hosting guides
├── NODE_INSTALLATION.md        # Node.js setup help
└── package.json                # Scripts and dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js v14+ ([Download](https://nodejs.org) or see [NODE_INSTALLATION.md](NODE_INSTALLATION.md))

### 1. Clone the repository
```bash
git clone https://github.com/swapniltake1/valentine-day-special.git
cd valentine-day-special
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run locally
```bash
npm start
```
Opens automatically at `http://localhost:7777` with hot-reload.

### 4. Validate code
```bash
npm test
```

## 💑 Customization

### Change names & messages
Edit `customize.json`:
```json
{
  "name": "Your Special One",
  "greetingText": "Hi beautiful! 🌹",
  "wishText": "With all my love...",
  "imagePath": "img/mybaby.jpg"
}
```

### Change the picture
1. Replace image file in `img/` folder
2. Update `imagePath` in `customize.json`
3. Supported formats: JPG, PNG, WebP

### Change the music
1. Replace `song/Star.mp3` with your MP3 file
2. Player controls: Play, Pause, Skip, Volume, Progress

## 🌐 Deploy for Free

**Quick options:**
- **Netlify** (recommended): 2 min setup ⭐
- **Vercel**: Super fast deployments
- **GitHub Pages**: Free with custom domain
- **Firebase Hosting**: Google's platform

👉 **Full guide:** See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

### Quickest Deploy (Netlify)
1. Push code to GitHub
2. Go to https://app.netlify.com
3. Click "New site from Git" → Select repo
4. Deploy! 🎉

Your site goes live instantly at `https://xxx.netlify.app`

## 🎨 Design Features

### Modern Romantic Theme
- **Dark gradient background** with animated overlays
- **Glassmorphism effects** (frosted glass look)
- **Romantic color scheme** (deep purples, soft pinks, warm tones)
- **Smooth animations** and hover effects
- **Professional audio player** inspired by Spotify design

### Responsive Design
- Desktop: Full experience with all animations
- Tablet: Optimized layout
- Mobile: Touch-friendly with adjusted sizing

## 🎵 Audio Player Features

- ⏮ **Previous**: Rewind to start
- ▶ **Play/Pause**: Animated button with glow effect
- ⏭ **Next**: Skip to end
- 🔊 **Volume**: Mute/unmute toggle
- 📊 **Progress Bar**: Visual timeline with hover seek
- ⏱ **Time Display**: Current time and duration

## 📝 Animation Timeline

The animation sequence flows:
1. Greeting appears
2. Personal messages unfold
3. Special moments highlight
4. Image & player section fades in
5. Wish text animates
6. Floating effects and finale
7. Replay button appears

## 🔧 Development

### Hot reload in action
- Edit CSS → Changes appear instantly
- Edit `customize.json` → Reload to see updates
- Edit HTML → Page refreshes automatically

### Testing
```bash
npm test  # Validates JavaScript syntax
```

### Build for production
No build step needed! All files are static.
Deploy entire folder as-is.

## 📱 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers
- ✅ Android/iOS

*Note: Audio autoplay may require user interaction on some browsers.*

## 🆘 Troubleshooting

**Images not showing?**
- Check file path in `customize.json`
- Ensure file exists in `img/` folder
- Use relative paths (no leading `/`)

**Music not playing?**
- Player shows controls but no sound?
- Check browser console for errors
- Click play button (some browsers require user action first)

**npm command not found?**
- Follow [NODE_INSTALLATION.md](NODE_INSTALLATION.md)
- Restart PowerShell/Terminal after install

**Page looks broken?**
- Clear browser cache (Ctrl+Shift+Delete)
- Try different browser
- Check console for JavaScript errors

## 📚 Contributing

Contributions welcome! Feel free to:
- Report issues
- Suggest features
- Submit pull requests

## 📄 License

MIT License - Free to use and modify

---

## 💕 Ready to Share Love?

1. **Customize** your message in `customize.json`
2. **Test locally** with `npm start`
3. **Deploy** using [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
4. **Share** the link with your special someone! 🎉

Made with ❤️ for Valentine's Day
npm test
```

## Contributing

Contributions are welcome. Feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
