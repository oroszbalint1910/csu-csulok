# Publikálás GitHub Pages-re

A csomag a változatlan dizájnú és funkciójú éttermi frontend teljes forrása. A GitHub Pages publikus HTTPS-oldalt ad, amely telefonon is megnyitható és bejelentkezés nélkül megosztható. GitHub Free használatához nyilvános repository szükséges.

## Aktiválás lépésről lépésre

1. A GitHubon hozz létre egy **Public** repositoryt, például `csu-csulok` néven, `main` alapértelmezett ággal.
2. Csomagold ki a mellékelt ZIP-et. A tartalmát tedd a repository gyökerébe: a `package.json`, `vite.config.ts`, `src`, `public`, `pnpm-lock.yaml`, `pnpm-workspace.yaml` és a többi mellékelt konfiguráció közvetlenül ott legyen. Ne egy további almappába töltsd fel.
3. A **.github/workflows/deploy.yml** fájl is kerüljön fel. Ponttal kezdődő mappa, egyes fájlkezelők elrejthetik. Ha a böngészős feltöltés kihagyja, GitHub **Add file → Create new file** segítségével hozd létre ezen a pontos útvonalon, a mellékelt fájl tartalmával.
4. Nyisd meg a repository **Settings → Pages** lapját. A **Build and deployment → Source** mezőben válaszd a **GitHub Actions** lehetőséget.
5. Az **Actions** lapon válaszd a **Deploy to GitHub Pages** workflow-t, majd **Run workflow → main → Run workflow**. Ez akkor is szükséges lehet, ha az első automatikus futás még a Pages aktiválása előtt indult.
6. Várd meg a `build` és `deploy` job zöld állapotát. A kész link a futás `github-pages` környezeténél és a **Settings → Pages** lapon jelenik meg.
7. Nyisd meg a kiírt HTTPS-linket telefonon is. Szokásos projekt-repository esetén a cím `https://FELHASZNALO.github.io/csu-csulok/` lesz. A pontos címet mindig a sikeres futásból másold ki.

Minden további `main` ágra küldött módosítás automatikusan új buildet és telepítést indít. A workflow a `main` ágat figyeli; más nevű ágnál a workflow `branches` mezőjét és a környezet ágkorlátozását is ehhez kell igazítani.

## Base útvonal és fájlok

A `configure-pages` action `base_path` kimenete adja meg az előtagot. Ezt a workflow `VITE_BASE_PATH` néven adja át a Vite-nak. Projektoldalnál `/REPOSITORY/`, felhasználói főoldalnál vagy saját domainnél `/` lesz. Nem kell repositorynevet a forrásba égetni.

A `src/assets.ts` ugyanazt a base-t használja a fejléc, a forgó logó és a lábléc képeihez. A Vite a HTML favicon és a CSS-ben hivatkozott helyi betűkészletek útvonalát is átírja. Az ételgrafikák inline SVG-k. A navigáció `#etlap`, `#heti-menu` és hasonló helyi horgonyokat használ, ezért nincs szükség SPA-fallbackre vagy külön 404-es átirányításra.

A projekt nem használ külső API-t, szervert vagy rendelésküldést. A kosár továbbra is a böngésző localStorage tárolóját használja. A Pages új domainjén a kosár külön tárolódik a korábbi Sites-domain kosarától.

## Helyi próba repository alatti címmel

Node.js 24 és a package.json-ban rögzített pnpm-verzió használatával:

```powershell
pnpm install --frozen-lockfile
$env:VITE_BASE_PATH='/csu-csulok/'
pnpm build
pnpm preview
```

A próbacím `http://127.0.0.1:4173/csu-csulok/`. Más repositorynévvel is ugyanígy tesztelhető. Visszatérés gyökérútvonalhoz: `Remove-Item Env:VITE_BASE_PATH`, majd új build.

## Titkok és telepítési jogosultságok

A csomagba nem kerül Git-előzmény, tárolói hitelesítés, `.openai` kötés, `.sites-runtime`, `.env`, jelszó vagy API-kulcs. Külön GitHub PAT vagy repository secret nem kell: a Pages-telepítés a GitHub által a futáshoz biztosított rövid életű tokennel/OIDC-vel történik. A build csak olvasási jogot kap; a deploy job `pages: write` és `id-token: write` jogot használ. A telepítési artifact kizárólag a `dist` mappa.

A `.gitignore` kizárja a környezeti és kulcsfájlokat; ez a már korábban commitolt titkokat nem távolítja el. Új repositoryhoz a mellékelt tiszta ZIP tartalmát használd, a korábbi munkakönyvtár teljes másolata helyett.

## Ha nem indul

- **Pages nincs engedélyezve:** előbb válaszd ki a GitHub Actions forrást, majd indítsd újra a workflow-t.
- **Workflow tiltva:** Settings → Actions alatt engedélyezd a workflow által használt GitHub és pnpm actionöket; szervezeti korlátozás esetén az adminisztrátornak kell engedélyeznie őket.
- **Deployment ágszabály:** Settings → Environments → github-pages alatt ellenőrizd, hogy a `main` ág telepíthet-e.
- **Üres oldal / hiányzó kép:** a közzétett Pages-linket nyisd meg a repository előtagjával és záró perjellel. Az Actions buildet használd, ne egy korábban más base-szel generált `dist` mappát tölts fel.

Hivatalos leírások: [Vite / GitHub Pages](https://vite.dev/guide/static-deploy.html#github-pages), [GitHub / egyedi Pages-workflow](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

A tényleges GitHub Actions futás és a nyilvános URL csak a repository feltöltése és a Pages aktiválása után ellenőrizhető.
