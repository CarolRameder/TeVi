<!DOCTYPE html>
<html lang="en">
   <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Global Terrorism</title>
      <link rel="stylesheet" type="text/css" href="app/util/css/index_style.css">
	   <link rel="stylesheet" type="text/css" href="app/util/css/statistics-settings.css">
      <link rel="stylesheet" type="text/css" href="app/util/css/login_style.css">
      <link rel="stylesheet" type="text/css" href="app/util/css/chart_style.css">
      <link rel="stylesheet" type="text/css" href="app/util/css/footer_style.css">
      <link rel="stylesheet" type="text/css" href="app/util/css/map_style.css">
      <link rel="stylesheet" type="text/css" href="app/util/css/team_style.css">
      <link rel="stylesheet" type="text/css" href="app/util/css/about_style.css">

   </head>
   <body>
      <div class="navbar">
         <div class="containerNav">
            <div class="logo_div">
               <span typeof="schema:Project">
                  <meta property="schema:name">
                  <p class="llogo"> TeVi </p>
               </span>
            </div>
			<div class="navbar_links">
				<ul class="meniu">
				<li><a href="#head">Home</a> </li>
            <li id="adminLI"><a href="app/view/admin.html">myTeViAdmin</a></li>
				<li><a href="#section2">About</a> </li>
				<li><a href="#section3">Statistics</a> </li>
				<li><a href="#section5">Maps</a> </li>
				<li><a href="#section4">Team</a> </li>
            <li><a id="loginLI" href="#section1">Log in</a> </li>
				
				</ul>
			</div>
		</div>
     </div>
         <div class="wrapper">
            <div id="head" class="sections">
               <div class="title-content">
			   
                  <h1 class="title">Global terrorism</h1>
                  <h2 class="subtitle">Statistics and more information about terrorist events around the world</h2>
               </div>
            </div>
            <div id="section1" class="sections">
               <div class="content">
			   <span typeof="schema:Register" >
                  <h2 class="titles" id="nav1">Register</h2>
               </span>
              
                  <div class="flexbox" id="idSign">
                     
                       <form action="index.php" method="POST" class="logIn">
                       <input type="hidden" name="actiune" value="LogIn">
                       <input type="hidden" name="loginTried" value="tried">
                        <p class="topText">Login to acces our database !</p>
                        <input class="logInput" id="topfield"  type="text" name="user" placeholder="Username" autocomplete="off">
                        <input class="logInput" type="text" id="password1" name="password" placeholder="Password" autocomplete="off">
                        <button class="logButton" id="fetchBtnLogIn" type="button">Log in</button>
                         <h1 id="wrong">Wrong username or password!</h1>
                        </form>
                        
                        
                        <form action="index.php" method="POST" class=signIn>
                        <input type="hidden" name="actiune" value="SignIn">
                        <p class="topText">Create a new account !</p>
                        <input class="logInput" id="name" type="text" name="name" placeholder="Name" autocomplete="off">
                        <input class="logInput" type="text" id="user" name="user" placeholder="Username" autocomplete="off">
                        <input class="logInput" type="text" id="password" name="password" placeholder="Password" autocomplete="off">
			               <button id="fetchBtnLog" class="logButton" type="button">Sign up</button>
                        </form>
                        

                        
                        
                  </div>
               </div>
            </div>
         </div>
         <div id="section2" class="sections">
            <div class="content">
               <h2 class="titles">Portfolio</h2>
               
               <div id="about"> 
               <div id="aboutPoem">
               "Terrorism attacks are real...<br>
               We can't completely save our nation,<br>
               But at least, our website gives<br>
               the most powerful weapon- information!"<br>
               
               </div>
               <div class="aboutLine1"><hr id="aboutLine"></div>
               
               <div id="aboutDetails">
