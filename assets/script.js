
// Store apiKey
var apiKey = "af3a22844450873d5d2169fdef220113"

// Get element from the ID
var buttonEl = $("#search-button");

// On clicking the sumbit button, call the following function
$(buttonEl).on("click", function(event) {
    event.preventDefault();
// Store the city the user inputs    
    var input = $("#search-input").val().trim();
    console.log(input);

// Store the URL fo the Geocoder API    
    var geoURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + input + "&limit=1&appid=" + apiKey 

// Get the longitude and latitude from the Geocoder API
    $.ajax({
        url: geoURL,
        method: "GET"
      }).then(function(response) {
        
        var lat = response[0].lat;
        var lon = response[0].lon;
        
        var weatherURL = "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon=" + lon + "&appid=" + apiKey
        
        $.ajax({
            url: weatherURL,
            method: "GET"
            
          }).then(function(responseWeather) {
        
            console.log(responseWeather);
            
            // City Name
            var cityName = responseWeather.city.name;
            console.log(cityName)

            // Date
            var dateToday = moment(responseWeather.list[0].dt_txt).format("MMMM Do, YYYY");
            console.log(dateToday) 
            
            // Icon Code
            var iconCode = responseWeather.list[0].weather[0].icon
            // Find icon png by using the icon code and the URL
            var iconTodayURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
            
            console.log(iconTodayURL)

            // Temp
            var tempToday = Math.round((responseWeather.list[0].main.temp)-273.15)
            console.log(tempToday)

            // Wind
            var windToday = Math.round(responseWeather.list[0].wind.speed);
            console.log(windToday);
            
            // Humidity
            var humidityToday = responseWeather.list[0].main.humidity;
            console.log(humidityToday);

    })

})
})

// Store user input as a variable
// Convert city to Lat and Lon coordinates and store in variable
// Get response from API Geocode Key for coordinates and store in varable
// Get response from 
// Print resutls

// Current weather
// 5 Day Forcast (Array of objects?)

//Search History (????????)
