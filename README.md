# Kwizzert

Een real-time webapplicatie om in teamverband quizzen te spelen.

## Requirements
### Algemeen
* De server moet meerdere kwizzen in verschillende pubs kunnen ondersteunen aan de hand van een verificatie code.
* Er moeten 3 SPA's geprogrammeerd worden:
   * Team-app
   * KwizMeestert-app
   * Scorebord-app
* Deze applicaties moeten door 1 server worden aangestuurd.
* Near real-time communicatie door middel van websockets is verplicht.
* Aan het einde van de ronde moet de server automatisch het totaal aantal punten voor elk team uitrekenen.
* De puntentelling gaat per ronde als volgt: Het team wat de meeste vragen goed heeft krijgt 4 punten, daarna 2 en daarna 1 en de rest 0.1.

### Team-app
* Deze app moet kunnen draaien op een smartphone.
* Er moet een scherm voor aanmelden bij de kwiz getoond worden waar naam en wachtoord ingevoerd kunnen worden. 
* De velden naam en wachtwoord mogen niet leeg worden opgestuurd.
* De app moeten tonen of het team geaccepteerd is.
* De app moet een vraag tonen.
* Er moet een antwoord kunnen worden ingevuld als tekst.
* In de applicatie kan een antwoord worden gewijzigd totdat de vraag gesloten wordt door de kwizmeestert.
* Lege antwoorden kunnen niet worden ingestuurd.

### KwizMeestert-app
* Deze app moet kunnen draaien op een tablet.
* Kwizavond moet gestart kunnen worden.
* Aan een kwizavond moet een code gekoppeld kunnen worden door de kwizmeestert.
* Aanmeldingen van teams moeten geaccepteerd of geweigerd kunnen worden.
* De kwiz moet gestart kunnen worden.
* Een ronde moet gestart kunnen worden door 3 categorieën selecteren en op de startronde knop te klikken.
* Na elke ronde moet er een nieuwe ronde gestart kunnen worden.
* Na elke ronde moet de quiz gestopt kunnen worden.
* Uit een aantal voorgestelde vragen van de 3 categorieën moet er een vraag gekozen kunnen worden.
* De vraag moet gestart kunnen worden.
* De vraag moet gestopt kunnen worden.
* Antwoorden van de teams moeten goedgekeurd of afgekeurd kunnen worden.

### Scorebord-app
* De app moet draaien op een groot scherm.
* Het door de kwizmeestert aangemaakte wachtwoord tonen.
* Geaccepteerde teams weergeven.
* Huidige vraag en de categorie van deze vraag tonen.
* Tonen welke teams een antwoord hebben ingestuurd.
* De namen van de teams met hun rondepunten en aantal goede vragen tonen.
* De voortgang van de kwiz tonen, namelijk de hoeveelste ronde en hoeveelste vraag.
* De antwoorden van de teams worden getoond als de vraag door de kwizmeestert gesloten is.
* Goedkeuring of afkeuring van de vraag door kwizmeestert per team tonen.
* Na afloop tonen welk team er gewonnen heeft en hoeveel punten alle teams behaald hebben, de nummer 1 moet extra nadruk hebben.

### Server
* Deze moet controleren of de ingestuurde namen van de teams al bestaan.
* Elke vraag mag maar 1 keer worden gesteld.

### Lay-out
* Bij het tonen van de vraag mag deze niet buiten het beeld vallen, de vraag moet goed te lezen zijn. We houden hierbij rekening tot en met de langste vraag die op dit moment in de database staat.
* We houden bij het creeën van de lay-out rekening met het maximale aantal deelnemers van 6 teams.


## Low fidelity designs
Hieronder volgen de screenshots voor elke SPA:
### De Team-app - Smartphone
![Smartphone Screenshot](Smartphone.jpg)

### De KwizMeestert-app - Tablet
![Tablet Screenshot](Tablet.jpg)

### De Scorebord-app - Beamer
![Beamer Screenshot](Beamer.jpg)

## Architectuur
![Deployment Diagram](DeploymentDiagram.png)

## Communicatie protocol
* We zullen in deze app alleen comuniceren via websockets omdat de dataoverdracht klein is.

De comunicatie via ws zal op de volgende manier worden gedefineerd als objecten:
```js
object: {
  naamvansocket: Type,
  "bepaalde string": String,
  true/false: Boolean,
  naamvanarray: Array[]
}
```

