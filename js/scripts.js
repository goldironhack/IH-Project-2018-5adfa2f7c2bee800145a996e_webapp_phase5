// Mandatory datasets

const neighborhoodNamesGIS = "https://data.cityofnewyork.us/api/views/xyye-rtrs/rows.json?accessType=DOWNLOAD";
const NYDistrictsGeoshapes = "https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/nycd/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=geojson";
const CrimesInNY = "https://data.cityofnewyork.us/resource/9s4h-37hy.json?cmplnt_fr_dt=2015-12-31T00:00:00.000";
const NYCityHousing = "https://data.cityofnewyork.us/api/views/hg8x-zxpr/rows.json?accessType=DOWNLOAD";

// Optional datasets

const NYCityMuseums = "https://data.cityofnewyork.us/api/views/fn6f-htvy/rows.json?accessType=DOWNLOAD";

var housingData;
var crimesData;
var museumsData;
var populationData;
var centroidsData;

// map insertion
var clicked;
var university = {lat: 40.7291, lng: -73.9965};
var map;

function initMap() {
     map = new google.maps.Map(document.getElementById('Gmap'), {
          zoom: 10.3,
          center: university,
          disableDefaultUI: true,
          disableDoubleClickZoom: false,
          draggable: false,
          styles:
          [
               {
                    "elementType": "geometry",
                    "stylers": [
                         {
                              "color": "#ebe3cd"
                         }
                    ]
               },
               {
                    "elementType": "labels.text.fill",
                    "stylers": [
                         {
                              "color": "#523735"
                         }
                    ]
               },
               {
                    "elementType": "labels.text.stroke",
                    "stylers": [
                         {
                              "color": "#f5f1e6"
                         }
                    ]
               },
               {
                    "featureType": "administrative",
                    "elementType": "geometry.stroke",
                    "stylers": [
                         {
                              "color": "#c9b2a6"
                         }
                    ]
               },
               {
                    "featureType": "administrative.land_parcel",
                    "stylers": [
                         {
                              "visibility": "off"
                         }
                    ]
               },
               {
                    "featureType": "administrative.land_parcel",
                    "elementType": "geometry.stroke",
                    "stylers": [
                         {
                              "color": "#dcd2be"
                         }
                    ]
               },
               {
                    "featureType": "administrative.land_parcel",
                    "elementType": "labels.text.fill",
                    "stylers": [
                         {
                              "color": "#ae9e90"
                         }
                    ]
               },
               {
                    "featureType": "administrative.neighborhood",
                    "stylers": [
                         {
                              "visibility": "off"
                         }
                    ]
               },
               {
                    "featureType": "landscape.natural",
                    "elementType": "geometry",
                    "stylers": [
                         {
                              "color": "#dfd2ae"
                         }
                    ]
               },
               {
                    "featureType": "poi",
                    "elementType": "geometry",
                    "stylers": [
                         {
                              "color": "#dfd2ae"
                         }
                    ]
               },
               {
                    "featureType": "poi",
                    "elementType": "labels.text",
                    "stylers": [
                         {
                              "visibility": "off"
                         }
                    ]
               },
               {
                    "featureType": "poi",
                    "elementType": "labels.text.fill",
                    "stylers": [
                         {
                              "color": "#93817c"
                         }
                    ]
               },
               {
                    "featureType": "poi.business",
                    "stylers": [
                         {
                              "visibility": "off"
                         }
                    ]
               },
               {
                    "featureType": "poi.park",
                    "elementType": "geometry.fill",
                    "stylers": [
                         {
                              "color": "#a5b076"
                         }
                    ]
               },
               {
                    "featureType": "poi.park",
                    "elementType": "labels.text.fill",
                    "stylers": [
                         {
                              "color": "#447530"
                         }
                    ]
               },
               {
                    "featureType": "road",
                    "elementType": "geometry",
                    "stylers": [
                         {
                              "color": "#f5f1e6"
                         }
                    ]
               },
               {
                    "featureType": "road",
                    "elementType": "labels",
                    "stylers": [
                         {
                              "visibility": "off"
                         }
                    ]
               },
               {
                    "featureType": "road",
                    "elementType": "labels.icon",
                    "stylers": [
                         {
                              "visibility": "off"
                         }
                    ]
               },
               {
                    "featureType": "road.arterial",
                    "stylers": [
                         {
                              "visibility": "off"
                         }
                    ]
               },
               {
                    "featureType": "road.arterial",
                    "elementType": "geometry",
                    "stylers": [
                         {
                              "color": "#fdfcf8"
                         }
                    ]
               },
               {
                    "featureType": "road.highway",
                    "elementType": "geometry",
                    "stylers": [
                         {
                              "color": "#f8c967"
                         }
                    ]
               },
               {
                    "featureType": "road.highway",
                    "elementType": "geometry.stroke",
                    "stylers": [
                         {
                              "color": "#e9bc62"
                         }
                    ]
               },
               {
                    "featureType": "road.highway",
                    "elementType": "labels",
                    "stylers": [
                         {
                              "visibility": "off"
                         }
                    ]
               },
               {
                    "featureType": "road.highway.controlled_access",
                    "elementType": "geometry",
                    "stylers": [
                         {
                              "color": "#e98d58"
                         }
                    ]
               },
               {
                    "featureType": "road.highway.controlled_access",
                    "elementType": "geometry.stroke",
                    "stylers": [
                         {
                              "color": "#db8555"
                         }
                    ]
               },
               {
                    "featureType": "road.local",
                    "stylers": [
                         {
                              "visibility": "off"
                         }
                    ]
               },
               {
                    "featureType": "road.local",
                    "elementType": "labels.text.fill",
                    "stylers": [
                         {
                              "color": "#806b63"
                         }
                    ]
               },
               {
                    "featureType": "transit",
                    "stylers": [
                         {
                              "visibility": "off"
                         }
                    ]
               },
               {
                    "featureType": "transit.line",
                    "elementType": "geometry",
                    "stylers": [
                         {
                              "color": "#dfd2ae"
                         }
                    ]
               },
               {
                    "featureType": "transit.line",
                    "elementType": "labels.text.fill",
                    "stylers": [
                         {
                              "color": "#8f7d77"
                         }
                    ]
               },
               {
                    "featureType": "transit.line",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                         {
                              "color": "#ebe3cd"
                         }
                    ]
               },
               {
                    "featureType": "transit.station",
                    "elementType": "geometry",
                    "stylers": [
                         {
                              "color": "#dfd2ae"
                         }
                    ]
               },
               {
                    "featureType": "water",
                    "elementType": "geometry.fill",
                    "stylers": [
                         {
                              "color": "#b9d3c2"
                         }
                    ]
               },
               {
                    "featureType": "water",
                    "elementType": "labels.text",
                    "stylers": [
                         {
                              "visibility": "off"
                         }
                    ]
               },
               {
                    "featureType": "water",
                    "elementType": "labels.text.fill",
                    "stylers": [
                         {
                              "color": "#92998d"
                         }
                    ]
               }
          ]
     });
     var Umarker = new google.maps.Marker({
          position: university,
          map: map,
          icon: "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=NYU|640d94|000000"
     });

     map.data.addListener('click', function(event) {
          clicked = event.feature.getProperty('BoroCD');
          if(clicked % 100 < 20){
               changeCharts(clicked);
               map.data.revertStyle();
               map.data.overrideStyle(event.feature,{
                    strokeWeight: 1,
                    fillOpacity: 0.8
               });
          }else{
          }
     });

     map.data.addListener('mouseover', function(event) {
          map.data.revertStyle();
          map.data.overrideStyle(event.feature,{
               strokeWeight: 0.8,
               fillOpacity: 0.8
          });
     });

     map.data.loadGeoJson(NYDistrictsGeoshapes);

     map.data.setStyle(function(feature){
          var color;
          var opacity = 0.6;
          var borders = 0.4;
          if(feature.getProperty("BoroCD") > 100 && feature.getProperty("BoroCD") < 120 ){
               color = "#fbf926";
          }else if(feature.getProperty("BoroCD") > 200 && feature.getProperty("BoroCD") < 220 ){
               color = "#6ded2c";
          }else if(feature.getProperty("BoroCD") > 300 && feature.getProperty("BoroCD") < 320 ){
               color = "#2cb9ed";
          }else if(feature.getProperty("BoroCD") > 400 && feature.getProperty("BoroCD") < 420 ){
               color = "#ff1818";
          }else if(feature.getProperty("BoroCD") > 500 && feature.getProperty("BoroCD") < 520 ){
               color = "#f58136";
          }else{
               color = "#000000";
               opacity = 0;
               borders = 0;
          }
          return ({
               fillOpacity: opacity,
               fillColor: color,
               strokeWeight: borders
          });
     });

     function addMark(point){
          var kmarker = new google.maps.Marker({
               position: point,
               map: map,
          });
     }

}
// data manipulation
var prueba = {
     101:['Manhatan','MN-01',0,0,0,0,0,0,[],0],
     102:['Manhatan','MN-02',0,0,0,0,0,0,[],0],
     103:['Manhatan','MN-03',0,0,0,0,0,0,[],0],
     104:['Manhatan','MN-04',0,0,0,0,0,0,[],0],
     105:['Manhatan','MN-05',0,0,0,0,0,0,[],0],
     106:['Manhatan','MN-06',0,0,0,0,0,0,[],0],
     107:['Manhatan','MN-07',0,0,0,0,0,0,[],0],
     108:['Manhatan','MN-08',0,0,0,0,0,0,[],0],
     109:['Manhatan','MN-09',0,0,0,0,0,0,[],0],
     110:['Manhatan','MN-10',0,0,0,0,0,0,[],0],
     111:['Manhatan','MN-11',0,0,0,0,0,0,[],0],
     112:['Manhatan','MN-12',0,0,0,0,0,0,[],0],

     201:['Bronx','BX-01',0,0,0,0,0,0,[],0],
     202:['Bronx','BX-02',0,0,0,0,0,0,[],0],
     203:['Bronx','BX-03',0,0,0,0,0,0,[],0],
     204:['Bronx','BX-04',0,0,0,0,0,0,[],0],
     205:['Bronx','BX-05',0,0,0,0,0,0,[],0],
     206:['Bronx','BX-06',0,0,0,0,0,0,[],0],
     207:['Bronx','BX-07',0,0,0,0,0,0,[],0],
     208:['Bronx','BX-08',0,0,0,0,0,0,[],0],
     209:['Bronx','BX-09',0,0,0,0,0,0,[],0],
     210:['Bronx','BX-10',0,0,0,0,0,0,[],0],
     211:['Bronx','BX-11',0,0,0,0,0,0,[],0],
     212:['Bronx','BX-12',0,0,0,0,0,0,[],0],

     301:['Brooklin','BK-01',0,0,0,0,0,0,[],0],
     302:['Brooklin','BK-02',0,0,0,0,0,0,[],0],
     303:['Brooklin','BK-03',0,0,0,0,0,0,[],0],
     304:['Brooklin','BK-04',0,0,0,0,0,0,[],0],
     305:['Brooklin','BK-05',0,0,0,0,0,0,[],0],
     306:['Brooklin','BK-06',0,0,0,0,0,0,[],0],
     307:['Brooklin','BK-07',0,0,0,0,0,0,[],0],
     308:['Brooklin','BK-08',0,0,0,0,0,0,[],0],
     309:['Brooklin','BK-09',0,0,0,0,0,0,[],0],
     310:['Brooklin','BK-10',0,0,0,0,0,0,[],0],
     311:['Brooklin','BK-11',0,0,0,0,0,0,[],0],
     312:['Brooklin','BK-12',0,0,0,0,0,0,[],0],
     313:['Brooklin','BK-13',0,0,0,0,0,0,[],0],
     314:['Brooklin','BK-14',0,0,0,0,0,0,[],0],
     315:['Brooklin','BK-15',0,0,0,0,0,0,[],0],
     316:['Brooklin','BK-16',0,0,0,0,0,0,[],0],
     317:['Brooklin','BK-17',0,0,0,0,0,0,[],0],
     318:['Brooklin','BK-18',0,0,0,0,0,0,[],0],

     401:['Queens','QN-01',0,0,0,0,0,0,[],0],
     402:['Queens','QN-02',0,0,0,0,0,0,[],0],
     403:['Queens','QN-03',0,0,0,0,0,0,[],0],
     404:['Queens','QN-04',0,0,0,0,0,0,[],0],
     405:['Queens','QN-05',0,0,0,0,0,0,[],0],
     406:['Queens','QN-06',0,0,0,0,0,0,[],0],
     407:['Queens','QN-07',0,0,0,0,0,0,[],0],
     408:['Queens','QN-08',0,0,0,0,0,0,[],0],
     409:['Queens','QN-09',0,0,0,0,0,0,[],0],
     410:['Queens','QN-10',0,0,0,0,0,0,[],0],
     411:['Queens','QN-11',0,0,0,0,0,0,[],0],
     412:['Queens','QN-12',0,0,0,0,0,0,[],0],
     413:['Queens','QN-13',0,0,0,0,0,0,[],0],
     414:['Queens','QN-14',0,0,0,0,0,0,[],0],

     501:['Staten Island','SI-01',0,0,0,0,0,0,[],0],
     502:['Staten Island','SI-02',0,0,0,0,0,0,[],0],
     503:['Staten Island','SI-03',0,0,0,0,0,0,[],0],

}

