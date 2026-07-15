Toteutetaan jalkapalkin pieni Claude Quick Start -linkki, joka avaa dialogin sovelluksen MCP-linkillä ja kopioi-napilla.

### Mitä rakennetaan
1. **Uusi komponentti** `src/components/ClaudeQuickStart.tsx`
   - Käyttää olemassa olevaa shadcn/ui `Dialog`-komponenttia.
   - Näyttää MCP-palvelimen URL:n: `https://<VITE_SUPABASE_PROJECT_ID>.supabase.co/functions/v1/mcp` (rakennetaan build-aikaisesta ympäristömuuttujasta, ei kovakoodattua).
   - Kopioi URL leikepöydälle yhdellä napinpainalluksella.
   - Näyttää 4 vaiheen ohjeen Claudeen liittämiseksi.
2. **Käännökset** `src/contexts/LanguageContext.tsx`
   - Lisätään uudet avaimet suomeksi ja englanniksi: linkin teksti, dialogin otsikko, vaiheiden ohjeet, "Kopioi"-napin teksti, onnistumisviesti.
3. **Jalkapalkin päivitys** `src/components/Footer.tsx`
   - Lisätään hienovarainen linkki "Claude Quick Start" / "Claude Quick Start" olemassa olevien Tietosuoja/Käyttöehdot-linkkien joukkoon.
   - Linkki avaa uuden dialogikomponentin.
4. **Tyyli**
   - Käytetään sovelluksen olemassa olevia väri- ja typografiatokeneita (primary #0A3766, tausta #F0F8FF).
   - Ei uusia riippuvuuksia.

### Tekniset valinnat
- MCP-URL muodostetaan `import.meta.env.VITE_SUPABASE_PROJECT_ID`:stä, jolloin projektin ref ei ole kovakoodattuna koodissa.
- Dialogi toimii vain sovelluksen jalkapalkissa; ei muuta navigointia tai muita sivuja.
- Kopioi-toiminto käyttää `navigator.clipboard.writeText()` ja näyttää toast- tai tekstipalautteen.

### Hyväksyntä
- Build menee läpi.
- Footerista aukeaa dialogi, jossa URL näkyy ja kopioituu leikepöydälle.
- Tekstit vaihtuvat kielen mukaan (FI/EN).