Our Web app gives you the possibility to create and save your own statistics and maps, by customizing your options.<br>
 We use data from thousands of terrorist attacks from all around the world in order to generate the most accurate statistics and map visualizers.
 <br>
 "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.""Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.""
               </div>
               <hr id="aboutLine2">
               </div>
               
            </div>
         </div>
         <div id="section3" class="sections">
            <div class="content">
               <h2 class="titles" id="nav3">Statistics</h2>
			   <h3 id="nav3">Generate your own chart! Choose the type of chart and the specific statistic you want to use.<br>
			    Besides that, you can customize it by inserting different specific data regarding the attacks.  </h3>
              
               <div id="statistics-form">
               <div id="statisitcs-settings">
			   		<div class="stt-div">
                  <label>Graph me this: </label>
                  <select id="graph-me-this" class="inp-field" name = "graph-me-this" >
                     <option value = "weaptype1_txt" >Number of weapons by category</option>
                     <option value = "country_txt" > Number of events by country </option>
                     <option value = "iyear"> Number of events by year </option>
                     <option value = "targtype1_txt"> Number of events by target type </option>
                     <option value = "attacktype1_txt"> Number of events by attack type </option>
                  </select>
				  </div>
				  <div class="stt-div">
                  <label id="chart-type-label">Chart type &nbsp; &nbsp;</label>
                  <select id = "chartType" class="inp-field" name="chartType">
                     <option value = "pie" >Pie chart</option>
                     <option value = "bar" >Bar chart</option>
                     <option value = "line">Line chart</option>
                  </select>
				  </div>
               </div>
               <div class="statistics-filters">
                  <div class="statistics-column">
                     <label>Years between: </label>
					 <div id="time-interval">
						<input id="year_l" class="inp-field" type="text" name="year_l" >-
						<input id="year_h" class="inp-field" type="text" name="year_h" >
					 </div>
                     <label for="month">Month: </label>
                     <input  id="month" class="inp-field" type="text" name="month">
                     <label for="day">Day:</label>
                     <input id="day" class="inp-field" type="text" name="day">
                     <label for="country">Country:</label>
                     <input id="country" class="inp-field" type="text" name="country">
                     <label for="city">City:</label>
                     <input id="city" class="inp-field" type="text" name="city">
                  </div>
                  <div class="statistics-column">
                     <label for="attacktype1_txt">Attack type</label><br>
                     <select id="attacktype1_txt" class="inp-field" name="attacktype1_txt" >
                        <option value = "" selected="selected">No Value</option>
                        <option value = "Bombing/Explosion" >Bombing/Explosion</option>
                        <option value = "Armed Assault" >Armed Assault</option>
                        <option value = "Assassination">Assassination</option>
                        <option value = "Facility/Infrastructure Attack">Facility/Infrastructure Attack</option>
                        <option value = "Hostage Taking (Kidnapping)">Hostage Taking (Kidnapping)</option>
                        <option value = "Insurgency/Guerilla Action">Insurgency/Guerilla Action</option>
                        <option value = "Hostage Taking (Barricade Incident)">Hostage Taking (Barricade Incident)</option>
                        <option value = "Unarmed Assault">Unarmed Assault</option>
                        <option value = "Hijacking">Hijacking</option>
                     </select>
                     <label for="targtype1_txt">Target type</label><br>
                     <select id="targtype1_txt" class="inp-field"  name = "targtype1_txt" >
                        <option value = "" selected="selected">No Value</option>
                        <option value = "Private Citizens & Property" >Private Citizens & Property</option>
                        <option value = "Business" >Business</option>
                        <option value = "Military">Military</option>
                        <option value = "Government (General)">Government (General)</option>
                        <option value = "Police">Police</option>
                        <option value = "Utilities">Utilities</option>
                        <option value = "Transportation">Transportation</option>
                        <option value = "Government (Diplomatic)">Government (Diplomatic)</option>
                        <option value = "Journalists & Media">Journalists & Media</option>
                        <option value = "Educational Institution">Educational Institution</option>
                        <option value = "Religious Figures/Institutions">Religious Figures/Institutions</option>
                        <option value = "Airports & Aircraft">Airports & Aircraft</option>
                        <option value = "Telecommunication">Telecommunication</option>
                        <option value = "NGO">NGO</option>
                        <option value = "Tourists">Tourists</option>
                        <option value = "Maritime">Maritime</option>
                     </select>
                     <label for="weaptype1_txt">Weapon</label><br>
                     <select id="weaptype1_txt" class="inp-field" name = "weaptype1_txt" >
                        <option value = "" selected="selected">No Value</option>
                        <option value = "Explosives" >Explosives</option>
                        <option value = "Firearms" >Firearms</option>
                        <option value = "Incendiary">Incendiary</option>
                        <option value = "Melee">Melee</option>
                        <option value = "Unknown">Unknown</option>
                     </select>
                     <label for="success">Success</label><br>
                     <select id="success" class="inp-field" name = "success" >
                        <option value = "" selected="selected">No Value</option>
                        <option value = "1" >True</option>
                        <option value = "0" >False</option>
                     </select>
                     <label for="suicide">Suicide</label><br>
                     <select id="suicide" class="inp-field" name = "suicide" >
                        <option value = "" selected="selected">No Value</option>
                        <option value = "1" >True</option>
                        <option value = "0" >False</option>
                     </select>
                  </div>
               </div>
               <button id="fetchBtn" class="setButton" type="button">Chart Me!</button>
            </div>
               <!-- HTML -->
               <div id="chartdiv"><h2 id="chart-text">configure chart options and hit chart me! button to load your statistic here</h2></div>
            </div>
         </div>
         <div id="section5" class="sections">
            <div class="content">
			<span typeof="schema:Map">
			<meta property="schema:author" content="https://www.amcharts.com/javascript-maps/">
               <h2 class="titles">Maps</h2>
            </span>
			   <h3>Generate your own map! You can customize the map by specifying different data regarding the terrorist attacks.  </h3>
             <form action="index.php" method="GET">
               <div class="statistics-filters">
                  <div class="statistics-column">
                     <input type="hidden" name="actiune" value="changeMap">

                     <label>Years between: </label>
                     <div id="time-interval">
                        <input id="year_l1" class="inp-field" type="text" name="year_l1" >-
                        <input id="year_h1" class="inp-field" type="text" name="year_h1" >
                     </div>

                     <label for="month">Month: </label>
                     <input  id="month1"  class="smaller" type="text" name="month1">

                     <label for="day">Day:</label>
                     <input id="day1" class="smaller" type="text" name="day1">
                  </div>

                  <div class="statistics-column">
                     <label for="country">Country:</label>
                     <input id="country1" class="inp-field" type="text" name="country1">

                     <label for="city">City:</label>
                     <input id="city1" class="inp-field" type="text" name="city1">
                  </div>
               </div>
               <button id="fetchBtnMap" class="setButton" type="button">SET</button>
            </form>  
               
               <p>mapa</p>
               <div id="mapdiv">
               <h2 id="authent">configure map options and hit map me! button to load your map here.<h2>
               </div>

         

            </div>
            <div id="section4" class="sections">
               <div class="content" id="teamsParent">
                  <h2 class="titles" id="nav2">Our team</h2>
                  <div class="row">
                     <div class="column">
                        <div class="card">
                           <img src="app/util/resources/images/caarol.jpg" alt="Carol"  id="profileImg">
                           <div class="container">
                              <span typeof="schema:Person" >
                                 <meta property="schema:givenName" content="Carol">
                                 <meta property="schema:familyName" content="Rameder">
                                 <h2 property="schema:name">Carol Rameder</h2>
                              </span>
                              <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                              <a  href="https://www.facebook.com/ramederc">   <img id="socButton" src="app/util/resources/images/facebook.png" alt="" /></a>
                              <a href="mailto:ramederc30@gmail.com">   <img id="socButton" src="app/util/resources/images/google-plus.png" alt="" /></a>
                           </div>
                        </div>
                     </div>
                     <div class="column">
                        <div class="card">
                           <img src="app/util/resources/images/costina.jpg" alt="Costina"  id="profileImg">
                           <div class="container">
                              <span typeof="schema:Person" >
                                 <meta property="schema:givenName" content="Costina">
                                 <meta property="schema:familyName" content="Andrici">
                                 <h2 property="schema:name">Costina Andrici</h2>
                              </span>
                              <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                              <a  href="https://www.facebook.com/costinaa.ioana">   <img id="socButton" src="app/util/resources/images/facebook.png" alt="" /></a>
                              <a href="mailto:Costinaa.ioana18@gmail.com">   <img id="socButton"  src="app/util/resources/images/google-plus.png" alt="" /></a>
                           </div>
                        </div>
                     </div>
                     <div class="column">
                        <div class="card">
                           <img src="app/util/resources/images/stefan.jpg" alt="John" id="profileImg">
                           <div class="container">
                              <span typeof="schema:Person" >
                                 <meta property="schema:givenName" content="Stefan">
                                 <meta property="schema:familyName" content="Moisanu">
                                 <meta property="schema:additionalName" content="Costinescu">
                                 <h2 property="schema:name">Stefan Moisanu</h2>
                              </span>
                              <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                              <a  href="https://www.facebook.com/stef.moisanu">   <img id="socButton" src="app/util/resources/images/facebook.png" alt="" /></a>
                              <a href="mailto:smoisanu@gmail.com">   <img id="socButton"  src="app/util/resources/images/google-plus.png" alt="" /></a>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
      </div>
      <footer class="footer">
         <span typeof="schema:WebSite" >
            <meta property="schema:logo" >
            <a  href="https://www.kaggle.com/START-UMD/gtd">   <img  class="mylogo" src="app/util/resources/images/kaggle-logo.png" alt="" /></a>
         </span>
         <span typeof="schema:CollegeOrUniversity">
            <meta property="schema:logo" >
            <a  href="https://www.info.uaic.ro/">   <img  class="mylogo" src="app/util/resources/images/logo-fii.png" alt="" /></a>
         </span>
         <span typeof="schema:license">
            <meta property="schema:logo" >
            <a  href="https://creativecommons.org/licenses/by-nc-sa/4.0/">   <img  class="mylogo" src="app/util/resources/images/creative commons.png" alt="" /></a>
         </span>
         <p id="copyr" >2020 TeVi . Realizat de Rameder Carol, Moisanu Stefan & Andrici Costina . 	</p>
      </footer >
      <!-- Resources -->
      <script src="https://www.amcharts.com/lib/4/core.js"></script>
      <script src="https://www.amcharts.com/lib/4/charts.js"></script>
      <script src="https://www.amcharts.com/lib/4/themes/dark.js"></script>
      <script src="https://www.amcharts.com/lib/4/themes/animated.js"></script>
      <script src="https://www.amcharts.com/lib/4/maps.js"></script>
	   <script src="https://www.amcharts.com/lib/4/geodata/worldLow.js"></script>
	   <script src="https://www.amcharts.com/lib/4/themes/frozen.js"></script>
      <script src="app/util/js/common-resources.js"></script>
      <script src="app/util/js/form-ajax.js"></script>
      <script src="app/util/js/form-ajax-map.js"></script>
	   <script src="app/util/js/form-ajax-sign-up.js"></script>
      <script src="app/util/js/form-ajax-sign-in.js"></script>
   </body>
</html>