function getDataFromHousing(){
     housingData = $.getJSON(NYCityHousing,function(){
          console.log(housingData);
     })
     .done(function(){
          getDataFromCentroids();
     })
     .fail(function(error){
          console.error(error);
     });
}

function getDataFromCentroids(){
     centroidsData = $.getJSON(neighborhoodNamesGIS,function(){
          console.log(centroidsData);
     })
     .done(function(){
          getDataFromCrimes();
     })
     .fail(function(error){
          console.error(error);
     });
}

function getDataFromCrimes(){
     crimesData = $.getJSON(CrimesInNY,function(){
          console.log(crimesData);
     })
     .done(function(){
          getDataFromMuseums();
     })
     .fail(function(error){
          console.error(error);
     });
}

function getDataFromMuseums(){
     museumsData = $.getJSON(NYCityMuseums,function(){
          console.log(museumsData);
     })
     .done(function(){
          getDataFromGEO();
     })
     .fail(function(error){
          console.error(error);
     });
}

function getDataFromGEO(){
     geoData = $.getJSON(NYDistrictsGeoshapes,function(){
          console.log(geoData);
     })
     .done(function(){
          initMetrics();
     })
     .fail(function(error){
          console.error(error);
     });
}

function changeCharts(Boro) {
     document.getElementById("currentDistrict").innerHTML = prueba[Boro][1];
     updateGauge1(prueba[Boro][3]);
     updateGauge2(prueba[Boro][4]);
     updateGauge3(prueba[Boro][5]);
}