### Team-app
* ws 
  * Verificatie geaccepteerd: (1)
    * Type: teamgeaccepteerd
    * String: _melding_
  * Ontvangst vraag:
    * Type: ontvangstvraag
    * String: _vraag_
  * Vraag afbreken:
    * Type: afbrekenvraag
  * Kwiz gestopt:
    * Type: Kwizgestopt

### KwizMeestert-app
* ws
  * Verificatie geaccepteerd:
    * Type: kwizavondgestart
    * Boolean: _geaccepteerd_
  * Ontvangst teamnaam:
    * Type: teamaangemeld
    * String: _teamnaam_
  * Ontvangst categorieën:
    * Type: ontvangstcategorieen
    * Array[String]: _categorieën_
  * Ontvangst vragen:
    * Type: ontvangstvragen
    * Array[vragen: {
        ObjectID: _id,
        String: question,
        String: answer,
        String: category
      }]: _vragen_
  * Ontvangst teamantwoorden:
    * Type: ontvangstantwoorden
    * Array[vragen: {
        String: teamnaam,
        String: antwoord,
      }]: _teamnantwoorden_

### Scorebord-app
* ws
  * Verificatie code ontvangen:
    * Type: ontvangstcode
    * String: _code_
  * Geaccepteerd team:
    * Type: geaccepteerdteam
    * String: _teamnaam_
  * Ontvangst vraag:
    * Type: scoreboardvraag
    * {
        Number: rondenummer,
        Number: vraagnummer,
        String: question,
        String: category
      }: _vraag_
  * Ontvangst teamnaam:
    * Type: scoreboardteamnaam
    * String: _teamnaam_
  * Ontvangst teamgegevens:
    * Type: scoreboardteamgegevens
    * Array[teams: {
        String: teamnaam,
        String: antwoord,
        Number: rondepunten,
        Number: vragengoed
      }]: _teamgegevens_
  * Gecontroleerd antwoord:
    * Type: scoreboardgecontroleerdantwoord
    * Boolean: _correct_
  * Scorelijst ontvangen
    * Type: scorelijst
    * Array[teams: {
        String: teamnaam,
        Number: rondepunten
      }]: _scorelijst_

### Server
* ws
  * Team aanmelden: (1)
    * Type: aanmeldenteam
    * String: _code_
    * String: _teamnaam_
  * Ontvangst antwoord:
    * Type: ontvangstantwoord
    * String: _antwoord_
  * Verificatie code:
    * Type: startkwizavond
    * String: _code_
  * Team geaccepteerd:
    * Type: teamgeaccepteerd
    * String: _teamnaam_
    * Boolean: _geaccepteerd_
  * Kwiz starten:
    * Type: startkwiz
  * Ronde starten:
    * Type: startronde
    * Array[String]: _3 categorieën_
  * Kwiz stoppen:
    * Type: stopkwiz
  * Vraag starten
    * Type: startvraag
    * {
        ObjectID: _id,
        String: question,
        String: answer,
        String: category
      }: _vraag_
  * Vraag stoppen:
    * Type: stopvraag
  * Antwoord gecontroleerd:
    * Type: antwoordgecontroleerd
    * String: _teamnaam_
    * Boolean: _goedgekeurd_
  * Volgende:
    * Type: volgende

## Componenten / Views / Routes
De omschrijvingen zijn als volgt opgebouwd:
### _Naam van de app_
* _(Nummer van scherm) Component_
  * _Omschrijving pagina_

### Team-app
* (scherm 1) aanmelden
  * Op dit scherm kan het team zich aanmelding door middel van het invoeren van de code en het opgeven van de teamnaam. Aan de onderzijde van het scherm kunnen meldingen verschijnen zoals de melding dat de teamnaam al gekozen is.
* (scherm 2) kwiz
  * Op dit scherm wordt de kwiz gespeelt en ook hier kunnen meldingen verschijnen aan de onderzijde van het scherm.
* (scherm 3) kwizgesloten
  * Dit scherm wordt weergegeven als de kwiz wordt gesloten. Er is een knop om terug te gaan naar het aanmeldscherm.

### KwizMeestert-app
* (scherm 1) kwizstarten
  * Op dit scherm kan de kwizmeestert een code invoeren en de kwiz starten.
* (scherm 2) teamsaccepteren
  * Hier worden alle teams die zich aanmelden getoond en kan de kwizmeestert de teams accepteren. Er is ook een knop om de kwiz te starten.
