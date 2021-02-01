let submitBtn = document.getElementById("fetchBtn");
let graphMeThis = document.getElementById("graph-me-this");
let year_l = document.getElementById("year_l");
let year_h = document.getElementById("year_h");
let month = document.getElementById("month");
let day = document.getElementById("day");
let country = document.getElementById("country");
let city = document.getElementById("city");
let success = document.getElementById("success");
let suicide = document.getElementById("suicide");
let attacktype1_txt = document.getElementById("attacktype1_txt");
let targtype1_txt = document.getElementById("targtype1_txt"); 
let weaptype1_txt = document.getElementById("weaptype1_txt");
let chartdata;
let fetched=false;
let chartType = document.getElementById("chartType");
let chart;
let chartDiv = document.getElementById("chartdiv");
let message = document.getElementById("chart-text");


submitBtn.addEventListener("click", onClick);
function onClick(){
    // LOADING STATE
    submitBtn.setAttribute("disabled", true);
    submitBtn.textContent = "Loading";
    // CALL

   
    var payload = {
        column : graphMeThis.value,
        iyear_l : year_l.value,
        iyear_h : year_h.value,
        imonth : month.value,
        iday : day.value,
        country_txt : country.value,
        city : city.value,
        success : success.value,
        suicide : suicide.value,
        attacktype1_txt : attacktype1_txt.value,
        targtype1_txt : targtype1_txt.value,
        weaptype1_txt : weaptype1_txt.value
        
    
    };
    
    var data = new FormData();
    data.append( "json", JSON.stringify( payload ) );

    var authHeader = getCookie('authHash');
    if(authHeader === ""){
        authHeader = 'none';
    }
    fetch("api/statistics",{ 
        method:"POST",
        headers: new Headers({
            'Authorization': authHeader
          }),  
        body: JSON.stringify(payload)})
        .then(function (resp) {
            //user is not logged in
            if(resp.status == 401){
                message.innerHTML = "You must be logged in to access statistics";
                return null;
            }
            if(resp.status == 204){
                message.innerHTML = "There is no data matching your criteria. Try a different combination of filters";
                return null;
            }
            return resp.json();
        })
        .then(function (jsonResp) {
           //console.log(jsonResp);
            // REMOVE LOADING STATE
            submitBtn.removeAttribute("disabled");
            submitBtn.textContent = 'Chart Me!';
            if(jsonResp != null){
                chartData = jsonResp;
                //console.log(jsonResp);
                fetched = true;
                return true;
            }
              
              return false;
           
        })
        .then(function(chartDataIsSet) {
            if(chartDataIsSet){
                loadChart();
                
            }
            
            chartDiv.scrollIntoView();
        })
        .catch(function (err) {
            console.log(err);
        })
    
   
    
}
var previous = "";

chartType.addEventListener("click", function () {
    if (previous.localeCompare(chartType.value) != 0 && fetched){
       loadChart();  
}
previous = chartType.value;

}
);


function loadChart(){
    if (typeof chart !== 'undefined'){
        chart.dispose();
    }
    if (chartType.value.localeCompare("pie") === 0){
        loadPieChart(chartData);
    }
    else if (chartType.value.localeCompare("bar") === 0){
        loadBarChart(chartData);
    }
    else if(chartType.value.localeCompare("line") === 0){
        loadLineChart(chartData);
    }
}

function loadPieChart(chartData){
    am4core.ready(function() {

        am4core.useTheme(am4themes_dark);
        chart = am4core.create("chartdiv", am4charts.PieChart3D);
        chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

        chart.legend = new am4charts.Legend();
        
        chart.data = chartData;


        var series = chart.series.push(new am4charts.PieSeries3D());
        series.dataFields.value = "value";
        series.dataFields.category = "to_graph";
        chart.exporting.menu = new am4core.ExportMenu();
        chart.exporting.menu.items[0].icon = "app/util/resources/images/export-button.png";
        chart.exporting.menu.align = "left";
        chart.exporting.menu.verticalAlign = "top";
        chart.exporting.formatOptions.getKey("jpg").disabled = true;
        chart.exporting.formatOptions.getKey("pdf").disabled = true;
        chart.exporting.formatOptions.getKey("json").disabled = true;
        chart.exporting.formatOptions.getKey("html").disabled = true;
        chart.exporting.formatOptions.getKey("xlsx").disabled = true;
        chart.exporting.formatOptions.getKey("print").disabled = true;
        }); // end am4core.ready()
}