var BigTable = document.getElementById("sortingTable");

window.onload = getDataFromHousing();

function initNames(){
     for (var dist in prueba) {
          var trow = BigTable.insertRow();
          var c = 6;
          for (info of prueba[dist]) {
               if(c>=0){
                    var tcell = trow.insertCell();
                    tcell.innerHTML = info;
                    tcell.style.background = "white";
               }
               c--;
          }
     }
     console.log(prueba);

}

function initMetrics(){
     createPolygons();
     initCost();
     initDistance();
     initSecurity();
     initMuseums();
     initPopulation();
     initAverage();
     initTops();
     initNames();
}

function initAverage(){
     for (var dist in prueba){
          prueba[dist][2] = parseInt((prueba[dist][3]+prueba[dist][4]+prueba[dist][5])/3);
     }
     var ordenar = [];
     for (var dist in prueba){
          ordenar.push({
               "disName" : prueba[dist][1],
               "dispoints" : prueba[dist][2]
          });
     }
     ordenar.sort(function(a,b){
          var aPoints = a.dispoints;
          var bPoints = b.dispoints;
          return aPoints >= bPoints ? -1:1;
     });
     updatebartop(ordenar);
}

function createPolygons(){
     workable1 = geoData['responseJSON'];
     workable2 = workable1['features'];
     for(pol of workable2){
          polBoro = pol.properties.BoroCD;
          polPoly = pol.geometry.type;
          polCoords = pol.geometry.coordinates;
          if((polBoro%100)<=20 &&(polBoro%100)>=0){
               if (polPoly == "Polygon") {
                    var pushing = [];
                    for (pol of polCoords[0]) {
                         pushing.push(new google.maps.LatLng(parseFloat(pol[1]),parseFloat(pol[0])));
                    }
                    prueba[polBoro][8].push(new google.maps.Polygon({
                         path: pushing
                    }));
               }else{
                    for (sub of polCoords) {
                         var subpush = [];
                         for (pol of sub[0]) {
                              subpush.push(new google.maps.LatLng(parseFloat(pol[1]),parseFloat(pol[0])));
                         }
                         prueba[polBoro][8].push(new google.maps.Polygon({
                              path: subpush
                         }));
                    }
               }
          }
     }
}

