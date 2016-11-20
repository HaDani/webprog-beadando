# webprog-beadando

A választott beadandó feladat:

<h1>TO-DO alkalmazás fejlesztése</h1>

<h2>Funkcionális követelmények:</h2>
A beadandó program célja az adatbázisba felvitt feladatok/tennivalók megjelenítése, valamint azok megjelölése elvégzettként, törlése.   

Felhasználóként szeretnék elvégzendő feladatot/tennivalót hozzáadni -> Feladat hozzáadása <br>
Felhasználóként szeretném megjelelölni az elvégzett feladatokat, vagy törölni azokat. -> Feladat törlése <br>
Felhasználóként szeretném tudni csoportosítani a feladataimat -> Feladatok csoportosítása <br>
Felhasználóként szeretném, ha az alkalmazás listázná a legkorábban feltöltött és még nem elvégzett feladataimat -> Feladatok megtekintése <br>

A felhasználó bejelentkezés után:
 - Tennivalót adhat hozzá a listájához
 - Tennivalót törölhet, jelölhet meg elvégzettként, vagy jelölheti meg magas prioritásuként
 - Megtekintheti a hozzáadott feladatait, valamint módosíthatja azokat

Amennyiben a felhasználó még nem jelentkezett be, úgy az oldalon megjelenik egy ismertető, amely leírja az alkalmazás fontosabb funkciót,
valamint azok működését

<h2>Nem funkcionális követelmények:</h2>
<ul>
<li>Felhasználóbarát, modern megjelenés</li>
<li>Gyors működés</li>
<li>Biztonságos működés</li>
</ul>

<h2> Szakterületi fogalomjegyzék: </h2>
<b> ToDo: </b> Az elvégzendő tevékenység leírásá szolgál.

<h2> Használatieset-modell, funkcionális követelmények </h2>

<b> Vendég: </b> 
<ul>
 <li> Az oldalt megtekintheti, azonban mivel a funkciók csak bejelentkezés után érhetőek el, így nem tud ToDo-t létrehozni, módosítani </li>
 <li> Regisztráció </li>
 <li> Bejelentkezés </li>
 </ul>
 
 <b> Bejelentkezett felhasználó: </b>
 <ul>
 <li> A publikus oldalakon kívül hozzáfér további opciókhoz is. </li>
 <li> ToDo létrehozása </li>
 <li> ToDo-k megtekintése </li>
 <li> ToDo módosítása </li>
 <li> ToDo megjelölése elvégzettként </li>

![Használatieset-modell](docs/nomnoml.png)

 <h2> ToDo módosítása </h2>
 <ol>
 <li> Az oldalra érkezett vendég regisztrál, vagy bejelentkezik </li>
 <li> Amennyiben már regisztrált és adott hozzá tevékenységet, úgy a következőket teheti: </li>
 <ul> 
  <li> Megtekintheti az eddig hozzáadott ToDo-jait
  <li> A ToDo neve melletti módosít gombra kattintva módosíthatja azt
  <li> A ToDo neve melletti kész gombra kattintva elvégzettnek tekintheti az adott tevékenységet, mely ezáltal törlésre kerül
 </ul>
 <li> Amennyiben a módosít gombra kattintott úgy megjelenik számára a módosító felület, melyen átírhatja a ToDo nevét, leírását, valamint megváltoztathatja annak kategóriáját.
 <li> Az új adatok bevitele után az elküld gombra kattintva a ToDo módosításai mentésre kerülnek
 </ol>
 </ul>
 </ol>
 
 ![ToDo módosítása diagram](docs/modifyToDo.png)


<h1>
Tervezés
</h1>

<h2>
Architektúra modell
</h2>

<h3> Komponens diagram </h3>

![Komponens diagram](docs/dbmodell.png)


<h2>
Oldaltérkép </h2>

<b> Publikus: </b>
<ul>
 <li> Főoldal
 <li> Regisztráció
 <li> Bejelentkezés
</ul>


<b> Bejelentkezett: </b>
<ul>
 <li> Főoldal </li>
 <li> ToDo-k megtekintése </li>
 <ul>
 <li> Új ToDo felvétele </li>
 <li> ToDo módosítása </li>
 <li> ToDó megjelölése kész-ként </li>
 </ul>
</ul>

