# Első fázis: önálló rendelési demó

## Rétegek
- `domain/models.ts`: stabil azonosítók, egész forintok, termék- és rendelési típusok, rendeléskori név/ár pillanatképek.
- `domain/ordering.ts`: Budapest-idő, heti dátumok, 08:00–14:00 rendelhetőség, kosárellenőrzés, díj/minimum és vendégadat-validáció.
- `api/restaurant.ts`: lecserélhető `RestaurantApi` adapter. Most csak memóriában fut, nincs hálózati rendelésküldés. A demó újraszámolja a pillanatnyi katalógusból az árakat, friss dátummal ellenőrzi a napi menüt. A korlátozott memóriabeli idempotencia csak demó; nem szerveroldali garancia.
- `data/catalog.ts`: a meglévő demóétlapból képzett online kínálat, alkohol nélkül; dátummal azonosított napi menük, tíz jelölt demózóna (kilenc aktív).
- `PhaseOneApp.tsx`: új főoldali/étlap-kompozíció a meglévő alkalmazáson belül. `#/etlap` és `#/etlap/pizza` hivatkozások Pages-alútvonalon és Cloudflare gyökérútvonalon is működnek. Nem kell szerveroldali SPA rewrite.
- `components/OrderingFlow.tsx`: kosár, átvétel, vendégadatok/fizetési mód, összesítés, helyi demóvisszaigazolás. Személyes adat csak memóriában; localStorage-ba kizárólag termékazonosító és mennyiség kerül új kulcson, a korábbi demókosár érintetlen.
- A régi animációs komponensek megőrzött források, az új belépési pont nem importálja őket. A főoldal nem sorolja fel az összes terméket. Saját SVG-helyőrzők vannak, valódi éttermi/ételfotók szükségesek.

## Következő backendfázis — nincs most bekapcsolva
Cloudflare Pages szolgálja ki a frontendet. A Workers HTTP-adapter implementálja ugyanazt az interfészt; a frontend nem kérdez közvetlenül adatbázist. Supabase PostgreSQL tárolja az adatokat, Auth az adminazonosítást, Storage a képeket.

A Worker a kliens kosárából csak azonosítókat és mennyiségeket fogadjon el, hiteles forrásból számolja újra a termékárakat, elérhetőséget, nyitvatartást, menüidőt, zónát és minimumot. Tranzakcióban tárolja a rendelést és a pillanatképeket. Egyedi idempotenciakulcs + kéréslenyomat + tranzakciós egyediség akadályozza meg a duplikációkat; kliensoldali tiltás nem elegendő. Hibák kapjanak strukturált kódot és kérésazonosítót.

Adminvégpontokon Supabase JWT/jogosultság ellenőrzés szükséges. Publikus szerepek ne olvashassanak rendelési vagy ügyféladatokat. RLS alapértelmezett tiltással, csak szükséges táblákra adott jogokkal. Service role kizárólag Worker secretben, soha VITE-változóban. Storage-feltöltés adminengedélyhez, fájltípus/méretkorláthoz és biztonságos objektumnevekhez kötendő.

Állapotváltások szerveroldali állapotgéppel: awaiting_acceptance → accepted (kötelező vállalt idő) / rejected; accepted → preparing → ready; pickup: ready → completed; delivery: ready → out_for_delivery → completed. Elutasított/teljesített rendelést ne lehessen újraaktiválni. Módosítási verzióval védendők a párhuzamos személyzeti műveletek.

Laptopos értesítés: tartós rendeléstárolás + hitelesített realtime kapcsolat, megszakadáskor polling. Hang csak személyzeti aktiválás után. E-mailhez tranzakciós outbox, egyedi eseményazonosító, napló és korlátozott újrapróbálás kell. Most ilyen kézbesítés vagy személyzeti/admin UI nem készült.

## Környezet és kiadás
`config.ts` központosítja a base és későbbi API-cím beállítását. Az API-cím beállítása önmagában nem kapcsolja élesre a demót. Kulcsot nem kérünk, felhőerőforrás nem jött létre. A GitHub main ágról olvasott `.github/workflows/deploy.yml` változatlan tartalmú. Helyi mentési commit: `896acd8`; fejlesztési ág: `phase-one-ordering-demo`. Nincs push/deploy.

Jogi dokumentumok, valódi nyitvatartás, elérhetőségek, allergének, tényleges kiszállítási terület és jóváhagyott árak az élesítés feltételei. A demó nem ezek pótlása.