function initSecurity(){
     workable1 = crimesData["responseJSON"];
     for (var crime in workable1) {
          if(workable1[crime].hasOwnProperty("latitude")){
               var point = new google.maps.LatLng(parseFloat(workable1[crime].latitude),parseFloat(workable1[crime].longitude));
               kappa:
               for (var dist in prueba) {
                    polygons = prueba[dist][8];
                    for(pol in polygons){
                         if(google.maps.geometry.poly.containsLocation(point , polygons[pol])){
                              prueba[dist][4]++;
                              break kappa;
                         }
                    }
               }
          }
     }
     var max = 0;
     for (var dist in prueba){
          if(prueba[dist][4] >= max){
               max = prueba[dist][4];
          }
     }
     for (var dist in prueba){
          prueba[dist][4] = parseInt((prueba[dist][4]/max)*100);
     }

}

function initCost(){
     var workable1 = housingData['responseJSON'];
     var workable2 = workable1['data'];
     for (variable of workable2) {
          for (var dist in prueba){
               if(prueba[dist][1] == variable[19]){
                    //33
                    prueba[dist][3] += parseInt(variable[33]);
               }
          }
     }
     var max = 0;
     for (var dist in prueba){
          if(prueba[dist][3] >= max){
               max = prueba[dist][3];
          }
     }
     for (var dist in prueba){
          prueba[dist][3] = parseInt((prueba[dist][3]/max)*100);
     }
}

function initDistance(){
     var commonPoint = new google.maps.LatLng(parseFloat(40.7291),parseFloat(-73.9965));
     var workable1 = centroidsData['responseJSON'];
     var workable2 = workable1['data'];
     for (variable of workable2){
          var coord1 = variable[9].substring(variable[9].indexOf('(')+1,variable[9].lastIndexOf(' '));
          var coord2 = variable[9].substring(variable[9].lastIndexOf(' ')+1,variable[9].lastIndexOf(')'));
          var centroid =  new google.maps.LatLng(parseFloat(coord2),parseFloat(coord1));
          var distance = google.maps.geometry.spherical.computeDistanceBetween (commonPoint, centroid);
          kappa:
          for (var dist in prueba) {
               polygons = prueba[dist][8];
               for(pol in polygons){
                    if(google.maps.geometry.poly.containsLocation(centroid , polygons[pol])){
                         prueba[dist][5] += distance;
                         prueba[dist][9]++;
                         break kappa;
                    }
               }
          }
     }
     var min = prueba[101][5];
     for (var dist in prueba){
          if(prueba[dist][5] <= min){
               min = prueba[dist][5];
          }
     }
     for (var dist in prueba){
          prueba[dist][5] = parseInt((prueba[dist][5]/min)*100);
     }
     for (var dist in prueba){
          prueba[dist][5] = 15000 - prueba[dist][5];
     }
     var max = 0;
     for (var dist in prueba){
          if(prueba[dist][5] >= max){
               max = prueba[dist][5];
          }
     }
     for (var dist in prueba){
          prueba[dist][5] = parseInt((prueba[dist][5]/max)*100);
     }

     //google.maps.geometry.spherical.computeDistanceBetween(lat1,lat2);
     //google.maps.geometry.poly.containsLocation(coord,poly);
}

function initMuseums(){
     var workable1 = centroidsData['responseJSON'];
     var workable2 = workable1['data'];
     for (variable of workable2){
          var coord1 = variable[9].substring(variable[9].indexOf('(')+1,variable[9].lastIndexOf(' '));
          var coord2 = variable[9].substring(variable[9].lastIndexOf(' ')+1,variable[9].lastIndexOf(')'));
          var centroid =  new google.maps.LatLng(parseFloat(coord2),parseFloat(coord1));
          kappa:
          for (var dist in prueba) {
               polygons = prueba[dist][8];
               for(pol in polygons){
                    if(google.maps.geometry.poly.containsLocation(centroid , polygons[pol])){
                         prueba[dist][6]++;
                         break kappa;
                    }
               }
          }
     }
}

function initPopulation(){

}

function initTops(){
     initTopCost();
     initTopDistance();
     initTopSafety();
     initTopAverage();
}

function initTopCost(){
     var ordenar = [];
     for (var dist in prueba){
          ordenar.push({
               "disName" : prueba[dist][1],
               "dispoints" : prueba[dist][3]
          });
     }
     ordenar.sort(function(a,b){
          var aPoints = a.dispoints;
          var bPoints = b.dispoints;
          return aPoints >= bPoints ? -1:1;
     });
     updatebar2(ordenar);
}

function initTopDistance(){
     var ordenar = [];
     for (var dist in prueba){
          ordenar.push({
               "disName" : prueba[dist][1],
               "dispoints" : prueba[dist][5]
          });
     }
     ordenar.sort(function(a,b){
          var aPoints = a.dispoints;
          var bPoints = b.dispoints;
          return aPoints >= bPoints ? -1:1;
     });
     updatebar4(ordenar);
}

