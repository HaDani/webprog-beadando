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
  </ul>
 
 
 ![Használati-eset modell](docs/h_emodell.png)
 
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
  
  ![ToDo módosítása diagram](docs/modell.png)
 
 
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
  <li> GET/todos/create: Új ToDo felvétele </li>
  <li> POST/todos/create: Új ToDo felvételehéz adatok felküldése </li>
  <li> GET/showmytodos: ToDo-k megjelenítése</li>
  <li> GET/:id/: ToDo megtekintése </li>
  <li> GET/todos/:id/modify: ToDo módosítása </li>
  <li> POST/todos/:id/modify: ToDo módosítása adatok felküldése </li>
  <li> GET/todos/:id/markAsComplete: ToDo megjelölése kész-ként </li>
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
 ![Adatmodell](docs/adatmodell1.png)<br>
 
 <h2> Szekvenciadiagram </h2>
 <h3>Például: Regisztráció, új ToDO, szerkesztés, törlés</h3>
 ![Szekvenciadiagram](docs/szekvenciadiagram.png)<br>ű
 
 
 <h1> Implementáció </h1>
 
 <h3> Fejlesztőkörnyezet: Visual Studio Code </h3>
 <ul>
 <li> Szükséges függőséges telepítése után elkezdhetjük a kód írását </li>
 <li> A commitolás github-ra is a Visual Studio Code-ban történik a Git ikonra kattintva stage-elni majd push-olni kell az egyes változtatásokat
 
 <h3> Könyvtárstruktúra </h3>
 ToDoBead
 <ul>
 <li>
  controllers
   <ul>
   <li>UserController.js</li>
     <li>ToDoController.js</li>
       <li>CommentController.js</li>
   </ul>
  </li>
  
  <li>
  models
   <ul>
   <li>Category.js</li>
     <li>Comment.js</li>
       <li>Family.js</li>
         <li>ToDo.js</li>
     <li>Token.js</li>
       <li>User.js</li>
   </ul>
  </li>
   <li>
  views(.njk (nunjucks) fájlok)
   <ul>
   <li>accessDenied.njk</li>
     <li>addFamilyMember.njk</li>
       <li>createToDo.njk</li>
         <li>layout.njk</li>
     <li>login.njk</li>
       <li>main.njk</li>
           <li>master.njk</li>
       <li>modifyComment.njk</li>
         <li>modifyToDo.njk</li>
     <li>register.njk</li>
       <li>showMyToDos.njk</li>
                 <li>showSharedToDo.njk</li>
       <li>showToDo.njk</li>
         <li>showUser.njk</li>
     <li>todoNotFound.njk</li>
       <li>welcome.njk</li>
             <li>writeComment.njk</li>
   </ul>
     <li>
  views(.njk (nunjucks) fájlok)
   <ul>
   <li>accessDenied.njk</li>
     <li>addFamilyMember.njk</li>
       <li>createToDo.njk</li>
         <li>layout.njk</li>
     <li>login.njk</li>
       <li>main.njk</li>
           <li>master.njk</li>
       <li>modifyComment.njk</li>
         <li>modifyToDo.njk</li>
     <li>register.njk</li>
       <li>showMyToDos.njk</li>
                 <li>showSharedToDo.njk</li>
       <li>showToDo.njk</li>
         <li>showUser.njk</li>
     <li>todoNotFound.njk</li>
       <li>welcome.njk</li>
             <li>writeComment.njk</li>
   </ul>
   <li>
    server.js
   </li>
     <li>
    package.json
   </li>
 
    
   </li>
   </ul>

<h1> Felhasználói dokumentáció </h1>

<b> Futtatáshoz szükséges operációs rendszer:  </b>Tetszőleges operációs rendszer <br>
<b> A futtatáshoz szükséges hardver: </b> Operációs rendszerek szerint megadva <br>
<b> Egyéb követelmények: </b> Internet böngésző <br>

<b> Program használata: </b> <br>
<ol>
<li> Böngészőben nyissuk meg a főoldalt </li>
<li> Regisztráljunk az oldalon, amennyiben azt még nem tettük meg - jobb felső sarokban levő regisztráció gombra kattintva</li>
<li> Amennyiben már regisztráltunk és még nem vagyunk bejelentkezve, úgy jelentkezzünk be a Bejelentkezés gombra kattintva </li>
<li> Bejelentkezés után az Új ToDo gombra kattintva tudunk új feladatot létrehozni </li>
<li> Töltsük ki a ToDo jellemzőit </li>
<li> Hiba esetén az oldal jelezni fogja azt </li>
<li> Mentsük el a ToDo-t </li>
<li> A saját ToDo-im oldalon megjelennek a már létrehozott ToDo-k, valamint a mások által megosztottak is </li>
<li> A ToDo nevére kattintva tudjuk megtekinteni az egyes ToDo-kat </li>
<li> Kész gombbal tudunk törölni egy-egy ToDo-t </li>
<li> Módosít gombbal tudunk módosítani egy-egy ToDo-t </li>
<li> ToDo megtekintése oldalon az új megjegyzés hozzáadása gombra kattintva tudunk új megjegyzést hozzáadni </li>
<li> Az "Új tag hozzáadása" gombra kattintva egy új tagot tudunk hozzáadni a ToDo-nkhoz akivel meg szeretnénk osztani azt </li>
</ol>




# AdonisJs Application

This repo is the pre-configured project structure to be used for creating ambitious web servers using AdonisJs.

> Make sure to star the official [framework repo](https://github.com/adonisjs/adonis-framework) or [tweet on twitter](https://twitter.com/intent/tweet?url=http://adonisjs.com&text=I%20am%20using%20AdonisJs,%20a%20practical%20MVC%20framework%20for%20nodejs&hashtags=nodejs,adonisframework) :wave:

## Story

One day a :boy: wanted to write a web application to slowly turn it into a business and make some :moneybag: for better living. Being a Javascript lover, he decided to go with Node.js. 

Hosting Node.js applications are cheap and offers lots of mordern programming concepts to build realtime data rich applications.

He was so excited and full of energy to build this application and share it with the world. But soon his dreams started struggling with the amount of decisions he has to make, just to build an MVP of his idea. These decisions were not even related to the business and was about.

1. How should I structure my application?
2. Why do I need to download 20 modules just to start an HTTP server, parse request body and upload files.
3. How should I manage the authentication on website, and expose public API for others to interact with the data?
4. What do I need to do to secure my application from web attacks and how to handle CORS?
5. Why do I have ton of `require` statements everywhere?
6. How the heck should I test my code? I am having hard time mocking dependencies.
7. **WHY THE :fish:** there are no standards to write some code. Hell I am not going to write this application and going for a walk.


## Not Anymore

This is so frustating. Node.js is a beautiful language but all of the above questions have never been answered together. We all love writing small concise modules but business are not created by downloading 20 modules.

Developers needs productive tools, so that they can focus on what matters, and not on downloading & finding the best ways to combine these small modules. 

## AdonisJs

AdonisJs is a beautiful framework with pre-configured answers to all of your questions. We not only created this framework, but validated the features of framework with realtime problems and still improving every bit, so that you have to write less and structured code.

This time a :boy: will write his ambitious application and will set the world on :fire:``. Don't hesitate to work on your ideas and we promise to improve the framework every :sunny: and :first_quarter_moon_with_face: and YESSSS do not forget to star us on [:octocat:](https://github.com/adonisjs/adonis-framework)

