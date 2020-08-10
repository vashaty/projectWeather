var input = document.querySelector('.input_text');
var button= document.querySelector('.submit');
var input = document.getElementById("myInput");

//přitání funkce enteru
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("myBtn").click();
  }
});

var xd = 0; //proměnná pro zjištění aktivních tabulek
function forecast(name) 
{
  //smazání existujících tabulek
    if(xd != 0){
      document.getElementById("nameDiv").remove();
        document.getElementById("favDiv");
        var countRemove = document.getElementsByClassName("card").length; //potřebná oprava
        for(i = 0; i < countRemove; i++){
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

        console.log(myJson);

        //vytvoření divu na jméno a tlačítko pro přidání oblíbených
        var nameDiv = document.createElement("div");
        nameDiv.setAttribute("id","nameDiv");

        var favBtn = document.createElement("input");
        var hName = document.createElement("h1");
        hName.setAttribute("class","name");
        hName.setAttribute("id","name");
        favBtn.setAttribute("type","submit");

        //přepínač na tlačítko
        if(localStorage.getItem(myJson.city.name) != null){
          favBtn.setAttribute("value","Odebrat z oblíbených");
        }else{
          favBtn.setAttribute("value","Přidat do oblíbených");
        }

        favBtn.setAttribute("id","favBtn");

        hName.innerHTML = myJson.city.name;

        //přidání nadpisu a tlačítka do divu
        nameDiv.appendChild(hName);
        nameDiv.appendChild(favBtn);

        document.getElementById("container").appendChild(nameDiv);

        var months =["xxx","ledna","února","března","dubna","května","června","července","srpna","září","října","listopadu","prosince"]; //pole měsícu pro překlad z číselné hodnoty na slova

        var temp = "xd"; //temp proměnná pro datum

        var weekday = ["neděle", "pondělí", "úterý","středa","čtvrtek","pátek","sobota"]; //pole pro překlad dnů v týdnu
        var j = 0; // proměnná pro číslovnání tabulek
        for (i = 0; i < 40; i++) {
            //vytvoření elementů pro nadpis (datum) a vytvoření tabluky
            var p = document.createElement("p");
            var thTime = document.createElement("th");
            var thTemperature = document.createElement("th");
            var thDesc = document.createElement("th");
            var thWind = document.createElement("th");

            //manipulace s datem
            var datum = myJson.list[i].dt_txt.split(" "); //rozdělení na datum a čas
            //získání dčíselné hodnoty dnu v týdnu
            var date = new Date(datum[0]);
            var day = date.getDay();
            
            //vytváření a naplnění tabulky
            if(temp != datum[0]){ //podmínka pro zjištění, jestli se má vytvořit nová tabulka s novým datem
                var div = document.createElement("div");
                div.setAttribute("id", "card"+j);
                j++;
                div.setAttribute("class", "card");

                var table = document.createElement("table");

                document.getElementById("container").appendChild(div);

                temp = datum[0]; //uložení aktuálního data do temp proměnné
                var tempSplit = datum[0].split("-"); //rozdělení data na den, měsíc a rok
                p.innerHTML = weekday[day] + " " + parseInt(tempSplit[2])+". "+months[parseInt(tempSplit[1])]+" "+tempSplit[0]; //nastavení nadpisu tabulky (převod dnu v týdnu na text, měsíce na text)
                div.appendChild(p);
                // var hr = document.createElement("hr");
                // div.appendChild(hr);
                xd++; //proměnná pro zjištění, jestli byla vytvořen div s tabulkou

                div.appendChild(table);
                //nadpisy sloupců tabulky
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
            //nplnění tabulky
            tr = document.createElement("tr");
            var tdTime = document.createElement("td");
            var tdTemperature = document.createElement("td");
            var tdDesc = document.createElement("td");
            var tdWind = document.createElement("td");
            var icon = document.createElement("img");
            icon.src = "http://openweathermap.org/img/wn/"+ myJson.list[i].weather[0].icon +"@2x.png"; //přidání ikony
            icon.height = 30;
            icon.width = 30;

            var windArrow = document.createElement("i"); //směrová šipka větru
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

            favBtn.onclick = function (){
              saveFav();
            }
            console.log(localStorage);
   
        }

    }).catch(function(err) {
        alert(err);
      });
    
    // localStorage.setItem(userInput.value, resultInput.value);
    
}

button.onclick = function (){
  forecast(input.value);
}


var favH3 = document.getElementById("favH3");
//ukládání do localStorage
function saveFav(){
  var hName = document.getElementById("name");
  localStorage.setItem(hName.innerHTML,hName.innerHTML); //podle názvu města se uloží
  if(localStorage.length == 1){ //přepínač nadpisu
    favH3.innerHTML = "Oblíbené lokality:";
  }
  //přepínač popisu tlačítka add
  if(document.getElementById(hName.innerHTML) == null){
    
      var favCity = document.createElement("input");
      favCity.setAttribute("type","submit");
      favCity.setAttribute("class","favCity");
      favCity.setAttribute("onclick","forecastFav(this)");
      // console.log(localStorage.getItem(localStorage.key(i)));
      favCity.setAttribute("value",localStorage.getItem(hName.innerHTML));
      favCity.setAttribute("id",localStorage.getItem(hName.innerHTML));

      document.getElementById("favDiv").appendChild(favCity);
      console.log(localStorage);
      document.getElementById("favBtn").setAttribute("value", "Odebrat z oblíbených");
    
  }else{
    localStorage.removeItem(hName.innerHTML);
    document.getElementById(hName.innerHTML).remove();
    document.getElementById("favBtn").setAttribute("value", "Přidat do oblíbených");
    if(localStorage.length == 0){ //přepínač nadpisu
      favH3.innerHTML = "Nebyly nalezeny žádné oblíbené lokality";
    }
  }
}

function loadFav() {//načítání oblíbených a vytvoření tlačítek
  if(localStorage.length == 0){
    favH3.innerHTML = "Nebyly nalezeny žádné oblíbené lokality";
  }else{
    favH3.innerHTML = "Oblíbené lokality:";
  }
  for(i = 0; i < localStorage.length ; i++) {
    var favCity = document.createElement("input");
    favCity.setAttribute("type","submit");
    favCity.setAttribute("class","favCity");
    favCity.setAttribute("onclick","forecastFav(this)");
    // console.log(localStorage.getItem(localStorage.key(i)));
    favCity.setAttribute("value",localStorage.getItem(localStorage.key(i)));
    favCity.setAttribute("id",localStorage.getItem(localStorage.key(i)));
    document.getElementById("favDiv").appendChild(favCity);

  }
}

function forecastFav(city){
  forecast(city.value);
}