function initTopSafety(){
     var ordenar = [];
     for (var dist in prueba){
          ordenar.push({
               "disName" : prueba[dist][1],
               "dispoints" : prueba[dist][4]
          });
     }
     ordenar.sort(function(a,b){
          var aPoints = a.dispoints;
          var bPoints = b.dispoints;
          return aPoints >= bPoints ? -1:1;
     });
     updatebar3(ordenar);
}

function initTopAverage(){

}

function testFunc(){
     updatebar2(90,"kappa1",80,"kappa2",70,"kappa3");
}

//graphics

var transit = d3.transition().duration(800);

var chartcolor = '#82B2BE';
var separatorcolor = '#591D0E';

var gaugesheight = 150;
var gaugeswidth = "100%";

var gauge1container = d3.select("#chart1").append("svg").attr("width",gaugeswidth).attr("height",gaugesheight);
var separator1 = gauge1container.append("rect").attr("x",0).attr("y",100).attr("width","100%").attr("height",5).attr("fill",separatorcolor);
var gaugechart1 = gauge1container.append("rect").attr("x",0).attr("y",0).attr("width",0).attr("height",100).attr("fill",chartcolor);
var gaugechart1text = gauge1container.append("text").attr("x","40%").attr("y",130).attr("font-family","Gloria Hallelujah").attr("font-size","20px").attr("fill",separatorcolor).text("[ 0 ]");

function updateGauge1(input){
     gaugechart1.transition(transit).attr("width",0);
     gaugechart1.transition(transit).attr("width", input+"%" );
     gaugechart1text.transition(transit).text("[ "+input+" ]");
}

var gauge2container = d3.select("#chart2").append("svg").attr("width",gaugeswidth).attr("height",gaugesheight);
var separator2 = gauge2container.append("rect").attr("x",0).attr("y",100).attr("width","100%").attr("height",5).attr("fill",separatorcolor);
var gaugechart2 = gauge2container.append("rect").attr("x",0).attr("y",0).attr("width",0).attr("height",100).attr("fill",chartcolor);
var gaugechart2text = gauge2container.append("text").attr("x","40%").attr("y",130).attr("font-family","Gloria Hallelujah").attr("font-size","20px").attr("fill",separatorcolor).text("[ 0 ]");

function updateGauge2(input){
     gaugechart2.transition(transit).attr("width",0);
     gaugechart2.transition(transit).attr("width", input+"%" );
     gaugechart2text.transition(transit).text("[ "+input+" ]");
}

var gauge3container = d3.select("#chart3").append("svg").attr("width",gaugeswidth).attr("height",gaugesheight);
var separator3 = gauge3container.append("rect").attr("x",0).attr("y",100).attr("width","100%").attr("height",5).attr("fill",separatorcolor);
var gaugechart3 = gauge3container.append("rect").attr("x",0).attr("y",0).attr("width",0).attr("height",100).attr("fill",chartcolor);
var gaugechart3text = gauge3container.append("text").attr("x","40%").attr("y",130).attr("font-family","Gloria Hallelujah").attr("font-size","20px").attr("fill",separatorcolor).text("[ 0 ]");

function updateGauge3(input){
     gaugechart3.transition(transit).attr("width",0);
     gaugechart3.transition(transit).attr("width",input+"%");
     gaugechart3text.transition(transit).text("[ "+input+" ]");
}

var bar1container = d3.select("#top1").append("svg").attr("width","100%").attr("height",200);
var barchart1bar1 = bar1container.append("rect").attr("x","35%").attr("y",45).attr("width","30%").attr("height",150).attr("fill",chartcolor);
var barchart1bar1text = bar1container.append("text").attr("class", "label").attr("y", 55).attr("x", "35%").attr("font-family","Gloria Hallelujah").attr("font-size","10px").attr("fill",separatorcolor).text("dis1");
var barchart1bar2 = bar1container.append("rect").attr("x","0%").attr("y",75).attr("width","30%").attr("height",120).attr("fill",chartcolor);
var barchart1bar2text = bar1container.append("text").attr("class", "label").attr("y", 85).attr("x", "0%").attr("font-family","Gloria Hallelujah").attr("font-size","10px").attr("fill",separatorcolor).text("dis2");
var barchart1bar3 = bar1container.append("rect").attr("x","70%").attr("y",105).attr("width","30%").attr("height",90).attr("fill",chartcolor);
var barchart1bar3text = bar1container.append("text").attr("class", "label").attr("y", 115).attr("x", "70%").attr("font-family","Gloria Hallelujah").attr("font-size","10px").attr("fill",separatorcolor).text("dis3");

function updatebartop(ordenar){
     barchart1bar1text.transition(transit).text("[ "+ordenar[0].disName+" ]");
     barchart1bar2text.transition(transit).text("[ "+ordenar[1].disName+" ]");
     barchart1bar3text.transition(transit).text("[ "+ordenar[2].disName+" ]");
}

