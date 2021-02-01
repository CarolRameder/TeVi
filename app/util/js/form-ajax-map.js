let submitBtn1 = document.getElementById("fetchBtnMap");
let year_l1 = document.getElementById("year_l1");
let year_h1 = document.getElementById("year_h1");
let month1 = document.getElementById("month1");
let day1 = document.getElementById("day1");
let country1 = document.getElementById("country1");
let city1 = document.getElementById("city1");
let mapDiv=document.getElementById("mapdiv");
let mapdata;
let fetched1=false;
let map;
let mmessage = document.getElementById("authent");

submitBtn1.addEventListener("click", onClick);

/**
 * the function sends the users options and gets the specific data afterwards 
 */
function onClick(){
    submitBtn1.setAttribute("disabled", true);
    submitBtn1.textContent = "Loading";
    // CALL

    var payload = {
        iyear_l : year_l1.value,
        iyear_h : year_h1.value,
        imonth : month1.value,
        iday : day1.value,
        country_txt : country1.value,
        city : city1.value
        
    };
    
    var data = new FormData();
    data.append( "json", JSON.stringify( payload ) );

    var authHeader = getCookie('authHash');
    if(authHeader === ""){
        authHeader = 'none';
    }

    fetch("api/map",{ 
        method:"POST",
        headers: new Headers({
            'Authorization': authHeader
          }),  
        body: JSON.stringify(payload)})
        .then(function (resp) {
            if(resp.status == 401){
                return null;
            }
            return resp.json();
        })
        .then(function (jsonResp) {
            submitBtn1.removeAttribute("disabled");
            submitBtn1.textContent = 'Map Me!';
            console.log(jsonResp);
            if(jsonResp != null){
                mapData = jsonResp;
                fetched1 = true;
                return true;
           
            }
            return false;
        })
        .then(function(mapDataIsSet) {
            if(mapDataIsSet)
            {
                loadMap();
                
            }
            else{
                mmessage.innerHTML = "You must be logged in to view maps";
            }
            mapDiv.scrollIntoView();
        })
        .catch(function (err) {
            console.log(err);
        })
    
   
    
}


var previous = "";

chartType.addEventListener("click", function () {
    if (previous.localeCompare(chartType.value) != 0 && fetched1){
       loadMap();  
}

previous = chartType.value;

}
);

/**
 * 
 * the function makes the dots pulse
 * 
 */
function animateBullet(circle) {
    var animation = circle.animate([{ property: "scale", from: 1, to: 5 }, { property: "opacity", from: 1, to: 0 }], 1000, am4core.ease.circleOut);
    animation.events.on("animationended", function(event){
      animateBullet(event.target.object);
    })
}

function loadMap(){
    loadLineMap(mapData);   
}

/**
 * the function generates the map using the specific data 
 */
function loadLineMap(mapData){
    am4core.ready(function() {

        // Themes begin
        am4core.useTheme(am4themes_frozen);
        am4core.useTheme(am4themes_animated);
        // Themes end
    
       // Create map instance
        var map = am4core.create("mapdiv", am4maps.MapChart);
    
      
        // Set map definition
        map.geodata = am4geodata_worldLow;

        // Set projection
        map.projection = new am4maps.projections.Miller();

        // Create map polygon series
        var polygonSeries = map.series.push(new am4maps.MapPolygonSeries());

        // Exclude Antartica
        polygonSeries.exclude = ["AQ"];

        // Make map load polygon (like country names) data from GeoJSON
        polygonSeries.useGeodata = true;

        // Configure series
        var polygonTemplate = polygonSeries.mapPolygons.template;
        polygonTemplate.tooltipText = "{name}";
        polygonTemplate.polygon.fillOpacity = 0.6;


        // Create hover state and set alternative fill color
        var hs = polygonTemplate.states.create("hover");
        hs.properties.fill = map.colors.getIndex(0);


        var imageSeries = map.series.push(new am4maps.MapImageSeries());
        imageSeries.mapImages.template.propertyFields.longitude = "longitude";
        imageSeries.mapImages.template.propertyFields.latitude = "latitude";
        imageSeries.mapImages.template.tooltipText = "{title}";
        //imageSeries.mapImages.template.propertyFields.url = "url";

        var circle = imageSeries.mapImages.template.createChild(am4core.Circle);
        circle.radius = 3;
        circle.propertyFields.fill = "color";

        var circle2 = imageSeries.mapImages.template.createChild(am4core.Circle);
        circle2.radius = 3;
        circle2.propertyFields.fill = "color";


        circle2.events.on("inited", function(event){
          animateBullet(event.target);
        })

        //var colorSet = new am4core.ColorSet();

        imageSeries.data =mapData;

        //exporting the map
        map.exporting.menu = new am4core.ExportMenu();
        map.exporting.menu.items[0].icon = "app/util/resources/images/export-button.png";
        map.exporting.menu.align = "left";
        map.exporting.menu.verticalAlign = "top";

    }); 

}