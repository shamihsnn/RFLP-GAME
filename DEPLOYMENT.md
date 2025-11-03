# Deployment Guide for RFLP Lab Explorer

## Audio Issues on Vercel - Fixed! ✅

### The Problem
Audio wasn't playing on Vercel deployment due to:
1. Incorrect audio file paths in multiple components
2. Browser autoplay restrictions

### The Solution
✅ **Fixed all audio paths**: Changed to `/assets/` directory
✅ **App.tsx**: `/background-music.mp3` → `/assets/background-music.mp3`
✅ **IntroAnimation.tsx**: Fixed all 5 sound effect paths
✅ **Added autoplay handling**: Gracefully handles browser autoplay restrictions
✅ **Click-to-play fallback**: Audio starts on any user click if autoplay is blocked
✅ **Added vercel.json**: Ensures proper static file serving

### Files Changed
- `App.tsx` - Fixed background music path and improved error handling
- `IntroAnimation.tsx` - Fixed all intro animation sound paths
- `vercel.json` - Added for proper asset caching

### Deployment Steps

1. **Commit the changes:**
   ```bash
   git add .
   git commit -m "Fix audio path for Vercel deployment"
   git push origin main
   ```

2. **Vercel will auto-deploy** (if connected to GitHub)
   - Or manually redeploy from Vercel dashboard

3. **Test the audio:**
   - Visit your Vercel URL
   - Click anywhere on the page if audio doesn't start automatically
   - Audio should play once you start the game

### Browser Autoplay Policy
Modern browsers (Chrome, Firefox, Safari) block autoplay until user interaction. This is normal behavior. The game handles this by:
- Attempting autoplay when game starts
- Falling back to click-to-play if blocked
- Showing console message if autoplay prevented

### Troubleshooting

**If audio still doesn't work:**

1. Check browser console (F12) for errors
2. Verify file exists: `https://your-app.vercel.app/assets/background-music.mp3`
3. Check browser allows audio (not muted, no extensions blocking)
4. Try clicking anywhere on the page to trigger audio

**File size note:**
- Current audio file: ~8MB
- This is fine for Vercel (100MB limit per file)
- Consider compressing if load time is slow

### Audio File Location
```
public/
  assets/
    background-music.mp3              ← Background music (7.3MB)
    cricket-ambience-night.mp3        ← Ambient sound (501KB)
    among-us-sound-157106.mp3         ← Murder/scream sound (97KB)
    among-us-alarme-sabotage-393155.mp3 ← Sabotage sound (251KB)
    dramatic-sting-118943.mp3         ← Dramatic sting (51KB)
    steps.jpg                         ← Protocol image
```

This structure ensures Vite/Vercel serves files correctly from `/assets/` path.

### Audio Files Used
**App.tsx (Background Music):**
- `background-music.mp3` - Plays during gameplay

**IntroAnimation.tsx (Intro Scene Sounds):**
- `cricket-ambience-night.mp3` - Ambient night sounds
- `among-us-sound-157106.mp3` - Murder scene and scream
- `dramatic-sting-118943.mp3` - Dramatic sting on victim fall
- `among-us-alarme-sabotage-393155.mp3` - Struggle/attack sound
- `cricket-ambience-night.mp3` - Lab scene theme
