// jQuery Mobile ver. 1.3.2 and jQuery ver. 1.9.1 
// icons were from http://www.alessioatzeni.com/meteocons/
// letters correspond to specific weather condition icon 
		var icons = 	{	"clear-day" : "B",
							"clear-night" : "C",
							"cloudy" : "Y",
							"wind" : "S",
							"fog" : "N",
							"rain" : "R",
							"sleet" : "X",
							"snow" : "G",	
							"partly-cloudy-day" : "H",
							"partly-cloudy-night" : "I"				
						};


//HTML 5 Geolocation Latitude and Longitude Coordinates (coords)
//Info from http://geocoder.us/


		var cities = 	{	
							"new york" 			: {coords: {latitude: 40.755932, longitude: -73.986508}},  // Times Square
							"washington, dc" 	: {coords: {latitude: 38.898748, longitude: -77.037684}},  // White House
							"boston" 			: {coords: {latitude: 42.346623, longitude: -71.099259}},  // Fenway Park
							"san francisco" 	: {coords: {latitude: 37.74533,  longitude: -122.420082}}, // Mission/Valencia Sts.-SF
							"portland" 			: {coords: {latitude: 45.516469, longitude: -122.680738}}, // Antoinette Hatfield Hall
							"austin" 			: {coords: {latitude: 30.267566, longitude: -97.749317}},  // 360 Condominiums Tower
							"current location"  : "" 												       // default: NYC-Times Square
						};


//retrieving specific city info based on coordinates (longitude and latitude)
		function loadWeather(cityCoords){

			console.log(cityCoords); 

			var latlng = cityCoords.coords.latitude + "," + cityCoords.coords.longitude;
		
			var forecastURL = // API key from "https://api.forecast.io/forecast/" goes here+latlng;


// Making ajax call using json padding			
			$.ajax({
				url: forecastURL,
				jsonpCallback: 'jsonCallback',
				contentType: "application/json",
				dataType: "jsonp", // to avoid XSS but we really should use a backend server, hence why using API directly in html
				success: function(json){
					console.log(json);
					$("#current_temp").html(Math.round(json.currently.temperature)+"&#176;F"); //rounds temperature
					$("#current_summary").html(json.currently.summary); //current summary a.k.a. conditions
					$("#current_temp").attr("data-icon", icons[json.currently.icon]); //current temperature
				},
				error: function(e) {
					console.log(e.message); //error message displays
				}
			});
		}

		function loadCity(city){
			$("#location").html(city);

			if (city.toLowerCase() == "current location") { // if current location is selected
				if ( navigator.geolocation ) //If geolocation capability is provided through browser (can get my exact location)
					navigator.geolocation.getCurrentPosition(loadWeather, loadDefaultCity); // Display the info for the current location 
				else {
					loadDefaultCity(); //If not, load the weather for the default city
				}

			} 	else {
				loadWeather(cities[city.toLowerCase()]); 
			}
		}


		function loadDefaultCity(){
			loadCity("New York"); // default city is New York
		}

		$(document).ready(function() {  //displays city 
			loadCity("Boston");

			$("a.city").bind("click", function(){
				loadCity($(this).html());
			});
		});