# Pratheeksha Shaju — Advanced Science Educator Portfolio V2

A responsive GitHub Pages website for `pratheeksha.professionals-cv.in`.

## Highlights
- Redesigned premium portfolio with dark/light theme, responsive mobile menu, scroll progress and SEO metadata.
- **One background welcome video** on the homepage, `welcome.mp4` (10 seconds, H.264/AAC).
- Background video **does not loop** and remains on its last frame when complete.
- Sound-enabled autoplay is requested where browsers permit it. Otherwise, muted autoplay is used and a **Play welcome with sound** control restarts with audio following visitor interaction.
- **No separate profile video**. The old `profile-video.mp4` is intentionally removed; the About section shows Pratheeksha's original photograph.
- Interactive teaching subject explorer, classroom approach, experience details, qualifications, research and contact sections.
- Both original DOCX CV versions are included and downloadable.
- Original Google Analytics measurement ID `G-YC8H32CX1J` and `CNAME` preserved.

## Publish on GitHub Pages
1. Extract the ZIP file.
2. Open the repository hosting `pratheeksha.professionals-cv.in`.
3. Upload all contents of the extracted website folder **to the repository root**, keeping `assets/css`, `assets/js`, and `assets/images` intact.
4. Replace the existing `index.html`, `welcome.mp4`, `CNAME`, and other files as appropriate.
5. **Delete the old `profile-video.mp4` from the repository** after updating: it is not needed by this site.
6. Allow GitHub Pages to deploy, then hard-refresh the website (Ctrl + Shift + R). Check the mobile site as well.

## Technical notes
- Static HTML/CSS/JavaScript; no database, API keys, or framework build required.
- Chrome, Safari and other browsers may block automatic playback **with sound** without prior interaction. This is browser policy, not a website setting. The fallback is designed to keep the background animation working.
- No timed text was added to the video itself. The normal portfolio heading is part of the HTML homepage layout.
- No generated student photographs or unverifiable teaching achievements have been added.

## Files
- `index.html`: Complete semantic website
- `assets/css/site.css`: Theme, components, layouts, responsive breakpoints
- `assets/js/site.js`: Video playback, navigation, tabs, details modal, theme controls
- `assets/images/portrait.webp`: Photo derived from uploaded source image
- `assets/images/welcome-poster.webp`: Poster derived from uploaded source image
- `welcome.mp4`: Original uploaded welcome video, unchanged
- `Pratheeksha_Shaju_CV.docx`: Original designed CV
- `Pratheeksha_Shaju_ATS_CV.docx`: Original ATS CV
- `CNAME`: Existing custom domain
