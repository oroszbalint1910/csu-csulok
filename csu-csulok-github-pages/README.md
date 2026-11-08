# CSÜ-CSÜLÖK — tulajdonosi bemutató

Magyar nyelvű, reszponzív React + TypeScript + Vite frontend. Tailwind CSS, GSAP / ScrollTrigger, Motion for React és Lucide React használatával.

**GitHub Pages publikálás:** részletes beállítás és aktiválás a [GITHUB-PAGES.md](GITHUB-PAGES.md) fájlban. Az elvégzett ellenőrzések a [PAGES-ELLENORZES.md](PAGES-ELLENORZES.md) fájlban szerepelnek.

## Indítás

Node.js 22+ és pnpm 11 szükséges. A projekt könyvtárában:

```sh
pnpm install
pnpm dev
```

A terminálban megjelenő helyi címet nyisd meg. Production ellenőrzés és build:

```sh
pnpm build
pnpm preview
```

A `build` a TypeScript-ellenőrzést is futtatja. Az elkészült statikus oldal a `dist` könyvtárban található; közvetlen fájlmegnyitás helyett HTTP-kiszolgálóval működik.

## Elkészült funkciók

- Eredeti, aránytartó éttermi logó; sötétzöld és rézarany dizájnrendszer.
- Helyben csomagolt Cormorant Garamond és Manrope betűkészletek, magyar karakterekkel.
- Animált hero, rögzített és tömörödő fejléc, aktív navigáció, mobilmenü, vissza a tetejére hivatkozás.
- A hero középpontja az eredeti logó, lassú, 14 másodperces térbeli körbefordulással, finom rézarany terítékrajzzal. Pizza csak az első ételjelenetben jelenik meg.
- Rövidített görgetési jelenetek: az ételanimációk pinelt szakasza asztalon 1,075, mobilon 0,725 képernyőnyi görgetés; a heti jeleneté 1,05 képernyő. Az animációkövetés késése 0,55 másodperc. Ez a korábbi lassú és gyors beállítás közötti tempó.
- Görgetéshez kötött és visszafordítható, pinelt GSAP-jelenetek: külön kiemelt pizzaszelet, hat rétegből összeálló hamburger, gyrostál, stilizált à la carte tálalás, váltakozó hétköznapok, emelkedő italszint.
- Saját, rétegzett SVG-illusztrációk. AI-generált ételfotó nincs a projektben.
- Hétkategóriás étlap, alapból az összes termékkel, kategóriák szerint rendezve. Az „Összes” nézetből egy kattintással külön kategóriára is lehet szűrni. Asztalon két hasábban, mobilon egy folyamatos listában jelenik meg.
- Külön Sütik kategória csokoládétorta-, sajttorta- és almáspite-mintatételekkel. Az itallap sörrel, fehér-, rozé- és vörösborral, barack- és szilvapálinkával is bővült. Valamennyi tétel, változat és ár demóadat; márkák és termelők nincsenek kitalálva.
- Sörös-, boros- és pálinkáspohárból álló, görgetésre megtelő saját bárillusztráció. Hétfőtől péntekig választható napi ajánlatok: naponta egyetlen menü, külön leves- és főételsorral. A napok kattintással és nyílbillentyűkkel is válthatók.
- Kosár hozzáadással, mennyiségmódosítással, törléssel, részösszeggel, localStorage-mentéssel és üres állapottal.
- Billentyűzettel kezelhető, Escape-pel bezárható panelek, fókuszcsapda és fókuszvisszaállítás.
- Rendszerszintű `prefers-reduced-motion` támogatás, statikus ételekkel és pinelés nélkül. A lábléc „Kevesebb mozgás” kapcsolójával is kipróbálható; a rendszer csökkentett mozgását a kapcsoló nem írja felül.

## Tartalom és következő fázis

Az összes étel, ár és napi menü **demóadat**. Az étlap a `src/data/menu.ts`, a heti menü a `src/data/weeklyMenu.ts` fájlban szerkeszthető. A rólunk szöveg jelölt mintaszöveg. A logót a felhasználó biztosította.

A cím, telefonszám, nyitvatartás, közösségi hivatkozások, jogi dokumentumok és valódi éttermi fotók még pótlásra várnak. Ezeknél „Feltöltés alatt” vagy egyértelmű helyőrző szerepel.

A demó **nem továbbít rendelést**. Backend, adatbázis, admin, fizetés, rendelési értesítés, kiszállítás és éles asztalfoglalás a következő fázis része. A kosár az aktuális böngészőben mentődik; más eszközzel nem szinkronizál.

## Felépítés

`src/components` — közös grafikák, kosár, dialógus, mozgásbeállítások.

`src/sections` — hero, ételjelenetek, étlap és heti menü.

`src/data` — cserélhető, típusos ételadatok.

`src/styles.css` — központi színek, tipográfia, térközök, reszponzív és statikus változat.

`public/logo.jpg` — eredeti logó. `public/fonts` — helyi betűkészletek.

A GSAP a görgetéses és belépő animációkat, a Motion a panelek, kategóriaváltások, kosár és gombok interakcióit kezeli. Ugyanazt az elemet nem vezérli egyszerre mindkét könyvtár. A timeline-ok megszűnéskor visszaállnak és felszabadulnak.

## Elvégzett ellenőrzések

- Függőségek telepítése, TypeScript-ellenőrzés és Vite production build.
- Böngészőben: navigáció, kategóriaváltás, napi menü kiválasztása, kosárhoz adás, mennyiségnövelés és -csökkentés, törlés, részösszeg, üres állapot, megőrzés újratöltés után.
- A pizza külön szeletének előre- és visszafelé mozgása; a hamburger lebegő és összeállított állapota.
- Asztali nézet és 360 px szélességű mobilnézet, mobilmenü és mobilkosár. A dokumentum szélessége megegyezett a rendelkezésre álló nézetszélességgel.
- A mozgáscsökkentő kapcsoló eltávolítja a hat pinelt jelenetet, és látható statikus grafikákat ad. Visszakapcsoláskor a hat jelenet újra létrejön.

A tesztek asztali Chromium-alapú böngészőben és emulált mobilméretben készültek; fizikai iOS/Android készülékes ellenőrzés még nem történt.
