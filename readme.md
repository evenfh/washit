

# Del 1:

For å begrense problemet litt antar jeg at det bare er mulig å reservere en vask 24 timer frem i tid. Videre så har jeg heller ikke implementert noen form for brukerhåndtering.

Har implementert et enkelt API med .NET, samt en klient implementert med React som gjør det mulig å reservere vaskemaskiner basert på type vask. Jeg har ikke implementert venteliste på klienten, men har implementert dette på API'et.


# Del 2:

*  **Identifisering av sluttbruker, slik at kun den som har reservert vaskemaskinen kan bruke den:**
   
   En mulig løsning er at alle brukere av vaskeriet har et kort med nfc som de bruker til å låse opp maskinen. Alternativt kan en pinkode/qr-kode som blir generert per reservasjon. Begge disse løsningene inneholder en sjekk på backend om det er riktig bruker.


* **Innsjekk for sluttbruker. Reservasjonen kanselleres etter 15 minutter hvis sluttbrukeren ikke har sjekket inn eller startet maskinen:**
  
  Hvis brukerne hadde hatt kort med nfc, kunne man kansellert en reservasjon dersom kortet ikke hadde blitt skannet i tide. Alternativt kunne man hatt en qr-kode som ble re-generert hver dag, og som var tilgjengelig på en skjerm ved maskinen. Innsjekk kunne da fungert ved at brukere scannet denne qr-koden før bruk. 

  For å håndtere dette på backend er første tanke å ha en rutine som regelmessig går igjennomm reservasjoner, og kansellerer reservasjoner hvor brukere ikke har sjekket inn i tide.

* **Reservasjon av tørketromler**
   
    Her ville jeg utvidet til flere typer vask/tørk, samt flere maskiner. Maskinene ville da hatt en type tilknyttet seg (altså om det er en vaskemaskin eller en tørketrommel). Ville utvidet klienten for å gjøre det enkelt å bestille tørk sammen med vask(f.eks gi spørsmål om bruker har lyst på tørk når en bestiller vask).
