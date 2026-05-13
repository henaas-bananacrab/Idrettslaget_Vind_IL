# Vind IL Tournament Management System

## Oversikt

Dette er en komplett løsning for Idrettslaget Vind IL som gjør turneringsadministrasjon mer strukturert og mindre manuelt. Systemet lar administratorer registrere lag, deltakere og kontaktpersoner, planlegge kamper, føre resultater og varsle om kamper som nærmer seg. Deltakere kan se kampoppsett og resultater fra ett sted.

## Funksjonalitet

### For Administratorer (Krever innlogging)
- **Lagadministrasjon**: Opprett og administrer lag, legg til/fjern spillere
- **Kampadministrasjon**: Planlegg kamper, registrer resultater og oppdater kamprapporter
- **Kontaktpersoner**: Registrer kontaktperson med navn og telefonnummer for hvert lag
- **Varsling**: Systemet sjekker kamper innen 48 timer og gir varsler når resultater mangler
- **Brukerhåndtering**: Registrer administratorbrukere

### For Deltakere (Offentlig tilgang)
- **Se kampoppsett**: Oversikt over kommende kamper
- **Se resultater**: Resultater fra fullførte kamper
- **Se lag**: Oversikt over lag og spillere
- **Se kontaktinformasjon**: Se lagets ansvarlige kontaktperson

## Teknisk Arkitektur

### Frontend (React)
- **React Router**: Navigasjon mellom sider
- **Context API**: Autentiseringstilstand
- **Axios**: API-kommunikasjon med JWT-autentisering
- **CSS Variables**: Mørk/lys modus-støtte

### Backend (Express.js)
- **REST API**: CRUD-operasjoner for lag, spillere, kamper, brukere og kontaktpersoner
- **JWT-autentisering**: Sikker token-basert autentisering
- **MySQL / MariaDB**: Database for dataoppbevaring

## Brukerflyt

### Første gangs oppsett
1. Start backend-serveren (`npm start` i Vind_api/)
2. Start frontend (`npm run dev` i Vind_front_admin/)
3. Gå til `/register` for å opprette første administratorbruker
4. Logg inn og begynn å registrere lag, spillere og kamper

### Daglig bruk - Administratorer
1. Logg inn
2. Opprett lag og legg til spillere
3. Registrer kontaktpersoner for hvert lag
4. Planlegg kamper og oppdater resultater

### Daglig bruk - Deltakere
1. Besøk hjemmesiden `/`
2. Se kommende kamper på `/kamper`
3. Se lag og spillere på `/lag`
4. Følg resultater i sanntid

## API Endepunkter

### Autentisering
- `POST /api/v1/auth/login` - Brukerinnlogging
- `POST /api/v1/auth/register` - Brukerregistrering

### Lag
- `GET /api/v1/teams` - Hent alle lag
- `POST /api/v1/teams` - Opprett nytt lag
- `DELETE /api/v1/teams/:id` - Slett lag

### Spillere
- `GET /api/v1/teams/:teamId/players` - Hent spillere for lag
- `POST /api/v1/players` - Legg til spiller i lag
- `DELETE /api/v1/players/:id` - Fjern spiller

### Kampadministrasjon
- `GET /api/v1/matches` - Hent alle kamper
- `GET /api/v1/matches/upcoming` - Hent kamper innen 48 timer
- `POST /api/v1/matches` - Opprett ny kamp
- `PUT /api/v1/matches/:id` - Oppdater kampresultat
- `DELETE /api/v1/matches/:id` - Slett kamp

### Kontaktpersoner
- `GET /api/v1/teams/:teamId/contacts` - Hent kontaktperson for lag
- `POST /api/v1/contacts` - Registrer kontaktperson for lag

## Sikkerhet

- **JWT Tokens**: Sikker autentisering med automatisk utløp
- **Protected Routes**: Administrator-funksjoner krever innlogging og rolle
- **Input Validering**: Frontend og backend validering
- **Error Handling**: Bruker-vennlige feilmeldinger

## Installasjon og kjøring

### Backend
```bash
cd Vind_api
npm install
npm start
```

### Frontend
```bash
cd Vind_front_admin
npm install
npm run dev
```

### Miljøvariabler
Backend krever følgende miljøvariabler:
- `JWT_SECRET`: Hemmelig nøkkel for JWT-tokens
- `DATABASE_URL`: Database-tilkoblingsstreng

## Utvikling

### Prosjektstruktur
```
Vind_api/                    # Backend (Express.js)
├── src/
│   ├── app.js              # Hovedapplikasjon
│   ├── database/
│   │   └── db.js           # Database tilkobling
│   ├── repositories/       # Data access layer
│   ├── routes/            # API routes
│   └── middleware/        # Autentisering middleware

Vind_front_admin/           # Frontend (React)
├── src/
│   ├── context/           # React Context (Auth)
│   ├── pages/            # Side-komponenter
│   ├── components/       # Gjenbrukbare komponenter
│   ├── services/         # API klient
│   └── App.css           # Styling
```

### Utviklingsverktøy
- **Frontend**: Vite, React Router, Axios
- **Backend**: Express.js, MySQL/MariaDB
- **Styling**: CSS med variabler for tema-støtte

## Fremtidige forbedringer

