function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(showPosition);
  } else { 
    document.querySelector("#city").innerText = "Please check the location you entered";

clearData();
  }
}

function showPosition(position) {
	console.log(position.coords.latitude);
	weatherAPI_C(position.coords.latitude,position.coords.longitude);
	
}

const getWeatherByName = () =>{
	
	 let search = document.querySelector("#place");
	 if(!search.value){
		document.querySelector("#city").innerText = "Location cannot be empty"; 
		clearData();
	 }
	 else{
		  weatherAPI_location(search.value)
	 }
	
}


// this function is to get weather deatils based on coordinates.
const weatherAPI_C = (latitude,longitude) =>{
fetch("https://weatherdbi.herokuapp.com/data/weather/"+latitude+","+longitude)
    .then(res=>res.json())
    .then(json=>showWeather(json))
	
}
const weatherAPI_location = (location) =>{
	fetch("https://weatherdbi.herokuapp.com/data/weather/"+location)
    .then(res=>res.json())
    .then(json=>showWeather(json))
}

const showWeather =(data) =>{
	
		if(data.status==="fail"){
			
			document.querySelector("#city").innerText = "Please check the location you entered";

		  clearData();
		}
		else{
		const { region } = data;
        const { temp, dayhour, precip, humidity, wind, comment, iconURL } = data.currentConditions;
		console.log(region);
		console.log(data);
		  document.querySelector("#city").innerText = region;
		  document.querySelector("#iconURL img").src = iconURL;
		  document.querySelector("#iconURL p").innerText = comment;
		  document.querySelector("#temp").innerText = dayhour +"\n"+temp.c +"°C";
		  document.querySelector("#details").innerText = "Wind:"+wind.mile+" m"+"\nPrecip:"+precip+"\nHumidity:"+humidity;
		  
		  document.getElementById('forecaste').innerHTML = "";
		   data.next_days.slice(1).map((x) => {
            getForcasteDiv(x.day, x.iconURL, x.min_temp.c, x.max_temp.c, x.comment);
        })
		}
		  
}

const getForcasteDiv = (day,icon, min, max,comment) =>{
	
	 let div = document.createElement("div");
        div.classList.add('Nextday');
        const markup = `
			<p class="day">${day}</p>
            <img src=${icon} class="iconURL-future">
			<p >${comment}</p>
            <p class="min-temp">${min}°C - ${max}°C</p>`
        div.innerHTML = markup;
        document.querySelector("#forecaste").appendChild(div);
}

const clearData =() =>{

		  document.querySelector("#iconURL img").src = "";
		  document.querySelector("#iconURL p").innerText = "";
		  document.querySelector("#temp").innerText = "";
		  document.querySelector("#details").innerText = "";
		  document.getElementById('forecaste').innerHTML = "";
}