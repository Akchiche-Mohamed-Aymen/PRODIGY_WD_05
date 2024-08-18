function getWeather(query) {
        var url ="http://api.openweathermap.org/data/2.5/forecast?q=" +query +
        "&units=imperial&APPID=56866f8407bb1e2d63330f3c046f35af";
        axios.get(url)
          .then((data) =>{ 
            document.querySelector('.weather').innerHTML = `
                <h1>${query}</h1>
                <h2> <i class="fa-light fa-brightness"></i> ${Math.round(((data.data.list[0].main.temp)-32)/1.8) } <span>°C<span/></h2>
                <h2>sunny</h2>
                <h2>Humidity : ${data.data.list[0].main.humidity}%</h2>
                <h2>Wind spead  : ${data.data.list[0].wind.speed * 1.852} Km/h</h2>
                <h2>weather state : ${data.data.list[0].weather[0].main} </h2>
            `
          })
          .catch(err => alert(err.message));
      }
let countryInput = document.getElementById("countryInput"),
    cityInput = document.getElementById("cityInput"),
    country = document.getElementById("country"),
    city = document.getElementById("city");
let createOption = (value)=>{
        let option = document.createElement("option");
        option.value = value;
        return option;
    }
function changeCity(val = ''){
    if(countryInput.value === ''){
        cityInput.value = '';
        city.innerHTML = '';
    }
    else{

        axios.get("https://countriesnow.space/api/v0.1/countries")
        
        .then(data =>{
            let countries = data.data.data;
            cityInput.value = val;
            if(val !== "")
                getWeather( cityInput.value)
            city.innerHTML = '';
            for(item of countries){
                if(item.country === countryInput.value){
                    
                    for(state of item.cities){
                        city.appendChild(createOption(state))
                    }
                }
            }
        })
        .catch(err => alert("Error :"+ err))
    }
}
countryInput.onchange = ()=>{
    changeCity()
}
cityInput.onchange = ()=>{
    console.log(cityInput.value)
    if(cityInput.value.length > 0)
        getWeather(cityInput.value)
}

function changeCountry(){
    axios.get("https://countriesnow.space/api/v0.1/countries")
   .then(data => {
    let countries = data.data.data;
    for(item of countries)
        country.appendChild(createOption(item.country))
})
.catch(err => alert("error in changing country"));
}
changeCountry()

document.querySelector("button").onclick = ()=>{
    GetCurrentAddress();
}
function GetCurrentAddress(){
    navigator.geolocation.getCurrentPosition(pos=>{
        const {latitude,longitude} = pos.coords;
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
        axios.get(url)
        .then(data=>{
            countryInput.value = data.data.address.country;
            changeCity(data.data.address.city)
        })
        .catch(err => alert("Error "))
    })}