- E-postvarsler for kommende kamper
- Mobilapp for enklere tilgang
- Statistikk og rapporter
- Flere idretter og turneringsformater
- Brukerprofiler for deltakere
- Kommentarer og sosiale funksjoner

## Kontakt

For spørsmål eller support, kontakt IT-konsulenten som utviklet løsningen.

---

# Dokumentasjon for Vind IL Turnering

## Problem og mål
Idrettslaget Vind IL ønsker en løsning som samler administrasjon av lag, spillere, kamper, resultater og kontaktpersoner i én digital plattform. Målet er å gjøre det enklere for administratorer å planlegge turneringer og for deltakere å finne kampoppsett og resultater.

## Brukergrupper og rettigheter
- **Administrator**
  - Oppretter lag, spillere og kontaktpersoner
  - Planlegger kamper og registrerer resultater
  - Har tilgang til beskyttede funksjoner i backend
- **Deltaker / publikum**
  - Ser kampoppsett og resultater
  - Ser lag og kontaktpersoner
  - Har ikke tilgang til administrasjonsfunksjoner

## ER-diagram forklaring
Databasen består av fem hovedtabeller:
- **Team**: `team_id`, `team_name`
- **Player**: `player_id`, `team_id`, `player_name`
- **Match**: `match_id`, `team_id_1`, `team_id_2`, `time`, `result`
- **User**: `user_id`, `username`, `password`, `role`
- **Contact**: `contact_id`, `contact_name`, `contact_number`, `team_id`

Relasjoner:
- Ett lag kan ha flere spillere
- Ett lag har én ansvarlig kontaktperson
- En kamp kobler to lag sammen

Dette ER-diagrammet gir struktur for å registrere lag, spilleliste og kampresultater samtidig som persondata holdes begrenset til det som trengs.

## IP-plan og nettverksdiagram forklaring
Løsningen er planlagt med segmentering av nettverk for bedre sikkerhet:
- **Router**: `192.168.1.1`
- **Nett 1**: `192.168.10.0/24` med gateway `192.168.10.1` og DB-server `192.168.10.2`
- **Nett 2**: `192.168.20.0/24` med gateway `192.168.20.1` og web-server `192.168.20.2`
- **Nett 3**: `192.168.30.0/24` med gateway `192.168.30.1` og api-server `192.168.30.2`
- **Nett 4**: `192.168.40.0/24` med gateway `192.168.40.1` og ekstra web-server `192.168.40.2`

Forklaring:
- DB-serveren plasseres på eget nett for minimum eksponering.
- API-serveren ligger i eget segment for å kunne kontrollere trafikk og isolere backend-logikk.
- Web- og brukerklienter kan bruke egne nett for å skille brukertrafikk fra intern administrasjon.
- Diagrammet viser både fysisk plassering og logisk segmentering, slik at det er tydelig hvor komponentene hører hjemme.

## Sikkerhetsanalyse

### React-applikasjonen
- **JWT-autentisering** brukes for administrator-innlogging.
- **Route guarding** hindrer ikke-innloggede brukere fra å nå administrasjonskomponenter.
- **Hovedrisiko**: token lagres i `localStorage`, som kan stjeles ved XSS-angrep.
- **Anbefalt forbedring**: bytte til cookie-basert lagring med `HttpOnly` og `Secure`, og sørge for HTTPS.

### API-et
- **Autentisering og autorisasjon** beskytter skriveoperasjoner med `authenticateToken` og `authorizeRoles('admin')`.
- **SQL-parameterisering** reduserer risiko for SQL-injection.
- **Hovedrisiko**: ingen rate limiting, manglende sikkerhetsheaders og potensielt åpne CORS-policyer.
- **Anbefalt forbedring**: legge til HTTPS, strengere CORS, logging, og input-validering på alle endepunkter.

## Beskrivelse av utviklede funksjoner
Løsningen inneholder følgende hovedfunksjoner:
- Registrering og administrasjon av lag
- Opprettelse av spillere til lag
- Planlegging av kamper og resultatoppdatering
- Registrering av kontaktperson for hvert lag
- Visning av kamper og resultater for deltakere
- Endepunkt for kamper som starter innen 48 timer

### Hvorfor funksjonene er gode
- Samler turneringsinformasjon i ett system
- Reduserer behovet for e-post og papir
- Gjør at administratorer kan følge kampstatus raskt
- Deltakere får enkel tilgang til kampoppsett og resultater

### Forbedringspotensial
- Strammere personvern slik at deltakere kun ser egne data
- Mer robust varsling når resultat mangler før kamp
- Bedre opplæring/brukerveiledning for ikke-tekniske brukere
- Mer utfyllende logging og feilsporing
- Mobilvennlig grensesnitt og bedre tilgjengelighet

## Testing og verifisering
- Sjekk at `GET /api/v1/matches/upcoming` returnerer kamper innen 48 timer
- Sjekk at administrator kan logge inn og opprette data
- Sjekk at vanlige brukere kun får se informasjon og ikke endre noe
- Sjekk at kontaktpersoner vises per lag

## Konklusjon
Denne løsningen gir Vind IL en enkel og funksjonell systembase for turneringsadministrasjon. Den dekker hovedbehovene for både administratorer og deltakere, og kan videreutvikles med bedre sikkerhet, varsling og personvern.