* (scherm 3) rondestarten
  * Er kunnen 3 categorieën gekozen worden en een ronde kan worden gestart. De kwiz kan op dit scherm ook worden gestopt.
* (scherm 4) vragenkiezen
  * Op dit scherm worden vragen getoond waaruit er 1 kan worden geselecteerd. De vraag kan in dit scherm worden gestart en vervolgens gestopt.
* (scherm 5) antwoordcontroleren
  * De antwoorden per team verschijnen in dit scherm en kunnen goedgekeurd of afgekeurd worden. Onderaan staat een knop om naar de volgende vraag te gaan.

### Scorebord-app
* (scherm 1) voorafkwiz
  * Het wachtwoord en de deelnemende teams worden weergegeven.
* (scherm 2) actievevraag
  * De voortgang, huidige vraag en categorie en de teamnamen van de teams die antwoord hebben gegeven.
* (scherm 3) beoordelingvraag
  * De voortgang en een overzicht van de goed- of foutgekeurde atwoorden en score per team worden weergegeven.
* (scherm 4) achterafkwiz
  * De teamnamen plus hun scores worden weergegeven.

In de server zal gebruik worden gemaakt van `app.use.static` om naar de clients te gaan.
Dit zal er voor zorgen dat problemen met links als `localhost:3000/teams/vraag` niet optreden, maar de client de index ophaalt als je  direct naar deze link gaat.

## Redux
* Als het nodig is zal dit alleen bij de kwismeestert worden toegepast. Bij de rest is het niet noodzakelijk omdat hier geen informatie in de statie wordt opgeslagen.

## Mongoose / Mongo model
Hieronder het model voor de database. We hebben ervoor gekozen de categorieën niet appart op te nemen omdat er niet veel vragen in de database staan. Als de categorieën moeten worden opgehaald hoeven er niet veel (minder dan 1000) vragen worden doorgenomen, deze actie neemt niet veel tijd in beslag. 
Daarnaast is het niet nodig er nu een string staat in het veld 'category', als de categorieën appart worden opgenomen staat er een verwijzing. Dit maakt in feite niet veel uit.

![databaseSchema](databaseSchema.png)

Wij hebben ervoor gekozen alleen de vragen in de database op te slaan, alle verdere gegevens worden in het geheugen opgeslagen.
Dit willen we doen door het aanmaken van een object. Hieronder volgt de implementatie daarvan:

```js
let session = {
    kwizzen: [{
        code: "",
        kwizmeestertSocket: null,
        beamerSocket: null,
        gesteldeVragen: [],
        huidigeronde: [],
        huidigevraag: {
            vraag: "",
            antwoord: ""
        },
        teams : [{
            teamSocket: null,
            teamnaam: "",
            geaccepteerd: Boolean,
            huidigAntwoord: "",
            rondepunten : 0,
            vragenGoed: 0
        }]
    }]
};
```
Het opslaan van dit object in het geheugen heeft een aantal voordelen. Via dit object zal sneller te vinden zijn naar welke sockets wat gestuurd moet worden, in plaats van aan de socketserver de lijst sockets steeds door te lopen. Als alternatief zouden alle gerelateerde sockets opgeslagen kunnen worden in de socket zelf. Dit werd afgeraden omdat de structuur van een extern object veranderd wordt en omdat alle data dan op meerdere plekken opgeslagen moet worden.
Een nadeel van het opslaan in het geheugen is dat de kwiz op deze manier niet extern wordt opgeslagen. Mocht er nu een fout optreden zodat de applicatie crasht is het na restart niet mogelijk om verder te gaan waar men gebleven was.
De voordelen zijn op dit moment belangrijker dan de nadelen omdat het er in deze applicatie niet om gaat dat de kwiz moet worden opgeslagen. Dit is een functionaliteit die later eventueel kan worden ingebouwd. Snelheid is daarentegen belangrijk in deze applicatie.


## Externe libs
* React
* Node.js
* API (Rest)
* Websockets
* MongDB
* Mongoose
* (Redux)

## Build proces
_Volgt later_

## Code style
https://github.com/airbnb/javascript

## Extra
* Veiligheid
* Bij het afsluiten van de applicatie van de kwizmeestert kan hij na opnieuw openen verder waar hij gebleven was.

---
### Autheurs
Christiaan ten Voorde & Stefan Vonk