<h2>
Végpontok </h2>
<ul> 
 <li> GET/: főoldal </li>
 <li> GET/login: bejelentkező oldal </li>
 <li> POST/login: bejelentkező adatok felküldése </li>
 <li> GET/login/signup: regisztrációs oldal </li>
 <li> POST/login/signup: regisztrációs adatok felküldése </li>
 <li> GET/logout: kijelentkező oldal </li>
 <li> GET/todos/create: Új ToDo felvétele </li>
 <li> POST/todos/create: Új ToDo felvételehéz adatok felküldése </li>
 <li> GET/showmytodos: ToDo-k megjelenítése</li>
 <li> GET/:id/: ToDo megtekintése </li>
 <li> GET/:id/modify: ToDo módosítása </li>
 <li> POST/:id/modify: ToDo módosítása adatok felküldése </li>
 <li> GET/:id/markAsComplete: ToDo megjelölése kész-ként </li>
 <li> GET/todos/todoNotFound: Annak jelzésére, ha a kért ToDo nem található </li>
 <li> GET/register: Felhasználó regisztrálása</li>
 <li> POST/register: Felhasználó regisztrálásához adatok felküldése </li>
 <li> GET/login: Felhasználó bejelentkeztetése</li>
 <li> POST/login: Felhasználó bejelentkeztetéséhez adatok felküldése</li>
 <li> POST/logout: Felhasználó kijelentkeztetéséhez adatok felküldése)</li>
 <li> GET/accessDenied: Annak jelzésére, ha az adott felhasználónak nincs joga)</li>
 <li> GET/todos/:id/comment: Megjegyzés írása</li>
 <li> POST/todos/:id/comment: Megjegyzés írásához adatok felküldése</li>
 <li> GET/comments/:id/delete: Megjegyzés törlése</li>
 <li> GET/comments/:id/modify: Megjegyzés módosítása</li>
 <li> POST/comments/:id/modify: Megjegyzés módosításához adatok felküldése</li>
 <li> GET/profile/:id: Felhasználó profiljának megtekintése</li>
 <li> POST/profile/:id: Felhasználó profiljának módosításához adatok felküldése</li>
 <li> GET/profile/:id/delete:  Felhasználó profiljának törlése</li>
 <li> GET/comments/:id/modify: Megjegyzés módosítása </li>
 <li> POST/comments/:id/modify: Megjegyzés módosításához adatok felküldése</li>
 <li> GET/profile/:id: Felhasználó profiljának megtekintése</li>
 <li> POST/profile/:id: Felhasználó profiljának megtekintése és módosítása</li>
 <li> GET/profile/:id/delete: Felhasználó törlése</li>
 <li> GET/todos/:id/addNewMember: Új felhasználó hozzáadása a ToDo-hoz</li>
 <li> POST/todos/:id/addNewMember: Új felhasználó hozzáadása a ToDo-hoz - adatok felküldése </li>
</ul>

<h2>Drótvázterv </h2>
</h3>Főoldal</h3>
![MainPage](docs/todoBeadMainPage.png)
<br>
</h3>Regisztrációs oldal</h3>
![Regisztrációs oldal](docs/regSite.png)<br>
</h3>Bejelentkezési oldal</h3>
![Bejelentkezési oldal](docs/logSite.png)<br>
</h3>Új ToDo hozzáadása oldal</h3>
![Új ToDo](docs/newToDo.png)<br>
</h3>ToDo módosítása oldal</h3>
![ToDo módosítása](docs/modToDo.png)<br>
</h3>ToDo-im megtekintése</h3>
![ToDo-k megtekintése](docs/myToDos.png)<br>
</h3>ToDo megtekintése</h3>
![ToDo megtekintése](docs/showToDo.png)<br>
</h3>Komment hozzáadása</h3>
![Komment hozzáadása](docs/addComment.png)<br>
</h3>Tag hozzáadása</h3>
![Tag hozzáadása](docs/addMember.png)<br>
</h3>Profil megtekintése</h3>
![Profil megtekintése](docs/modProfile.png)
<br>

<h2>Dizájntervek </h2>
</h3>Főoldal</h3>
![MainPage](docs/mainSite.png)
<br>
</h3>Regisztrációs oldal</h3>
![Regisztrációs oldal](docs/regSiteV.png)<br>
</h3>Bejelentkezési oldal</h3>
![Bejelentkezési oldal](docs/logSiteV.png)<br>
</h3>Új ToDo hozzáadása oldal</h3>
![Új ToDo](docs/newToDoV.png)<br>
</h3>ToDo módosítása oldal</h3>
![ToDo módosítása](docs/modToDoV.png)<br>
</h3>ToDo-im megtekintése</h3>
![ToDo-k megtekintése](docs/myToDosV.png)<br>
</h3>ToDo megtekintése</h3>
![ToDo megtekintése](docs/showToDoV.png)<br>
</h3>Komment hozzáadása</h3>
![Komment hozzáadása](docs/addCommentV.png)<br>
</h3>Tag hozzáadása</h3>
![Tag hozzáadása](docs/addMemberV.png)<br>
</h3>Profil megtekintése</h3>
![Profil megtekintése](docs/modProfileV.png)
<br>

<h2> Adatmodell </h2>
![Adatmodell](docs/adatModell1.png)<br>

<h2> Szekvenciadiagram </h2>
<h3>Például: Regisztráció, új ToDO, szerkesztés, törlés</h3>
![Szekvenciadiagram](docs/szekvenciadiagram.png)<br>
