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
 
 <b> Bejelentkezett felhasználó: </b>
 <ul>
 <li> A publikus oldalakon kívül hozzáfér további opciókhoz is. </li>
 <li> ToDo létrehozása </li>
 <li> ToDo-k megtekintése </li>
 <li> ToDo módosítása </li>
 <li> ToDo megjelölése elvégzettként </li>
 
 
![Használatieset-modell](docs/nomnoml.png)
