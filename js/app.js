var input = document.querySelector('.input_text');
var main = document.querySelector('#name');
// var temp = document.querySelector('#t0');
// var date = document.querySelector('#da0');
// var desc = document.querySelector('#de0');
// var clouds = document.querySelector('#c0');
var button= document.querySelector('.submit');


// button.addEventListener('click', function(name){
//   //http://api.openweathermap.org/data/2.5/forecast?q=London&appid=efa340fdb65947b231e403f7a0a9c21a
// fetch('http://api.openweathermap.org/data/2.5/forecast?q='+input.value+'&appid=efa340fdb65947b231e403f7a0a9c21a&units=metric&lang=cz')
// .then(response => response.json())
// .then(data => {
//   var dateValue = data['main'][1]['temp'];
//   var tempValue = data['main'][1]['dt_txt'];
//   var nameValue = data['city']['name'];
//   var descValue = data['weather'][1]['description'];

//   main.innerHTML = nameValue;
//   desc.innerHTML = "Desc - "+descValue;
//   temp.innerHTML = "Temp - "+tempValue;
//   temp.innerHTML = "Date - "+dateValue;
//   input.value ="";

// })

// .catch(err => alert("Wrong city name!"));
// })
var input = document.getElementById("myInput");

// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("myBtn").click();
  }
});

var xd = 0;
function forecast(name) 
{
    main.innerHTML = "";
    if(xd != 0){
        for(i = 0; i < 6; i++){
            document.getElementById("card"+i).remove();
        }
    }
    myJsonContent = fetch('http://api.openweathermap.org/data/2.5/forecast?q='+name+'&appid=efa340fdb65947b231e403f7a0a9c21a&units=metric&lang=cz')
    
    .then(function (response) 
    {
        if (response.ok) {
            return response.json();
          } else {
            throw new Error('Lokalita nebyla nalezena.');
          }
    })
    

    .then(function (myJson) 
    {
        // var today = new Date();
        // var time = today.getDate()+'. '+(today.getMonth()+1) +". "+ today.getFullYear() + " " +today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();  
        // resultInput.value = myJson.responseData.translatedText;
        console.log(myJson);
        // loadingDiv.style.display = 'none';
        // localStorage.setItem(localStorage.length, time +" -- "+userInput.value + " -> " + resultInput.value);
        // makeHistory();
        // localStorage.clear();
        var favBtn = document.createElement("input")
        favBtn.setAttribute("type","submit");
        favBtn.setAttribute("value","Přidat do oblíbených");
        favBtn.setAttribute("id","favBtn");
        main.innerHTML = myJson.city.name;
        main.appendChild(favBtn);
        var months =["xxx","ledna","února","března","dubna","května","června","července","srpna","září","října","listopadu","prosince"];
        var temp = "xd";
        var weekday = ["neděle", "pondělí", "úterý","středa","čtvrtek","pátek","sobota"];
        var j = 0;
        for (i = 0; i < 40; i++) {
            var p = document.createElement("p");
            var thTime = document.createElement("th");
            var thTemperature = document.createElement("th");
            var thDesc = document.createElement("th");
            var thWind = document.createElement("th");
            var datum = myJson.list[i].dt_txt.split(" ");
            var date = new Date(datum[0]);
            var day = date.getDay();
            
            if(temp != datum[0]){
                var div = document.createElement("div");
                div.setAttribute("id", "card"+j);
                j++;
                div.setAttribute("class", "card");

                var table = document.createElement("table");

                document.getElementById("container").appendChild(div);

                temp = datum[0];
                var tempSplit = datum[0].split("-");
                p.innerHTML = weekday[day] + " " + parseInt(tempSplit[2])+". "+months[parseInt(tempSplit[1])]+" "+tempSplit[0];
                div.appendChild(p);
                // var hr = document.createElement("hr");
                // div.appendChild(hr);
                xd++;

                div.appendChild(table);

                var tr = document.createElement("tr");
                thTime.innerHTML = "Čas";
                tr.appendChild(thTime);
                thTemperature.innerHTML = "Teplota";
                tr.appendChild(thTemperature);
                thWind.innerHTML = "Vítr";
                tr.appendChild(thWind);
                thDesc.innerHTML = "Popis";
                tr.appendChild(thDesc);
                table.appendChild(tr);

                // var divV = document.querySelector('#card'+i);
                
            }

            tr = document.createElement("tr");
            var tdTime = document.createElement("td");
            var tdTemperature = document.createElement("td");
            var tdDesc = document.createElement("td");
            var tdWind = document.createElement("td");
            var icon = document.createElement("img");
            icon.src = "http://openweathermap.org/img/wn/"+ myJson.list[i].weather[0].icon +"@2x.png";
            icon.height = 30;
            icon.width = 30;

            var windArrow = document.createElement("i");
            windArrow.setAttribute("class", "arrow");
            windArrow.style.transform = "rotate("+myJson.list[i].wind.deg+"deg)";

            tdTime.innerHTML = datum[1];
            tr.appendChild(tdTime);
            tdTemperature.innerHTML = myJson.list[i].main.temp + "°C";
            tr.appendChild(tdTemperature);
            tdWind.innerHTML = myJson.list[i].wind.speed + " m/s ";
            tdWind.appendChild(windArrow);
            tr.appendChild(tdWind);
            tdDesc.innerHTML = myJson.list[i].weather[0].description;
            tdDesc.appendChild(icon);
            tr.appendChild(tdDesc);
            table.appendChild(tr);
            document.getElementById("favBtn").onclick = function (){
              saveFav();
              loadFav();
            }
            // p = document.createElement("p");
            // p.innerHTML = datum[1];
            // div.appendChild(p);

            // p = document.createElement("p");
            // p.innerHTML = myJson.list[i].main.temp + "°C";
            // div.appendChild(p); 

            // p = document.createElement("p");
            // p.innerHTML = myJson.list[i].weather[0].description;
            // div.appendChild(p);
            
            // hr = document.createElement("hr");
            // div.appendChild(hr);




            

        }
        // var dateValue = myJson.list[0].dt_txt;
        // var tempValue = myJson.list[0].main.temp;
        // var nameValue = myJson.city.name;
        // var descValue = myJson.list[0].weather[0].description;

        // main.innerHTML = nameValue;
        // desc.innerHTML = descValue;
        // temp.innerHTML = "Teplota - "+tempValue;
        // date.innerHTML = "Datum - "+dateValue;
    }).catch(function(err) {
        alert(err);
      });
    
    // localStorage.setItem(userInput.value, resultInput.value);
    
}
button.onclick = function (){
  forecast(input.value);
}



function saveFav(){
  localStorage.setItem(input.value,input.value);
  console.log(localStorage["brno"]);
  console.log(localStorage);
  loadFav();
}

function loadFav() {
  var text = "";
  for(i = 0; i < localStorage.length ; i++) {
      text += localStorage.getItem(localStorage.key(i)) +"<br>";
  }
  document.getElementById("fav").innerHTML = text;   
}