# GitHub Pages előkészítés — ellenőrzések

- React + TypeScript + Vite frontend, statikus `dist` kimenettel. Nincs backend vagy külső API-függőség.
- TypeScript és production build sikeres `/` és `/csu-csulok/` base beállítással is.
- Az előtagos production build helyi HTTP-kiszolgálón is tesztelve; ez nem a Vite fejlesztői szervere.
- A logó valamennyi példánya betöltődött `/csu-csulok/logo.jpg` útvonalról.
- A CSS mind a kilenc helyi betűfájlt az előtag alatt hivatkozza.
- A HTML, modulok, CSS, logó és kilenc betűfájl összesen 15 HTTP-ellenőrzése sikeres, minden válasz 200; az assetek nem HTML-fallbacket adtak.
- Böngészőben a betűbetöltés kész állapotú, a logó forgó animációja aktív, a hat görgetéses jelenet létrejön.
- A `#heti-menu` közvetlen hivatkozás az adott repository alatti oldalon működik; pénteki napi menüre váltás ellenőrizve.
- Nincs vízszintes oldaltúlcsordulás az ellenőrzött asztali nézetben. Új böngészőkonzol-hiba nem jelentkezett.
- A csomagolás megengedett fájlok listájából készül, Git-előzmény, `.openai`, `.sites-runtime`, node_modules és `.env` nélkül. Ismert kulcs-, token-, privátkulcs- és hitelesítési URL-mintákra is ellenőrizve; ilyen találat nincs. Ez mintafelismerésen alapuló ellenőrzés, nem általános bizonyíték bármilyen lehetséges titok hiányára.
- A workflow csak `dist` artifactot telepít; titkos érték kézi megadását nem kéri.

**Korlát:** GitHub-repository és csatlakoztatott GitHub-hozzáférés hiányában távoli Actions-futás, tényleges Pages-URL és telefonos HTTPS-próba még nem történt. Ezek a `GITHUB-PAGES.md` útmutató alapján, a repository feltöltése után ellenőrizhetők. A korábbi Sites-oldal publikációját ez az előkészítés nem változtatja meg.
