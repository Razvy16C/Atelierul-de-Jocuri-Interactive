# RazvyDev Atelier

Interactive games and experiences.

## Structure

    index.html              page
    css/styles.css          colors, themes, animations
    js/tailwind-config.js   Tailwind configuration
    js/data.js              experience list, accents, default preferences
    js/audio.js             sounds (Web Audio)
    js/preferences.js       theme, accent, font, sound
    js/collection.js        cards, filtering
    js/panels.js            settings panel, details modal
    js/main.js              startup events

The script order in `index.html` matters; do not change it.

## Publish with GitHub Pages

1. Create a public repository on GitHub.
2. Click **Add file → Upload files** and drag in the contents of this folder (`index.html` must be at the root), then click **Commit changes**.
3. Go to **Settings → Pages**.
4. Under **Source**, choose **Deploy from a branch**, select the `main` branch and `/ (root)` folder, then click **Save**.
5. After a minute or two, the site will be available at `https://USERNAME.github.io/REPOSITORY-NAME/`.

## Add a game

Add a new object to `secondaryExperiences` in `js/data.js`.
The featured card (Atlas Romania) is written directly in `index.html`.
