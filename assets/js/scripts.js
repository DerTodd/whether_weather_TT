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
  cityName = cityNameInput.value.trim();
  console.log("City " + cityName);
  var data = JSON.parse(localStorage.getItem("data")) || [];
  var dataEntry = {
    city: cityName,
  };
  data.push(dataEntry);
  // save to local storge
  localStorage.setItem("data", JSON.stringify(data))
  localStorage.setItem("cities", JSON.stringify(cityName));
  console.log(cityName);
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
        var index = data2.current.uvi
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
        if(index < 3){
          document.getElementById("UV-1").style.backgroundColor = "green";
        };
        if(index >= 3 && index < 6){
          document.getElementById("UV-1").style.backgroundColor = "Yellow";
        };
        if(index >= 6 && index < 8){
          document.getElementById("UV-1").style.backgroundColor = "orange";
        };
        if(index >= 8 && index < 11){
          document.getElementById("UV-1").style.backgroundColor = "red";
        };
        if(index >= 11){
          document.getElementById("UV-1").style.backgroundColor = "purple";
        };
        getFiveDay1();
    })
  };

  function getFiveDay1() { 
    var requestSecondUrl =`https://api.openweathermap.org/data/2.5/onecall?lat=${locationW.lat}&lon=${locationW.lon}&exclude={part}&appid=${apiKey}`
    fetch(requestSecondUrl)
    .then(function (response2) {
        return response2.json();
      })
    .then(function (data3) {
      
        var date = (moment.unix(data3.daily[1].dt).format("MM/DD/YYYY"));
        console.log(data3);
        console.log(locationW);
        console.log("two lon" + locationW.lon);
        console.log("two lat" + locationW.lat);
        //alert(moment.unix(data3.daily[0].dt).format("MM/DD/YYYY"))
        console.log("current temp " + data3.daily[0].temp.max);
        console.log(cityName);
        var todayTemp = ((data3.daily[1].temp.max)- 273.15) * 9 / 5 + 32
        //convert stupid Kelvin to what it was intended to be fahrenheit
        var todaysTemp = todayTemp.toFixed(0);
        //limit it so it isn't a ridiculous number
        console.log("Temperature " + todaysTemp)
        dailyW = {
            "animals" : "Turtles",
            "date" : date,
            "icon" : data3.daily[1].weather[0].icon,
            "temperature" : todaysTemp,
            "wind" : data3.daily[1].wind_speed,
            "humidity" : data3.daily[1].humidity,
            "UV-index" : data3.daily[1].uvi
        };
        var futureInfo = "http://openweathermap.org/img/wn/" + dailyW.icon + ".png";
        console.log(futureInfo);
        console.log(dailyW.date);
        document.getElementById("dat1").textContent = dailyW.date;
        //document.getElementById("#icon1").img.src = futureInfo;
        document.getElementById("temp1").textContent = "High: " + dailyW.temperature + String.fromCharCode(176) + "F";
        document.getElementById("win1").textContent = "Wind: " + dailyW.wind;
        document.getElementById("humid1").textContent = "Humidity: " + dailyW.humidity;
        //icon from https://www.geeksforgeeks.org/how-to-create-an-image-element-dynamically-using-javascript/
        var img = document.createElement('img');
            img.src = futureInfo;
            document.getElementById('icon1').appendChild(img);
            //down.innerHTML = "Image Element Added.";

      
    });getFiveDay2();
    
}
function getFiveDay2() { 
  var requestSecondUrl =`https://api.openweathermap.org/data/2.5/onecall?lat=${locationW.lat}&lon=${locationW.lon}&exclude={part}&appid=${apiKey}`
  fetch(requestSecondUrl)
  .then(function (response3) {
      return response3.json();
    })
  .then(function (data4) {
    
      var date = (moment.unix(data4.daily[2].dt).format("MM/DD/YYYY"));
      var todayTemp = ((data4.daily[2].temp.max)- 273.15) * 9 / 5 + 3;
      var todaysTemp = todayTemp.toFixed(0);
      dailyW = {
          "date" : date,
          "icon" : data4.daily[2].weather[0].icon,
          "temperature" : todaysTemp,
          "wind" : data4.daily[2].wind_speed,
          "humidity" : data4.daily[2].humidity,
      };
      var futureInfo = "http://openweathermap.org/img/wn/" + dailyW.icon + ".png";
      document.getElementById("dat2").textContent = dailyW.date;
      document.getElementById("temp2").textContent = "High: " + dailyW.temperature + String.fromCharCode(176) + "F";
      document.getElementById("win2").textContent = "Wind: " + dailyW.wind;
      document.getElementById("humid2").textContent = "Humidity: " + dailyW.humidity;
      var img = document.createElement('img');
          img.src = futureInfo;
          document.getElementById('icon2').appendChild(img);    
  });getFiveDay3();
  
}
function getFiveDay3() { 
  var requestSecondUrl =`https://api.openweathermap.org/data/2.5/onecall?lat=${locationW.lat}&lon=${locationW.lon}&exclude={part}&appid=${apiKey}`
  fetch(requestSecondUrl)
  .then(function (response4) {
      return response4.json();
    })
  .then(function (data5) {
    
      var date = (moment.unix(data5.daily[3].dt).format("MM/DD/YYYY"));
      var todayTemp = ((data5.daily[3].temp.max)- 273.15) * 9 / 5 + 3;
      var todaysTemp = todayTemp.toFixed(0);
      dailyW = {
          "date" : date,
          "icon" : data5.daily[3].weather[0].icon,
          "temperature" : todaysTemp,
          "wind" : data5.daily[3].wind_speed,
          "humidity" : data5.daily[3].humidity,
      };
      var futureInfo = "http://openweathermap.org/img/wn/" + dailyW.icon + ".png";
      document.getElementById("dat3").textContent = dailyW.date;
      document.getElementById("temp3").textContent = "High: " + dailyW.temperature + String.fromCharCode(176) + "F";
      document.getElementById("win3").textContent = "Wind: " + dailyW.wind;
      document.getElementById("humid3").textContent = "Humidity: " + dailyW.humidity;
      var img = document.createElement('img');
          img.src = futureInfo;
          document.getElementById('icon3').appendChild(img);    
  });getFiveDay4();
  
}
function getFiveDay4() { 
  var requestSecondUrl =`https://api.openweathermap.org/data/2.5/onecall?lat=${locationW.lat}&lon=${locationW.lon}&exclude={part}&appid=${apiKey}`
  fetch(requestSecondUrl)
  .then(function (response5) {
      return response5.json();
    })
  .then(function (data6) {
    
      var date = (moment.unix(data6.daily[4].dt).format("MM/DD/YYYY"));
      var todayTemp = ((data6.daily[4].temp.max)- 273.15) * 9 / 5 + 3;
      var todaysTemp = todayTemp.toFixed(0);
      dailyW = {
          "date" : date,
          "icon" : data6.daily[4].weather[0].icon,
          "temperature" : todaysTemp,
          "wind" : data6.daily[4].wind_speed,
          "humidity" : data6.daily[4].humidity,
      };
      var futureInfo = "http://openweathermap.org/img/wn/" + dailyW.icon + ".png";
      document.getElementById("dat4").textContent = dailyW.date;
      document.getElementById("temp4").textContent = "High: " + dailyW.temperature + String.fromCharCode(176) + "F";
      document.getElementById("win4").textContent = "Wind: " + dailyW.wind;
      document.getElementById("humid4").textContent = "Humidity: " + dailyW.humidity;
      var img = document.createElement('img');
          img.src = futureInfo;
          document.getElementById('icon4').appendChild(img);    
  });getFiveDay5();
  
}
function getFiveDay5() { 
  var requestSecondUrl =`https://api.openweathermap.org/data/2.5/onecall?lat=${locationW.lat}&lon=${locationW.lon}&exclude={part}&appid=${apiKey}`
  fetch(requestSecondUrl)
  .then(function (response6) {
      return response6.json();
    })
  .then(function (data7) {
    
      var date = (moment.unix(data7.daily[5].dt).format("MM/DD/YYYY"));
      var todayTemp = ((data7.daily[5].temp.max)- 273.15) * 9 / 5 + 3;
      var todaysTemp = todayTemp.toFixed(0);
      dailyW = {
          "date" : date,
          "icon" : data7.daily[5].weather[0].icon,
          "temperature" : todaysTemp,
          "wind" : data7.daily[5].wind_speed,
          "humidity" : data7.daily[5].humidity,
      };
      var futureInfo = "http://openweathermap.org/img/wn/" + dailyW.icon + ".png";
      document.getElementById("dat5").textContent = dailyW.date;
      document.getElementById("temp5").textContent = "High: " + dailyW.temperature + String.fromCharCode(176) + "F";
      document.getElementById("win5").textContent = "Wind: " + dailyW.wind;
      document.getElementById("humid5").textContent = "Humidity: " + dailyW.humidity;
      var img = document.createElement('img');
          img.src = futureInfo;
          document.getElementById('icon5').appendChild(img);    
  });getPrimaryDay();
  
}
function getPrimaryDay() { 
  var requestSecondUrl =`https://api.openweathermap.org/data/2.5/onecall?lat=${locationW.lat}&lon=${locationW.lon}&exclude={part}&appid=${apiKey}`
  fetch(requestSecondUrl)
  .then(function (response7) {
      return response7.json();
    })
  .then(function (data8) {
    
      var date = (moment.unix(data8.daily[0].dt).format("MM/DD/YYYY"));
      var todayTemp = ((data8.daily[0].temp.max)- 273.15) * 9 / 5 + 3;
      var todaysTemp = todayTemp.toFixed(0);
      dailyW = {
          "date" : date,
          "icon" : data8.daily[0].weather[0].icon,
          "temperature" : todaysTemp,
          "wind" : data8.daily[0].wind_speed,
          "humidity" : data8.daily[0].humidity,
          "city" : cityName,
          "UVindex" : data8.current.uvi
      };
      var futureInfo = "http://openweathermap.org/img/wn/" + dailyW.icon + ".png";
      document.getElementById("city").textContent = dailyW.city;
      document.getElementById("datP").textContent = dailyW.date;
      document.getElementById("tempP").textContent = "High: " + dailyW.temperature + String.fromCharCode(176) + "F";
      document.getElementById("winP").textContent = "Wind: " + dailyW.wind;
      document.getElementById("humidP").textContent = "Humidity: " + dailyW.humidity;
      document.getElementById("UV-1").textContent = "UV-Index: " + dailyW.UVindex;
      var img = document.createElement('img');
          img.src = futureInfo;
          document.getElementById('iconP').appendChild(img);    
  });
  
}
findIt.addEventListener('click', getWeatherApi);


function renderScheduledEvents() {
  // Use JSON.parse() to convert text to JavaScript object
  var carryOverEvents = JSON.parse(localStorage.getItem("scheduledEvents"));
  console.log(carryOverEvents);
  // Check to see if there is data in the varable.  If there is, contine onward!
  if (carryOverEvents !== null) {
    document.getElementById("events9").textContent = carryOverEvents.events9;
    document.getElementById("events10").textContent = carryOverEvents.events10;
    document.getElementById("events11").textContent = carryOverEvents.events11;
    document.getElementById("events12").textContent = carryOverEvents.events12;
    document.getElementById("events1").textContent = carryOverEvents.events1;
    document.getElementById("events2").textContent = carryOverEvents.events2;
    document.getElementById("events3").textContent = carryOverEvents.events3;
    document.getElementById("events4").textContent = carryOverEvents.events4;
    document.getElementById("events5").textContent = carryOverEvents.events5;
  } else {
    return;
  }
}
function init() {
  // When the init function is executed, the code inside renderLastGrade function will also execute
  renderScheduledEvents();
  console.log(currentHour);
  changeColors();
}
init();

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