var bar2container = d3.select("#top2").append("svg").attr("width","100%").attr("height",300);
var barchart2bar1 = bar2container.append("rect").attr("x",0).attr("y",0).attr("width","100%").attr("height",20).attr("fill",chartcolor);
var barchart2bar1text = bar2container.append("text").attr("class", "label").attr("y", 20).attr("x", 20).attr("font-family","Gloria Hallelujah").attr("font-size","15px").attr("fill",separatorcolor).text("dis1");
var barchart2bar2 = bar2container.append("rect").attr("x",0).attr("y",30).attr("width","100%").attr("height",20).attr("fill",chartcolor);
var barchart2bar2text = bar2container.append("text").attr("class", "label").attr("y", 50).attr("x", 20).attr("font-family","Gloria Hallelujah").attr("font-size","15px").attr("fill",separatorcolor).text("dis2");
var barchart2bar3 = bar2container.append("rect").attr("x",0).attr("y",60).attr("width","100%").attr("height",20).attr("fill",chartcolor);
var barchart2bar3text = bar2container.append("text").attr("class", "label").attr("y", 80).attr("x", 20).attr("font-family","Gloria Hallelujah").attr("font-size","15px").attr("fill",separatorcolor).text("dis3");
var barchart2bar4 = bar2container.append("rect").attr("x",0).attr("y",90).attr("width","100%").attr("height",20).attr("fill",chartcolor);
var barchart2bar4text = bar2container.append("text").attr("class", "label").attr("y", 110).attr("x", 20).attr("font-family","Gloria Hallelujah").attr("font-size","15px").attr("fill",separatorcolor).text("dis4");
var barchart2bar5 = bar2container.append("rect").attr("x",0).attr("y",120).attr("width","100%").attr("height",20).attr("fill",chartcolor);
var barchart2bar5text = bar2container.append("text").attr("class", "label").attr("y", 140).attr("x", 20).attr("font-family","Gloria Hallelujah").attr("font-size","15px").attr("fill",separatorcolor).text("dis5");
var barchart2bar6 = bar2container.append("rect").attr("x",0).attr("y",150).attr("width","100%").attr("height",20).attr("fill",chartcolor);
var barchart2bar6text = bar2container.append("text").attr("class", "label").attr("y", 170).attr("x", 20).attr("font-family","Gloria Hallelujah").attr("font-size","15px").attr("fill",separatorcolor).text("dis6");
var barchart2bar7 = bar2container.append("rect").attr("x",0).attr("y",180).attr("width","100%").attr("height",20).attr("fill",chartcolor);
var barchart2bar7text = bar2container.append("text").attr("class", "label").attr("y", 200).attr("x", 20).attr("font-family","Gloria Hallelujah").attr("font-size","15px").attr("fill",separatorcolor).text("dis7");
var barchart2bar8 = bar2container.append("rect").attr("x",0).attr("y",210).attr("width","100%").attr("height",20).attr("fill",chartcolor);
var barchart2bar8text = bar2container.append("text").attr("class", "label").attr("y", 230).attr("x", 20).attr("font-family","Gloria Hallelujah").attr("font-size","15px").attr("fill",separatorcolor).text("dis8");
var barchart2bar9 = bar2container.append("rect").attr("x",0).attr("y",240).attr("width","100%").attr("height",20).attr("fill",chartcolor);
var barchart2bar9text = bar2container.append("text").attr("class", "label").attr("y", 260).attr("x", 20).attr("font-family","Gloria Hallelujah").attr("font-size","15px").attr("fill",separatorcolor).text("dis9");
var barchart2bar10 = bar2container.append("rect").attr("x",0).attr("y",270).attr("width","100%").attr("height",20).attr("fill",chartcolor);
var barchart2bar10text = bar2container.append("text").attr("class", "label").attr("y", 290).attr("x", 20).attr("font-family","Gloria Hallelujah").attr("font-size","15px").attr("fill",separatorcolor).text("dis10");


function updatebar2(ordenar){
     barchart2bar1.transition(transit).attr("width", ordenar[0].dispoints+"%");
     barchart2bar1text.transition(transit).text("[ "+ordenar[0].disName+" ]");
     barchart2bar2.transition(transit).attr("width", ordenar[1].dispoints+"%");
     barchart2bar2text.transition(transit).text("[ "+ordenar[1].disName+" ]");
     barchart2bar3.transition(transit).attr("width", ordenar[2].dispoints+"%");
     barchart2bar3text.transition(transit).text("[ "+ordenar[2].disName+" ]");
     barchart2bar4.transition(transit).attr("width", ordenar[3].dispoints+"%");
     barchart2bar4text.transition(transit).text("[ "+ordenar[3].disName+" ]");
     barchart2bar5.transition(transit).attr("width", ordenar[4].dispoints+"%");
     barchart2bar5text.transition(transit).text("[ "+ordenar[4].disName+" ]");
     barchart2bar6.transition(transit).attr("width", ordenar[5].dispoints+"%");
     barchart2bar6text.transition(transit).text("[ "+ordenar[5].disName+" ]");
     barchart2bar7.transition(transit).attr("width", ordenar[6].dispoints+"%");
     barchart2bar7text.transition(transit).text("[ "+ordenar[6].disName+" ]");
     barchart2bar8.transition(transit).attr("width", ordenar[7].dispoints+"%");
     barchart2bar8text.transition(transit).text("[ "+ordenar[7].disName+" ]");
     barchart2bar9.transition(transit).attr("width", ordenar[8].dispoints+"%");
     barchart2bar9text.transition(transit).text("[ "+ordenar[8].disName+" ]");
     barchart2bar10.transition(transit).attr("width", ordenar[9].dispoints+"%");
     barchart2bar10text.transition(transit).text("[ "+ordenar[9].disName+" ]");
}


