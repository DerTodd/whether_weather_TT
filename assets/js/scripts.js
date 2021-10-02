var tableBody = document.getElementById('repo-table');
var findIt = document.getElementById('findIt');
var locationW;
var apiKey = "da319c80a92981c05924a706c9b206b6"
var cityNameInput = document.getElementById("cityName");
var cityName = "";
var dailyW;
//var future1 = document.getElementById("date1");
var future2;
var future3;
var future4;
var future5;
var future5;



function getWeatherApi() {
  // fetch request gets all the information on the 5 day forecast
  cityName = cityNameInput.value;
  console.log("City " + cityName);
  //Use the ` to set the search values that are from the form
  var requestUrl = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
        locationW = {
      "lon" : data.coord.lon,
      "lat" : data.coord.lat,
        };
     console.log(locationW);
     getWeatherAPIwithLoc();
    });return locationW, cityName;
    
}
function getWeatherAPIwithLoc() { 
    var requestSecondUrl =`https://api.openweathermap.org/data/2.5/onecall?lat=${locationW.lat}&lon=${locationW.lon}&exclude={part}&appid=${apiKey}`
    fetch(requestSecondUrl)
    .then(function (response2) {
        return response2.json();
      })
      .then(function (data2) {
        var todaysDate = (moment.unix(data2.current.dt).format("MM/DD/YYYY"));
        console.log(data2);
        console.log(locationW);
        console.log("two lon" + locationW.lon);
        console.log("two lat" + locationW.lat);
        //alert(moment.unix(data2.current.dt).format("MM/DD/YYYY"))
        console.log("current tamp " + data2.current.temp);
        console.log(cityName);
        var todayTemp = ((data2.current.temp)- 273.15) * 9 / 5 + 32
        //convert stupid Kelvin to what it was intended to be fahrenheit
        var todaysTemp = todayTemp.toFixed(0);
        //limit it so it isn't a ridiculous number
        console.log("Temperature " + todaysTemp)
        dailyW = {
            "animals" : "Frog",
            "city" : cityName,
            "date" : todaysDate,
            "icon" : data2.current.weather[0].icon,
            "temperature" : todaysTemp,
            "wind" : data2.current.wind_speed,
            "humidity" : data2.current.humidity,
            "UV-index" : data2.current.uvi
        };
        console.log(dailyW);
        getFiveDay();
    })
  };

  function getFiveDay() { 
    var requestSecondUrl =`https://api.openweathermap.org/data/2.5/onecall?lat=${locationW.lat}&lon=${locationW.lon}&exclude={part}&appid=${apiKey}`
    fetch(requestSecondUrl)
    .then(function (response2) {
        return response2.json();
      })
    .then(function (data3) {
      for (let i = 0; i < 1; i++) {
        //const element = array[i];
        //daily[i].
      
        var date = (moment.unix(data3.daily[0].dt).format("MM/DD/YYYY"));
        console.log(data3);
        console.log(locationW);
        console.log("two lon" + locationW.lon);
        console.log("two lat" + locationW.lat);
        //alert(moment.unix(data3.daily[0].dt).format("MM/DD/YYYY"))
        console.log("current temp " + data3.daily[0].temp.max);
        console.log(cityName);
        var todayTemp = ((data3.daily[0].temp.max)- 273.15) * 9 / 5 + 32
        //convert stupid Kelvin to what it was intended to be fahrenheit
        var todaysTemp = todayTemp.toFixed(0);
        //limit it so it isn't a ridiculous number
        console.log("Temperature " + todaysTemp)
        
        dailyW = {
            "animals" : "Turtles",
            "date" : date,
            "icon" : data3.daily[0].weather[0].icon,
            "temperature" : todaysTemp,
            "wind" : data3.daily[0].wind_speed,
            "humidity" : data3.daily[0].humidity,
            "UV-index" : data3.daily[0].uvi
        };
        var futureInfo = "http://openweathermap.org/img/wn/" + dailyW.icon + ".png";
        console.log(futureInfo);
        i++
        console.log(dailyW.date);
        document.getElementById("date1").textContent = dailyW.date;
        //document.getElementById("#icon1").img.src = futureInfo;
        document.getElementById("temperature1").textContent = "High: " + dailyW.temperature + String.fromCharCode(176) + "F";
        document.getElementById("wind1").textContent = "Wind: " + dailyW.wind;
        document.getElementById("humidity1").textContent = "Humidity: " + dailyW.humidity;
        //icon from https://www.geeksforgeeks.org/how-to-create-an-image-element-dynamically-using-javascript/
        var img = document.createElement('img');
            img.src = futureInfo;
            document.getElementById('icon1').appendChild(img);
            //down.innerHTML = "Image Element Added.";

      }
    });return locationW, cityName;
    
}

findIt.addEventListener('click', getWeatherApi);

var apiKey = "da319c80a92981c05924a706c9b206b6"
//api.openweathermap.org/data/2.5/weather?q={city name}&appid=da319c80a92981c05924a706c9b206b6
//api.openweathermap.org/data/2.5/weather?q=Austin&appid=da319c80a92981c05924a706c9b206b6
//https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
//https://api.openweathermap.org/data/2.5/onecall?lat=30.2672&lon=-97.7431&exclude={part}&appid=da319c80a92981c05924a706c9b206b6

// function getApi() {
//     // replace `octocat` with anyone else's GitHub username
//     var requestUrl = 'https://api.github.com/users/octocat/repos';
  
//     fetch(requestUrl)
//       .then(function (response) {
//         return response.json();
//       })
//       .then(function (data) {
//         for (var i = 0; i < data.length; i++) {
//           var listItem = document.createElement('li');
//           listItem.textContent = data[i].html_url;
//           repoList.appendChild(listItem);
//         }
//       });
//   }
// function getApi() {
//     repo = document.getElementById("repo_query").value;
//     var requestUrl = 'https://api.github.com/repos/IBM/${repo}/issues?per_page=5';
  
//     fetch(requestUrl)
//       .then(function (response) {
//         return response.json();
//       })
//       .then(function (data) {
//         console.log(data);
//         for (var i = 0; i < data.length; i++) {
//           var userName = document.createElement('h3');
//           var issueTitle = document.createElement('p');
//           userName.textContent = data[i].user.login;
//           issueTitle.textContent = data[i].title;
//           issueContainer.append(userName);
//           issueContainer.append(issueTitle);
//         }
//       });
//   }