# Első fázis — helyi fejlesztési átadás

## Elkészült
- A meglévő React/Vite projekt továbbfejlesztése, új projekt és új függőség nélkül. A csomagolt betűkészletek, arculati színek, logó, dialógus és a meglévő demóételek megmaradtak.
- Egyszerű főoldal, külön `#/etlap` hosszú étlap, kategóriákra ugró kártyák és hivatkozások, mobilmenü, állandó kosárelérés.
- A főoldalon nincs teljes étellista vagy nagy, pinelt ételanimáció. A régi animációs fájlokat megőriztük, de az új belépési pont nem importálja őket.
- Budapest szerinti, hétköznap 08:00–14:00 kiemelt napi menü. Másodpercenkénti állapotfrissítés, visszatéréskor és fókuszváltáskor frissítéssel. Dátumhoz kötött napi menük, lezárt/hamarosan/rendelhető állapotok.
- Alkohol nélküli online kínálat, hétköznapi menük, kilenc választható és egy inaktív demó kiszállítási zóna, díjak és minimumok.
- Kosár mentése, módosítása, törlése/ürítése; lejárt menük blokkolása a kosárban és pénztárban; átvétel, vendégadatok, készpénz vagy bankkártya átvételkor, összesítés, helyi demóbeküldés és visszaigazolás.
- Külön típusok, üzleti logika, adatadapter és központi környezeti konfiguráció. Részletek: `ARCHITECTURE.md`.

## Demó maradt
Minden termék, ár, napi menü és település minta. A képek saját SVG-helyőrzők, nem valódi ételfotók. Elérhetőségek, nyitvatartás, allergének és jogi dokumentumok feltöltés alatt. Nincs valódi rendelés, fizetés, e-mail, személyzeti/adminfelület vagy felhőerőforrás. A vendégadatok csak az adott lap memóriájában élnek, szerverre nem kerülnek.

## Ellenőrzés
- `pnpm test`: 25 sikeres üzleti logikai állítás (időhatárok, DST, hétváltás, díjak, minimum, hibás mennyiség, alkohol kizárása, duplikált tételek, adatvalidáció, rendelési pillanatképek, idempotens ismétlés és lejárt beküldés).
- TypeScript és Vite production build gyökérútvonalon és `/csu-csulok/` alatt.
- Pages-előtagos helyi HTTP-próba: 17 erőforrás (HTML, modulok, CSS, logó, két helyőrző SVG, kilenc betűfájl) 200-as válasszal, asseteknél HTML-fallback nélkül.
- A main ágról letöltött `.github/workflows/deploy.yml` tartalma megőrizve; nincs második, párhuzamos deployment-workflow.
- A böngészővezérlés a Work beállításaiban tiltott volt. Az új felület vizuális, fizikai mobilos és teljes interakciós ellenőrzése **még szükséges**. Ezt nem helyettesítik az üzleti logikai tesztek vagy a build.

## Git és kiadás
Visszaállítható mentési commit: `896acd8`. Helyi fejlesztési ág: `phase-one-ordering-demo`. GitHub main csak olvasásra lett letöltve és összehasonlítva. Nem történt push, deployment, Cloudflare- vagy Supabase-erőforrás létrehozása.

Következő lépés: a helyi felület végigpróbálása (különösen 360 px, házhozszállítás, átvétel, 07:59/08:00 és 13:59/14:00), tulajdonosi tartalom és fotók jóváhagyása, majd külön engedéllyel a demó kiadása. Ezután jöhet a Workers + Supabase szerveroldali rendelésfeldolgozás az architektúradokumentum szerint.