var bar3container = d3.select("#top3").append("svg").attr("width","100%").attr("height",300);
var barchart3bar1 = bar3container.append("rect").attr("x",0).attr("y",0).attr("width","100%").attr("height",20).attr("fill",chartcolor);
var barchart3bar1text = bar3container.append("text").attr("class", "label").attr("y", 20).attr("x", 20).attr("font-family","Gloria Hallelujah").attr("font-size","15px").attr("fill",separatorcolor).text("dis1");
var barchart3bar2 = bar3container.append("rect").attr("x",0).attr("y",30).attr("width","100%").attr("height",20).attr("fill",chartcolor);
var barchart3bar2text = bar3container.append("text").attr("class", "label").attr("y", 50).attr("x", 20).attr("font-family","Gloria Hallelujah").attr("font-size","15px").attr("fill",separatorcolor).text("dis2");
var barchart3bar3 = bar3container.append("rect").attr("x",0).attr("y",60).attr("width","100%").attr("height",20).attr("fill",chartcolor);
var barchart3bar3text = bar3container.append("text").attr("class", "label").attr("y", 80).attr("x", 20).attr("font-family","Gloria Hallelujah").attr("font-size","15px").attr("fill",separatorcolor).text("dis3");
var barchart3bar4 = bar3container.append("rect").attr("x",0).attr("y",90).attr("width","100%").attr("height",20).attr("fill",chartcolor);
var barchart3bar4text = bar3container.append("text").attr("class", "label").attr("y", 110).attr("x", 20).attr("font-family","Gloria Hallelujah").attr("font-size","15px").attr("fill",separatorcolor).text("dis4");
var barchart3bar5 = bar3container.append("rect").attr("x",0).attr("y",120).attr("width","100%").attr("height",20).attr("fill",chartcolor);
var barchart3bar5text = bar3container.append("text").attr("class", "label").attr("y", 140).attr("x", 20).attr("font-family","Gloria Hallelujah").attr("font-size","15px").attr("fill",separatorcolor).text("dis5");
var barchart3bar6 = bar3container.append("rect").attr("x",0).attr("y",150).attr("width","100%").attr("height",20).attr("fill",chartcolor);
var barchart3bar6text = bar3container.append("text").attr("class", "label").attr("y", 170).attr("x", 20).attr("font-family","Gloria Hallelujah").attr("font-size","15px").attr("fill",separatorcolor).text("dis6");
var barchart3bar7 = bar3container.append("rect").attr("x",0).attr("y",180).attr("width","100%").attr("height",20).attr("fill",chartcolor);
var barchart3bar7text = bar3container.append("text").attr("class", "label").attr("y", 200).attr("x", 20).attr("font-family","Gloria Hallelujah").attr("font-size","15px").attr("fill",separatorcolor).text("dis7");
var barchart3bar8 = bar3container.append("rect").attr("x",0).attr("y",210).attr("width","100%").attr("height",20).attr("fill",chartcolor);
var barchart3bar8text = bar3container.append("text").attr("class", "label").attr("y", 230).attr("x", 20).attr("font-family","Gloria Hallelujah").attr("font-size","15px").attr("fill",separatorcolor).text("dis8");
var barchart3bar9 = bar3container.append("rect").attr("x",0).attr("y",240).attr("width","100%").attr("height",20).attr("fill",chartcolor);
var barchart3bar9text = bar3container.append("text").attr("class", "label").attr("y", 260).attr("x", 20).attr("font-family","Gloria Hallelujah").attr("font-size","15px").attr("fill",separatorcolor).text("dis9");
var barchart3bar10 = bar3container.append("rect").attr("x",0).attr("y",270).attr("width","100%").attr("height",20).attr("fill",chartcolor);
var barchart3bar10text = bar3container.append("text").attr("class", "label").attr("y", 290).attr("x", 20).attr("font-family","Gloria Hallelujah").attr("font-size","15px").attr("fill",separatorcolor).text("dis10");


function updatebar3(ordenar){
     barchart3bar1.transition(transit).attr("width", ordenar[0].dispoints+"%");
     barchart3bar1text.transition(transit).text("[ "+ordenar[0].disName+" ]");
     barchart3bar2.transition(transit).attr("width", ordenar[1].dispoints+"%");
     barchart3bar2text.transition(transit).text("[ "+ordenar[1].disName+" ]");
     barchart3bar3.transition(transit).attr("width", ordenar[2].dispoints+"%");
     barchart3bar3text.transition(transit).text("[ "+ordenar[2].disName+" ]");
     barchart3bar4.transition(transit).attr("width", ordenar[3].dispoints+"%");
     barchart3bar4text.transition(transit).text("[ "+ordenar[3].disName+" ]");
     barchart3bar5.transition(transit).attr("width", ordenar[4].dispoints+"%");
     barchart3bar5text.transition(transit).text("[ "+ordenar[4].disName+" ]");
     barchart3bar6.transition(transit).attr("width", ordenar[5].dispoints+"%");
     barchart3bar6text.transition(transit).text("[ "+ordenar[5].disName+" ]");
     barchart3bar7.transition(transit).attr("width", ordenar[6].dispoints+"%");
     barchart3bar7text.transition(transit).text("[ "+ordenar[6].disName+" ]");
     barchart3bar8.transition(transit).attr("width", ordenar[7].dispoints+"%");
     barchart3bar8text.transition(transit).text("[ "+ordenar[7].disName+" ]");
     barchart3bar9.transition(transit).attr("width", ordenar[8].dispoints+"%");
     barchart3bar9text.transition(transit).text("[ "+ordenar[8].disName+" ]");
     barchart3bar10.transition(transit).attr("width", ordenar[9].dispoints+"%");
     barchart3bar10text.transition(transit).text("[ "+ordenar[9].disName+" ]");
}