function loadBarChart(chartData){
    am4core.ready(function() {

        am4core.useTheme(am4themes_dark);

        // Themes end
    
        // Create chart instance
                    chart = am4core.create("chartdiv", am4charts.XYChart3D);
    
        // Add data
                    
                    chart.data = chartData;
    
        // Create axes
                    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
                    categoryAxis.dataFields.category = "to_graph";
                    categoryAxis.renderer.labels.template.rotation = 270;
                    categoryAxis.renderer.labels.template.hideOversized = false;
                    categoryAxis.renderer.minGridDistance = 20;
                    categoryAxis.renderer.labels.template.horizontalCenter = "right";
                    categoryAxis.renderer.labels.template.verticalCenter = "middle";
                    categoryAxis.tooltip.label.rotation = 270;
                    categoryAxis.tooltip.label.horizontalCenter = "right";
                    categoryAxis.tooltip.label.verticalCenter = "middle";
    
                    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
                    valueAxis.title.text = "Value";
                    valueAxis.title.fontWeight = "bold";
    
        // Create series
                    var series = chart.series.push(new am4charts.ColumnSeries3D());
                    series.dataFields.valueY = "value";
                    series.dataFields.categoryX = "to_graph";
                    series.name = "Visits";
                    series.tooltipText = "{categoryX}: [bold]{valueY}[/]";
                    series.columns.template.fillOpacity = .8;
    
                    var columnTemplate = series.columns.template;
                    columnTemplate.strokeWidth = 2;
                    columnTemplate.strokeOpacity = 1;
                    columnTemplate.stroke = am4core.color("#FFFFFF");
    
                    columnTemplate.adapter.add("fill", function(fill, target) {
                        return chart.colors.getIndex(target.dataItem.index);
                    })
    
                    columnTemplate.adapter.add("stroke", function(stroke, target) {
                        return chart.colors.getIndex(target.dataItem.index);
                    })
    
                    chart.cursor = new am4charts.XYCursor();
                    chart.cursor.lineX.strokeOpacity = 0;
                    chart.cursor.lineY.strokeOpacity = 0;
    
                    chart.exporting.menu = new am4core.ExportMenu();
                    chart.exporting.menu.align = "left";
                    chart.exporting.menu.verticalAlign = "top";
                    chart.exporting.formatOptions.getKey("jpg").disabled = true;
                    chart.exporting.formatOptions.getKey("pdf").disabled = true;
                    chart.exporting.formatOptions.getKey("json").disabled = true;
                    chart.exporting.formatOptions.getKey("html").disabled = true;
                    chart.exporting.formatOptions.getKey("xlsx").disabled = true;
                    chart.exporting.formatOptions.getKey("print").disabled = true;
                    am4core.color("#f00", 0)
                }); // end am4core.ready()
}

function loadLineChart(chartData){
    am4core.ready(function() {

        am4core.useTheme(am4themes_dark);
 
        // Themes end
    
        // Create chart instance
                    
                    chart = am4core.create("chartdiv", am4charts.XYChart);
    
    
        // Add data
                    chart.data = chartData;
    
        // Create axes
                    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
                    categoryAxis.dataFields.category = "to_graph";
    
                    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    
        // Create series
                    var series = chart.series.push(new am4charts.LineSeries());
                    series.dataFields.valueY = "value";
                    series.dataFields.categoryX = "to_graph";
                    series.strokeDasharray = 3;
                    series.strokeWidth = 3
                    series.strokeOpacity = 1;
                    series.strokeDasharray = "3,3"
    
                    var bullet = series.bullets.push(new am4charts.CircleBullet());
                    bullet.strokeWidth = 2;
                    bullet.stroke = am4core.color("#fff");
                    bullet.setStateOnChildren = true;
                    bullet.propertyFields.fillOpacity = "opacity";
                    bullet.propertyFields.strokeOpacity = "opacity";
    
                    var hoverState = bullet.states.create("hover");
                    hoverState.properties.scale = 1.7;
    
    
                }); // end am4core.ready()

                
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

