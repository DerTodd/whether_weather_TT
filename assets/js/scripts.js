var tableBody = document.getElementById('repo-table');
var findIt = document.getElementById('findIt');
var locationW;
var apiKey = "da319c80a92981c05924a706c9b206b6"
var cityNameInput = document.getElementById("cityName");
var cityName = "";
var dailyW;
//var future1 = document.getElementById("date1");
var future1;
var future2;
var future3;
var future4;
var future5;
var future5;



function getWeatherApi() {
  // Fetch request to get the lat and long of the city we want to show
  
  if(cityName === ""){
  cityName = cityNameInput.value.trim()};
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
  var town = cityName;
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
     document.getElementsByClassName("title").textContent = town;
     getWeatherAPIwithLoc();
    });return locationW, cityName;
    
}
function secondTimeAround(oldCityName) {
  
  // fetch request gets all the information for the weather for the city we have stored.
  
  // if(cityName === ""){
  // cityName = cityNameInput.value.trim()};
  // console.log("City " + cityName);
  // var data = JSON.parse(localStorage.getItem("data")) || [];
  // var dataEntry = {
  //   city: cityName,
  // };
  // data.push(dataEntry);
  // // save to local storge
  // localStorage.setItem("data", JSON.stringify(data))
  // localStorage.setItem("cities", JSON.stringify(cityName));
  // console.log(cityName);
  //Use the ` to set the search values that are from the form
  cityName = oldCityName;
  var requestUrl2 = `http://api.openweathermap.org/data/2.5/weather?q=${oldCityName}&units=imperial&appid=${apiKey}`;

  fetch(requestUrl2)
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
    var requestSecondUrl =`https://api.openweathermap.org/data/2.5/onecall?lat=${locationW.lat}&lon=${locationW.lon}&units=imperial&exclude={part}&appid=${apiKey}`
    fetch(requestSecondUrl)
    .then(function (response2) {
        return response2.json();
      })
      .then(function (data2) {
        var todaysDate = (moment.unix(data2.current.dt).format("MM/DD/YYYY"));
        console.log(data2);
        document.getElementById("showMe").style.display = "inline";
        console.log(locationW);
        console.log("two lon" + locationW.lon);
        console.log("two lat" + locationW.lat);
        //document.getElementById("cityName").value ="";
        //alert(moment.unix(data2.current.dt).format("MM/DD/YYYY"))
        console.log("current tamp " + data2.current.temp);
        console.log(cityName);
        //var todayTemp = ((data2.current.temp)- 273.15) * 9 / 5 + 32
        //convert stupid Kelvin to what it was intended to be fahrenheit
        //var todaysTemp = todayTemp.toFixed(0);
        //limit it so it isn't a ridiculous number
        
        console.log("Temperature " + data2.current.temp)
        var index = data2.current.uvi
        dailyW = {
            "animals" : "Frog",
            "city" : cityName,
            "date" : todaysDate,
            "icon" : data2.current.weather[0].icon,
            "temperature" : data2.current.temp,
            "wind" : data2.current.wind_speed,
            "humidity" : data2.current.humidity,
            "UV-index" : data2.current.uvi
        };
        document.getElementById("city").textContent = dailyW.city;
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
    //This get the information for the first day
    var requestSecondUrl =`https://api.openweathermap.org/data/2.5/onecall?lat=${locationW.lat}&lon=${locationW.lon}&units=imperial&exclude={part}&appid=${apiKey}`
    fetch(requestSecondUrl)
    .then(function (response2) {
        return response2.json();
      })
    .then(function (data3) {
      
        var date = (moment.unix(data3.daily[1].dt).format("dddd MMM Do"));
        
        console.log(data3);
        console.log(locationW);
        console.log("two lon" + locationW.lon);
        console.log("two lat" + locationW.lat);
        //alert(moment.unix(data3.daily[0].dt).format("MM/DD/YYYY"))
        console.log("current temp " + data3.daily[1].temp.max);
        console.log(cityName);
        //var todayTemp = ((data3.daily[1].temp.max)- 273.15) * 9 / 5 + 32
        //convert stupid Kelvin to what it was intended to be fahrenheit
        //var todaysTemp = todayTemp.toFixed(0);
        //limit it so it isn't a ridiculous number
        console.log("Temperature " + data3.daily[1].temp.max)
        dailyW = {
            "animals" : "Turtles",
            "date" : date,
            "icon" : data3.daily[1].weather[0].icon,
            "temperature" : data3.daily[1].temp.max,
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
  //This gets the information for the second day.
  var requestSecondUrl =`https://api.openweathermap.org/data/2.5/onecall?lat=${locationW.lat}&lon=${locationW.lon}&units=imperial&exclude={part}&appid=${apiKey}`
  fetch(requestSecondUrl)
  .then(function (response3) {
      return response3.json();
    })
  .then(function (data4) {
    
      var date = (moment.unix(data4.daily[2].dt).format("dddd MMM Do"));
      var todayTemp = data4.daily[2].temp.max;
      var todaysTemp = todayTemp.toFixed(0);
      console.log(todaysTemp);
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
  //This gets the information for the third day.
  var requestSecondUrl =`https://api.openweathermap.org/data/2.5/onecall?lat=${locationW.lat}&lon=${locationW.lon}&units=imperial&exclude={part}&appid=${apiKey}`
  fetch(requestSecondUrl)
  .then(function (response4) {
      return response4.json();
    })
  .then(function (data5) {
    
      var date = (moment.unix(data5.daily[3].dt).format("dddd MMM Do"));
      var todayTemp = data5.daily[3].temp.max;
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
  //This gets the information for the forth day
  var requestSecondUrl =`https://api.openweathermap.org/data/2.5/onecall?lat=${locationW.lat}&lon=${locationW.lon}&units=imperial&exclude={part}&appid=${apiKey}`
  fetch(requestSecondUrl)
  .then(function (response5) {
      return response5.json();
    })
  .then(function (data6) {
    
      var date = (moment.unix(data6.daily[4].dt).format("dddd MMM Do"));
      var todayTemp = data6.daily[4].temp.max;
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
  //This gets the information for the Fifth day
  var requestSecondUrl =`https://api.openweathermap.org/data/2.5/onecall?lat=${locationW.lat}&lon=${locationW.lon}&units=imperial&exclude={part}&appid=${apiKey}`
  fetch(requestSecondUrl)
  .then(function (response6) {
      return response6.json();
    })
  .then(function (data7) {
    
      var date = (moment.unix(data7.daily[5].dt).format("dddd MMM Do"));
      var todayTemp = data7.daily[5].temp.max;
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
  //This is the information for the current day
  var requestSecondUrl =`https://api.openweathermap.org/data/2.5/onecall?lat=${locationW.lat}&lon=${locationW.lon}&units=imperial&exclude={part}&appid=${apiKey}`
  fetch(requestSecondUrl)
  .then(function (response7) {
      return response7.json();
    })
  .then(function (data8) {
    
      var date = (moment.unix(data8.daily[0].dt).format("dddd MMM Do"));
      var todayTemp = data8.daily[0].temp.max;
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
      document.getElementById("cityName").value ="";
      var img = document.createElement('img');
          img.src = futureInfo;
          document.getElementById('iconP').appendChild(img);    
  });
  
}
findIt.addEventListener('click', getWeatherApi);


function renderSearchedCities() {
  // Use JSON.parse() to convert text to JavaScript object
  var searchedCities = JSON.parse(localStorage.getItem("data"));
  console.log(searchedCities);
  if(searchedCities !== ""){
  for(var i = 0; i < searchedCities.length; i++){
  var part1= searchedCities[i].city;
  console.log(part1);
  // button inspired by https://learntocodetogether.com/create-and-styling-a-button-with-javascript-html-css-step-by-step-2019/
  var newButton = document.createElement("button");
  newButton.id = part1;
  newButton.class = "stupidTrash saveButton"
  newButton.name = part1;
  newButton.textContent = part1;
  document.getElementById("searched").appendChild(newButton);
  //getElementById("Austin").addEventListener("click",getWeatherApi(cityName))
// 1. Create the button
//var button = document.createElement("button");
//button.innerHTML = "Do Something";

// 2. Append somewhere
//https://codepen.io/davidcochran/pen/WbWXoa David Cochran
var ul = document.getElementsByTagName("ul")[0];
ul.appendChild(newButton);

// 3. Add event handler
newButton.addEventListener ("click", function() {
  //alert("Still working"); 
  


    myFunction(this);
});

  };
 //changeButtons();
}
}; 
// function changeButtons(event) {
//   console.log(event.target);
//   var btnClicked = $(event.target);
//   btnClicked.child('ul').sayHelloAgain();
// }
// function sayHelloAgain (part1){
//   alert(part1);
//}
function myFunction(el) {
  //alert (el.id);
  var oldCityName = el.id;
  console.log(oldCityName)
  secondTimeAround(oldCityName);
  };
// function changeButtons() {
//   var row = document.querySelectorAll(".stupidTrash");
// for (i = 0; i < row.length; i++) {
//   var targetBtn = row[i].querySelector(".saveButton");
//   targetBtn.addEventListener("click", function (event) {
//       var id = event.target.closest("#searched").getAttribute("id");
//       cityName = id;
//        console.log(cityName);
//        });

// };};
  


  // Check to see if there is data in the varable.  If there is, contine onward!
  //var i = 0;
  //if (searchedCities !== null) {
   
    //for (var i = 0; i < data.length; i++) {
      //var cities = document.createElement('button');
      //var pastCity = data[i].value;
      //issueTitle.textContent = data[i].name;
      //document.getElementById("searched").append(cities);
      //issuesContainer.append(repoTitle);
      //var step1 = document.createElement("button");
      //document.step1.textContent(pastCity);

    

function init() {
  // When the init function is executed, the code inside renderLastGrade function will also execute
  renderSearchedCities();
  
}
init();

var apiKey = "da319c80a92981c05924a706c9b206b6"
//api.openweathermap.org/data/2.5/weather?q={city name}&appid=da319c80a92981c05924a706c9b206b6
//api.openweathermap.org/data/2.5/weather?q=Austin&appid=da319c80a92981c05924a706c9b206b6
//https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
//https://api.openweathermap.org/data/2.5/onecall?lat=30.2672&lon=-97.7431&exclude={part}&appid=da319c80a92981c05924a706c9b206b6