var bar4container = d3.select("#top4").append("svg").attr("width","100%").attr("height",300);
var barchart4bar1 = bar4container.append("rect").attr("x",0).attr("y",0).attr("width","100%").attr("height",20).attr("fill",chartcolor);
var barchart4bar1text = bar4container.append("text").attr("class", "label").attr("y", 20).attr("x", 20).attr("font-family","Gloria Hallelujah").attr("font-size","15px").attr("fill",separatorcolor).text("dis1");
var barchart4bar2 = bar4container.append("rect").attr("x",0).attr("y",30).attr("width","100%").attr("height",20).attr("fill",chartcolor);
var barchart4bar2text = bar4container.append("text").attr("class", "label").attr("y", 50).attr("x", 20).attr("font-family","Gloria Hallelujah").attr("font-size","15px").attr("fill",separatorcolor).text("dis2");
var barchart4bar3 = bar4container.append("rect").attr("x",0).attr("y",60).attr("width","100%").attr("height",20).attr("fill",chartcolor);
var barchart4bar3text = bar4container.append("text").attr("class", "label").attr("y", 80).attr("x", 20).attr("font-family","Gloria Hallelujah").attr("font-size","15px").attr("fill",separatorcolor).text("dis3");
var barchart4bar4 = bar4container.append("rect").attr("x",0).attr("y",90).attr("width","100%").attr("height",20).attr("fill",chartcolor);
var barchart4bar4text = bar4container.append("text").attr("class", "label").attr("y", 110).attr("x", 20).attr("font-family","Gloria Hallelujah").attr("font-size","15px").attr("fill",separatorcolor).text("dis4");
var barchart4bar5 = bar4container.append("rect").attr("x",0).attr("y",120).attr("width","100%").attr("height",20).attr("fill",chartcolor);
var barchart4bar5text = bar4container.append("text").attr("class", "label").attr("y", 140).attr("x", 20).attr("font-family","Gloria Hallelujah").attr("font-size","15px").attr("fill",separatorcolor).text("dis5");
var barchart4bar6 = bar4container.append("rect").attr("x",0).attr("y",150).attr("width","100%").attr("height",20).attr("fill",chartcolor);
var barchart4bar6text = bar4container.append("text").attr("class", "label").attr("y", 170).attr("x", 20).attr("font-family","Gloria Hallelujah").attr("font-size","15px").attr("fill",separatorcolor).text("dis6");
var barchart4bar7 = bar4container.append("rect").attr("x",0).attr("y",180).attr("width","100%").attr("height",20).attr("fill",chartcolor);
var barchart4bar7text = bar4container.append("text").attr("class", "label").attr("y", 200).attr("x", 20).attr("font-family","Gloria Hallelujah").attr("font-size","15px").attr("fill",separatorcolor).text("dis7");
var barchart4bar8 = bar4container.append("rect").attr("x",0).attr("y",210).attr("width","100%").attr("height",20).attr("fill",chartcolor);
var barchart4bar8text = bar4container.append("text").attr("class", "label").attr("y", 230).attr("x", 20).attr("font-family","Gloria Hallelujah").attr("font-size","15px").attr("fill",separatorcolor).text("dis8");
var barchart4bar9 = bar4container.append("rect").attr("x",0).attr("y",240).attr("width","100%").attr("height",20).attr("fill",chartcolor);
var barchart4bar9text = bar4container.append("text").attr("class", "label").attr("y", 260).attr("x", 20).attr("font-family","Gloria Hallelujah").attr("font-size","15px").attr("fill",separatorcolor).text("dis9");
var barchart4bar10 = bar4container.append("rect").attr("x",0).attr("y",270).attr("width","100%").attr("height",20).attr("fill",chartcolor);
var barchart4bar10text = bar4container.append("text").attr("class", "label").attr("y", 290).attr("x", 20).attr("font-family","Gloria Hallelujah").attr("font-size","15px").attr("fill",separatorcolor).text("dis10");


function updatebar4(ordenar){
     barchart4bar1.transition(transit).attr("width", ordenar[0].dispoints+"%");
     barchart4bar1text.transition(transit).text("[ "+ordenar[0].disName+" ]");
     barchart4bar2.transition(transit).attr("width", ordenar[1].dispoints+"%");
     barchart4bar2text.transition(transit).text("[ "+ordenar[1].disName+" ]");
     barchart4bar3.transition(transit).attr("width", ordenar[2].dispoints+"%");
     barchart4bar3text.transition(transit).text("[ "+ordenar[2].disName+" ]");
     barchart4bar4.transition(transit).attr("width", ordenar[3].dispoints+"%");
     barchart4bar4text.transition(transit).text("[ "+ordenar[3].disName+" ]");
     barchart4bar5.transition(transit).attr("width", ordenar[4].dispoints+"%");
     barchart4bar5text.transition(transit).text("[ "+ordenar[4].disName+" ]");
     barchart4bar6.transition(transit).attr("width", ordenar[5].dispoints+"%");
     barchart4bar6text.transition(transit).text("[ "+ordenar[5].disName+" ]");
     barchart4bar7.transition(transit).attr("width", ordenar[6].dispoints+"%");
     barchart4bar7text.transition(transit).text("[ "+ordenar[6].disName+" ]");
     barchart4bar8.transition(transit).attr("width", ordenar[7].dispoints+"%");
     barchart4bar8text.transition(transit).text("[ "+ordenar[7].disName+" ]");
     barchart4bar9.transition(transit).attr("width", ordenar[8].dispoints+"%");
     barchart4bar9text.transition(transit).text("[ "+ordenar[8].disName+" ]");
     barchart4bar10.transition(transit).attr("width", ordenar[9].dispoints+"%");
     barchart4bar10text.transition(transit).text("[ "+ordenar[9].disName+" ]");
}
// Data Table
