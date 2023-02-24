// Store apiKey
var apiKey = ""

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
            
            // Store values for the 5 day forecast in an array of arrays

            var fiveDayForcast = [
                [
                    moment(responseWeather.list[8].dt_txt).format("MMMM Do, YYYY"),
                    responseWeather.list[8].weather[0].icon,
                    Math.round((responseWeather.list[8].main.temp)-273.15),
                    Math.round(responseWeather.list[8].wind.speed),
                    responseWeather.list[8].main.humidity
                    
                ],
                [
                    moment(responseWeather.list[15].dt_txt).format("MMMM Do, YYYY"),
                    responseWeather.list[15].weather[0].icon,
                    Math.round((responseWeather.list[15].main.temp)-273.15),
                    Math.round(responseWeather.list[15].wind.speed),
                    responseWeather.list[15].main.humidity
                ],   
                [
                    moment(responseWeather.list[23].dt_txt).format("MMMM Do, YYYY"),
                    responseWeather.list[23].weather[0].icon,
                    Math.round((responseWeather.list[23].main.temp)-273.15),
                    Math.round(responseWeather.list[23].wind.speed),
                    responseWeather.list[23].main.humidity
                ],
                [
                    moment(responseWeather.list[31].dt_txt).format("MMMM Do, YYYY"),
                    responseWeather.list[31].weather[0].icon,
                    Math.round((responseWeather.list[31].main.temp)-273.15),
                    Math.round(responseWeather.list[31].wind.speed),
                    responseWeather.list[31].main.humidity
                ],
                [
                    moment(responseWeather.list[39].dt_txt).format("MMMM Do, YYYY"),
                    responseWeather.list[39].weather[0].icon,
                    Math.round((responseWeather.list[39].main.temp)-273.15),
                    Math.round(responseWeather.list[39].wind.speed),
                    responseWeather.list[39].main.humidity
                ],
            ]
            
            console.log(fiveDayForcast[0])
            
            $("#today").append(`<div class="card" style="width: 18rem;">
                                    <h5 class="card-title">${cityName}</h5>
                                    <h6 class="card-subtitle mb-2 text-muted">${dateToday}</h6>
                                    <img class="card-img-top" src="${iconTodayURL}" alt="Weather Icon">
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Temperature: ${tempToday}°C</li>
                                    <li class="list-group-item">Windspeed: ${windToday}km/h</li>
                                    <li class="list-group-item">Humidity: ${humidityToday}%</li>
                                </ul>
                                </div>`)

            $("#forecast").append(`<div class="card" style="width: 18rem;">
                                    <h5 class="card-title">${fiveDayForcast[0][0]}</h5>
                                    <img class="card-img-top" src="http://openweathermap.org/img/w/${fiveDayForcast[0][1]}.png" alt="Weather Icon">
                                    <ul class="list-group list-group-flush">
                                        <li class="list-group-item">Temperature: ${fiveDayForcast[0][2]}°C</li>
                                        <li class="list-group-item">Windspeed: ${fiveDayForcast[0][3]}km/h</li>
                                        <li class="list-group-item">Humidity: ${fiveDayForcast[0][4]}%</li>
                                    </ul>
                                    </div>
                                    <div class="card" style="width: 18rem;">
                                    <h5 class="card-title">${fiveDayForcast[1][0]}</h5>
                                    <img class="card-img-top" src="http://openweathermap.org/img/w/${fiveDayForcast[1][1]}.png" alt="Weather Icon">
                                    <ul class="list-group list-group-flush">
                                        <li class="list-group-item">Temperature: ${fiveDayForcast[1][2]}°C</li>
                                        <li class="list-group-item">Windspeed: ${fiveDayForcast[1][3]}km/h</li>
                                        <li class="list-group-item">Humidity: ${fiveDayForcast[1][4]}%</li>
                                    </ul>
                                    </div>
                                    <div class="card" style="width: 18rem;">
                                    <h5 class="card-title">${fiveDayForcast[2][0]}</h5>
                                    <img class="card-img-top" src="http://openweathermap.org/img/w/${fiveDayForcast[2][1]}.png" alt="Weather Icon">
                                    <ul class="list-group list-group-flush">
                                        <li class="list-group-item">Temperature: ${fiveDayForcast[2][2]}°C</li>
                                        <li class="list-group-item">Windspeed: ${fiveDayForcast[2][3]}km/h</li>
                                        <li class="list-group-item">Humidity: ${fiveDayForcast[2][4]}%</li>
                                    </ul>
                                    </div>
                                    <div class="card" style="width: 18rem;">
                                    <h5 class="card-title">${fiveDayForcast[3][0]}</h5>
                                    <img class="card-img-top" src="http://openweathermap.org/img/w/${fiveDayForcast[3][1]}.png" alt="Weather Icon">
                                    <ul class="list-group list-group-flush">
                                        <li class="list-group-item">Temperature: ${fiveDayForcast[3][2]}°C</li>
                                        <li class="list-group-item">Windspeed: ${fiveDayForcast[3][3]}km/h</li>
                                        <li class="list-group-item">Humidity: ${fiveDayForcast[3][4]}%</li>
                                    </ul>
                                    </div>
                                    <div class="card" style="width: 18rem;">
                                    <h5 class="card-title">${fiveDayForcast[4][0]}</h5>
                                    <img class="card-img-top" src="http://openweathermap.org/img/w/${fiveDayForcast[4][1]}.png" alt="Weather Icon">
                                    <ul class="list-group list-group-flush">
                                        <li class="list-group-item">Temperature: ${fiveDayForcast[4][2]}°C</li>
                                        <li class="list-group-item">Windspeed: ${fiveDayForcast[4][3]}km/h</li>
                                        <li class="list-group-item">Humidity: ${fiveDayForcast[4][4]}%</li>
                                    </ul>
                                    </div>`)
    })

})
})

