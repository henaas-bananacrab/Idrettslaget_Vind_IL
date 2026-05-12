# Vind IL Tournament Management System

## Oversikt

Dette er en komplett løsning for Idrettslaget Vind IL som løser utfordringene med manuell administrasjon av lokale turneringer. Systemet gir administratorer muligheten til å registrere lag og deltakere, sette opp kamper og føre resultater, samtidig som det gir deltakerne tilgang til kampoppsett og resultater.

## Funksjonalitet

### For Administratorer (Krever innlogging)
- **Lagadministrasjon**: Opprett og administrer lag, legg til/fjern spillere
- **Kampadministrasjon**: Planlegg kamper, registrer resultater
- **Brukerhåndtering**: Registrer administratorbrukere

### For Deltakere (Offentlig tilgang)
- **Se kampoppsett**: Oversikt over kommende kamper
- **Se resultater**: Resultater fra fullførte kamper
- **Se lag**: Oversikt over alle lag og deres spillere
- **Hjemmeside**: Velkomstside med informasjon om Vind IL

## Teknisk Arkitektur

### Frontend (React)
- **React Router**: Navigasjon mellom sider
- **Context API**: Autentiseringstilstand
- **Axios**: API-kommunikasjon med JWT-autentisering
- **CSS Variables**: Mørk/lys modus støtte

### Backend (Express.js)
- **REST API**: CRUD-operasjoner for lag, spillere, kamper, brukere
- **JWT-autentisering**: Sikker token-basert autentisering
- **SQLite/PostgreSQL**: Database for dataoppbevaring

## Brukerflyt

### Første gangs oppsett
1. Start backend-serveren (`npm start` i Vind_api/)
2. Start frontend (`npm run dev` i Vind_front_admin/)
3. Gå til `/register` for å opprette første administratorbruker
4. Logg inn og begynn å registrere lag og spillere

### Daglig bruk - Administratorer
1. Logg inn på `/admin`
2. Opprett lag og legg til spillere
3. Planlegg kamper mellom lag
4. Oppdater resultater etter kamper

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

### Kamper
- `GET /api/v1/matches` - Hent alle kamper
- `POST /api/v1/matches` - Opprett ny kamp
- `PUT /api/v1/matches/:id` - Oppdater kampresultat
- `DELETE /api/v1/matches/:id` - Slett kamp

## Sikkerhet

- **JWT Tokens**: Sikker autentisering med automatisk utløp
- **Protected Routes**: Administrator-funksjoner krever innlogging
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
- **Backend**: Express.js, SQLite/PostgreSQL
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