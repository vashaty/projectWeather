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
var xd = 0;
button.onclick = function (name) 
{
    main.innerHTML = "";
    if(xd != 0){
        for(i = 0; i < 5; i++){
            document.getElementById("card"+i).remove();
        }
    }
    myJsonContent = fetch('http://api.openweathermap.org/data/2.5/forecast?q='+input.value+'&appid=efa340fdb65947b231e403f7a0a9c21a&units=metric&lang=cz')
    
    .then(function (response) 
    {
        if (response.ok) {
            return response.json();
          } else {
            throw new Error('Lokalita nebyla nalezeno.');
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
        main.innerHTML = myJson.city.name;
        var temp = "xd";
        var j = 0;
        for (i = 0; i < 40; i++) {
            var p = document.createElement("p");
            var datum = myJson.list[i].dt_txt.split(" ");
            if(temp != datum[0]){
                var div = document.createElement("div");
                div.setAttribute("id", "card"+j);
                j++;
                div.setAttribute("class", "card");
                document.getElementById("container").appendChild(div);
                // var divV = document.querySelector('#card'+i);
                temp = datum[0];
                p.innerHTML = temp;
                div.appendChild(p);
                var hr = document.createElement("hr");
                div.appendChild(hr);
                xd++;
            }

            p = document.createElement("p");
            p.innerHTML = datum[1];
            div.appendChild(p);

            p = document.createElement("p");
            p.innerHTML = myJson.list[i].main.temp + "°C";
            div.appendChild(p); 

            p = document.createElement("p");
            p.innerHTML = myJson.list[i].weather[0].description;
            div.appendChild(p);
            
            hr = document.createElement("hr");
            div.appendChild(hr);


            

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