# 🔧 Vercel Audio Troubleshooting Guide

## Issue: Sounds work locally but not on Vercel

### Quick Fixes to Try:

#### 1. **Hard Refresh Your Browser** (Most Common Fix)
```
Windows/Linux: Ctrl + Shift + R or Ctrl + F5
Mac: Cmd + Shift + R
```
Browser cache can prevent new audio files from loading.

#### 2. **Check Vercel Deployment Status**
- Go to your Vercel dashboard
- Make sure the latest deployment is complete (green checkmark)
- Wait 1-2 minutes after deployment finishes

#### 3. **Test Audio File URLs Directly**
Open these URLs in your browser (replace `your-app.vercel.app` with your actual domain):

```
https://your-app.vercel.app/assets/background-music.mp3
https://your-app.vercel.app/assets/cricket-ambience-night.mp3
https://your-app.vercel.app/assets/among-us-sound-157106.mp3
https://your-app.vercel.app/assets/dramatic-sting-118943.mp3
https://your-app.vercel.app/assets/among-us-alarme-sabotage-393155.mp3
```

**Expected:** Audio file should download or play
**If 404 Error:** Files aren't being deployed - see "Files Not Deploying" section below

#### 4. **Check Browser Console** (F12)
Look for errors like:
- `Failed to load audio:` - File path or CORS issue
- `NotAllowedError` - Browser autoplay policy (normal, click to play)
- `404 Not Found` - File not deployed to Vercel

### Recent Changes Made:

✅ **Updated `vercel.json`:**
- Added explicit `Content-Type: audio/mpeg` header
- Added CORS headers for cross-origin requests
- Proper caching for audio files

✅ **Added Debug Logging:**
- Console logs when audio loads successfully
- Error messages if audio fails to load
- Check browser console (F12) for these messages

### If Files Aren't Deploying:

#### Check `.gitignore`
Make sure `.gitignore` doesn't exclude `.mp3` files:
```bash
# Run this to check:
git ls-files public/assets/*.mp3
```

**Should show:**
```
public/assets/among-us-alarme-sabotage-393155.mp3
public/assets/among-us-sound-157106.mp3
public/assets/background-music.mp3
public/assets/cricket-ambience-night.mp3
public/assets/dramatic-sting-118943.mp3
```

If files are missing, add them:
```bash
git add public/assets/*.mp3
git commit -m "Add audio files"
git push origin master
```

### Vercel Build Settings:

Make sure your Vercel project settings are:
- **Framework Preset:** Vite
- **Build Command:** `npm run build` or `vite build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

### File Size Limits:

Your audio files are well within Vercel limits:
- Background music: 7.3MB ✅
- All other sounds: < 1MB each ✅
- Vercel limit: 100MB per file ✅

### Browser Autoplay Policy:

Modern browsers block autoplay. This is **NORMAL** behavior:
- ✅ Sounds will play after user clicks anywhere
- ✅ Already handled in the code with `.catch()` handlers
- ✅ Not an error - just browser security

### Testing Checklist:

- [ ] Hard refresh browser (Ctrl+Shift+R)
- [ ] Check Vercel deployment is complete
- [ ] Test audio URLs directly in browser
- [ ] Check browser console for errors (F12)
- [ ] Try in incognito/private window
- [ ] Test on different browser
- [ ] Click anywhere on page to trigger audio

### Still Not Working?

1. **Check Vercel deployment logs:**
   - Go to Vercel dashboard → Your project → Deployments
   - Click on latest deployment → View logs
   - Look for errors during build

2. **Verify files in deployment:**
   - In Vercel dashboard → Deployment → Source
   - Navigate to `public/assets/`
   - Confirm all `.mp3` files are present

3. **Re-deploy from scratch:**
   ```bash
   # In Vercel dashboard:
   # Deployments → Latest → ⋮ Menu → Redeploy
   ```

### What to Check in Browser Console:

**Good signs (audio working):**
```
✓ ambient audio loaded successfully
✓ murder audio loaded successfully
✓ scream audio loaded successfully
✓ sting audio loaded successfully
✓ sabotage audio loaded successfully
✓ theme audio loaded successfully
```

**Bad signs (needs fixing):**
```
✗ Failed to load ambient audio: [error details]
✗ GET https://your-app.vercel.app/assets/audio.mp3 404 (Not Found)
```

---

## Deploy These Latest Fixes:

```bash
git add vercel.json components/IntroAnimation.tsx VERCEL_AUDIO_TROUBLESHOOTING.md
git commit -m "Add audio headers and debug logging for Vercel"
git push origin master
```

Wait 1-2 minutes for Vercel to deploy, then hard refresh your browser!
