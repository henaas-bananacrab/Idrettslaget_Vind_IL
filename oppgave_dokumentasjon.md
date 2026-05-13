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
