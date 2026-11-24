# Atelier de RazvyDev

Jocuri și experiențe interactive.

## Structură

    index.html              pagina
    css/styles.css          culori, teme, animații
    js/tailwind-config.js   configurarea Tailwind
    js/data.js              lista de experiențe, accente, preferințe implicite
    js/audio.js             sunetele (Web Audio)
    js/preferences.js       temă, accent, font, sunet
    js/collection.js        cardurile, filtrarea
    js/panels.js            panoul de setări, fereastra de detalii
    js/main.js              evenimentele de pornire

Ordinea scripturilor din `index.html` contează: nu o schimba.

## Publicare pe GitHub Pages

1. Creează un repository public pe GitHub.
2. Apasă **Add file → Upload files** și trage conținutul acestui folder (`index.html` trebuie să fie în rădăcină), apoi **Commit changes**.
3. Mergi la **Settings → Pages**.
4. La **Source** alege **Deploy from a branch**, ramura `main`, folderul `/ (root)`, apoi **Save**.
5. După un minut sau două, site-ul apare la `https://UTILIZATOR.github.io/NUME-REPO/`.

## Cum adaugi un joc

Adaugă un obiect nou în `secondaryExperiences` din `js/data.js`.
Cardul principal (Atlas România) este scris direct în `index.html`.
