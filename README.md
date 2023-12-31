# ParkAway

6. ParkAway – Aplicație pentru gestiunea locurilor
de parcare

    În acest capitol este descrisă aplicația Web ParkAway. Aplicația a fost creată cu scopul de
a facilita modul în care se rezervă și se achiziționează un bilet pentru un loc de parcare plătit, cât
și ca o platformă care reușește cu ușurință să gestioneze aceste locuri de parcare și să afișeze
informații relevante despre ele, atât utilizatorului, cât și administratorilor care se ocupă de locul
de parcare în sine.
    Aplicația permite navigarea, cât și localizarea diferitelor spații amenajate special pentru
parcare și oferă un sistem de inventariere a biletelor cumpărate care aduce un aspect în plus
experienței. Fiecare bilet este însoțit de o serie de informații relevante acestuia, cum ar fi: data
emiterii, data până la când este valabil, locație, număr de înmatriculare, suma plătită. ParkAway
beneficiază și de diferite funcționalități statistice care ajută administratorii să gestioneze aceste
loturi de parcare și să le mențină. Există funcționalități precum modificarea anumitor parametri ai
unui lot de parcare cât și rata de încărcare pe o perioadă dată de timp de către administrator.
Această aplicație a fost implementată cu ajutorul tehnologiilor ASP .NET Core MVC și
Angular, bazate pe structura mediului Visual Studio și oferă suport personalizat pentru dezvoltarea
aplicațiilor Web utilizând modul de dezvoltare MVC al API-ului și gestiunea componentelor pusă
la dispoziție de Angular.

6.1 Funcționalitățile aplicației
    Acest subcapitol se constituie într-o prezentare detaliată a funcționalităților din cadrul
aplicației ParkAway din perspectiva unui utilizator, administrator și a unui simplu vizitator
neautentificat.
Un vizitator reprezintă o persoană care nu are cont în cadrul aplicației și nu este autentificat
în vreun fel, lucru ce îi conferă drepturi limitate precum:
1. Capacitatea de a naviga și a vedea spațiile de parcare disponibile cu ajutorul extensiei
integrate Google Maps.
2. Capacitatea de a observa arhitectura spațiului de parcare cât și rezervările pe un loc anume
din lotul respectiv.
35
3. Capacitatea de a simula și estima achiziționarea unui tichet de parcare având la dispoziție
o unealtă care îi estimează prețul înainte de plată și fără nevoia de autentificare.
4. Posibilitatea de navigare prin paginile de natură informațională ale aplicației cum ar fi
pagina intitulată „About”.
5. Poate să își creeze un cont personal folosind portalul de înregistrare.

    Un utilizator reprezintă o persoană care folosește aplicația și este înregistrat corespunzător
cât și autentificat în cadrul acesteia. Acest lucru îi permite utilizatorului accesul la toate
funcționalitățile aplicației destinate unei persoane fără drepturi de administrator. Pe lângă
drepturile unui vizitator enumerate mai sus, un utilizator autentificat mai beneficiază de
următoarele funcționalități:
1. O secțiune unde își poate vedea biletele active cât și cele inactive din trecut cu funcția de
istoric.
2. Modalitate de salvare locală a tichetelor de parcare într-un format PDF .
3. Posibilitatea de a finaliza tranzacția unui tichet de parcare.
4. Funcționalitate de parcare rapidă care îi permite să să parcheze pe un loc care este liber pe
un anumit interval orar fără a mai trece prin pașii pentru locul preferențial.

    Un administrator reprezintă o categorie de utilizatori care are drepturi sporite în cadrul
aplicației. Acest administrator este desemnat de către un super administrator care este definit în
prealabil. Un administrator beneficiază, pe lângă toate funcționalitățile pe care un utilizator
autentificat le are, de următoarele unelte extra:

1. Capacitatea de a înregistra alte conturi de administratori în secțiunea de înregistrare.
2. Capacitatea de a viziona detalii despre loturile de parcare cu scopul de a facilita gestionarea
acestora.
3. Modalitate de modificare a locurilor de parcare integrată în pagina specială pentru
administratori.
38
4. Modalitate de ștergere completă a loturilor de parcare existente cât și crearea a unor spații
noi folosind o secțiune în care se vor defini în detaliu caracteristicile despre spațiul ce
urmează să fie creat (nume, locație, descriere, poziționarea pe hartă, numărul de locuri
disponibile, preț).
5. Unelte statistice pentru a determina încărcarea unui loc de parcare pe o anumită perioadă
de timp.




6.2 Prezentarea arhitecturii aplicației
    API-ul este implementat folosind ASP .NET Core utilizând instrumentele și clasele puse
la dispoziție de acesta, printre care se numără: modelul MVC și pachetele NuGet.
Clasele folosite pentru implementare sunt grupate în pachete acestea fiind:
1. Model - Pachet dedicat entităților care urmează să fie salvate în baza de date.
2. Controller - Acest pachet este compus din totalitatea claselor de tip controller
care au rol de a gestiona cererile primite de către server.
3. JSONWebToken - Este un pachet dedicat pentru gestionarea sistemului de
autentificare pentru utilizatori.
4. Entity - Este un pachet compus din interfețele responsabile pentru operațiile din
cadrul bazei de date a aplicației.
5. Route - Reprezintă pachetul responsabil pentru gestionarea și configurarea rutelor
din cadrul aplicației.
6. Program – Reprezintă pachetul responsabil cu majoritatea opțiunilor de
configurare necesare serviciilor din cadrul aplicației.
Pentru implementarea unui API este important să existe o gestionare corectă a modelelor
și o folosire corectă a pachetului MVC. Acestea definesc structura entităților trimise de utilizator
care vor fi prelucrate de către pachetele de tip controller pentru a returna un răspuns sau pentru
salvarea acestor entități în baza de date. În următoarea secvență de cod avem un exemplu de model
folosit pentru spațiul individual:
namespace ParkAwayServer.Models{
public class IndividualSpaces
{
[Key]
[Column(TypeName = "decimal")]
public int Id { get; set; }
[Column(TypeName = "bit")]
public bool IsFull { get; set; }
public int SpaceId { get; set; }
[ForeignKey("SpaceId")]
public virtual ParkingSpaces? ParkingSpaces { get; set; }
}
}
    Fiecare variabilă din modelul respectiv are rolul de colectare a informațiilor trimise de un
administrator în timpul operației de creare a unui lot de parcare nou. În acest caz, acest model
deservește unui proces de automatizare el fiind auto completat printr-o funcție din Angular
40
depinzând de numărul de spații individuale de parcare introdus de către administrator la crearea
lotului de parcare. Practic în acest exemplu fiecare variabilă este generată cu excepția variabilei
“SpaceId” care este generată separat la crearea lotului în sine.
