# CSÜ-CSÜLÖK — első fázis

A meglévő alkalmazás továbbfejlesztett, önálló rendelési demója. React, TypeScript, Vite, Tailwind és visszafogott Motion átmenetek. A prémium arculat megmaradt, a nagy görgetésvezérelt animációk nem részei az aktív felületnek.

## Indítás

Node.js 24, a package.json-ban rögzített pnpm-verzió.

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm test
pnpm build
pnpm preview
```

Pages-próba PowerShellben: `$env:VITE_BASE_PATH='/csu-csulok/'`, majd build és preview. Főoldal: `/csu-csulok/`; étlap: `/csu-csulok/#/etlap`. Gyökérútvonalhoz töröld a VITE_BASE_PATH környezeti változót, majd buildelj újra.

## Dokumentáció

- [Átadás és ellenőrzések](PHASE-ONE-REPORT.md)
- [Cloudflare + Supabase integrációs terv](ARCHITECTURE.md)
- [GitHub Pages aktiválás](GITHUB-PAGES.md)

Az aktív alkalmazás a `src/PhaseOneApp.tsx`, a belépési pont `src/main.tsx`. A korábbi App és animációs komponensek megőrzött, inaktív források. A domain és API-réteg külön mappában van. A saját helyőrző SVG-k a public könyvtárban találhatók, a betűk licenceivel együtt.

Nincs valódi rendelésfogadás, e-mail vagy fizetés. Minden étel/ár/zóna demóadat. A régi kosár helyi tárolókulcsa érintetlen, az új kosár csak azonosítókat és mennyiségeket tárol. Vendégadatokat nem mentünk tartósan. Kulcsok és éles felhőerőforrások nem szükségesek a kipróbáláshoz.
