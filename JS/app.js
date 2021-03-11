/**This cannot work on a local server without a proxy**/
//when the page loads execute this function

window.addEventListener("load", ()=>{
    let long;
    let lat;
    let tempDesc = document.querySelector(".temp-description");
    let tempDeg = document.querySelector(".temp-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let sec = document.querySelector(".degree-sec");
    let spa = document.querySelector("span");
    let timeDis = document.querySelector(".time-display");
    let img = document.querySelector(".image-display");

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const key = "4aec08b247371a22399fa9a4807d8429";
            const api = `api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}`;

        
            fetch(api)
                .then(response =>{
                    return response.json();
                })
                .then(data =>{


                    tempDeg.textContent = Math.round(data.main.temp - 273.15);
                    
                    
                    const weather = data.weather[0].description;
                    tempDesc.textContent = weather.charAt(0).toUpperCase() + weather.slice(1);
                    
                    const time = new Date(data.dt * 1000);//mulitply by 1000 to convert from seconds to milliseconds
                    let hours = time.getHours();
                    const minutes = time.getMinutes();
                    
                    //picture display, getting sunrise and sun set to figure out when it's dark, to display the proper pictures
                    
                    const sunrise = new Date(data.sunrise * 1000);
                    const sunriseHour = sunrise.getHours();
                    const sunset = new Date(data.sunset * 1000);
                    const sunsetHour = sunset.getHours();

                    if(hours > sunriseHour && hours < sunsetHour){//during the day

                        if(data.weather[0].main == "clear"){
                            img.src = "pics/oned.png";
                        }
                        else if(data.weather[0].main == "thunderstorm"){
                            img.src = "pics/elevend.png";
                        }
                        else if(data.weather[0].main == "drizzle"){
                            img.src = "pics/nined.png";
                        }
                        else if(data.weather[0].main == "rain"){
                            img.src = "pics/tend.png";
                        }
                        else if(data.weather[0].main == "snow"){
                            img.src = "pics/thirteend.png";
                        }
                        else if( 800 > data.weather[0].id > 700 ){
                            img.src = "pics/fiftyd.png";
                        }
                        else if(data.weather[0].main == "clouds"){
                            img.src = "pics/twod.png";
                        }
                       

                    }
                    else{

                        if(data.weather[0].main == "clear"){
                            img.src = "pics/onen.png";
                        }
                        else if(data.weather[0].main == "thunderstorm"){
                            img.src = "pics/elevend.png";
                        }
                        else if(data.weather[0].main == "drizzle"){
                            img.src = "pics/nined.png";
                        }
                        else if(data.weather[0].main == "rain"){
                            img.src = "pics/tenn.png";
                        }
                        else if(data.weather[0].main == "snow"){
                            img.src = "pics/thirteend.png";
                        }
                        else if( 800 > data.weather[0].id > 700 ){
                            img.src = "pics/fiftyd.png";
                        }
                        else if(data.weather[0].main == "clouds"){
                            img.src = "pics/twon.png";
                        }
                       

                    }

                    //time display

                    if(hours == 12){//gives the proper time right at noon
                        if(minutes < 10){
                            timeDis.textContent = `${hours}:0${minutes} PM`;
                        }
                        else{
                            timeDis.textContent = `${hours}:${minutes} PM`;
                        }
                    }
                    else if(hours > 12){
                        hours = hours - 12;
                        if(minutes < 10){
                            timeDis.textContent = `${hours}:0${minutes} PM`;
                        }
                        else{
                            timeDis.textContent = `${hours}:${minutes} PM`;
                        }
                    }
                    else if(hours == 0){//gives 0 hours at midnight (military time), this is a workaround for it
                        if(minutes < 10){
                            timeDis.textContent = `12:0${minutes} AM`;
                        }
                        else{
                            timeDis.textContent = `12:${minutes} AM`;
                        }
                    }
                    else{
                        if(minutes < 10){
                            timeDis.textContent = `${hours}:0${minutes} AM`;
                        }
                        else{
                            timeDis.textContent = `${hours}:${minutes} AM`;
                        }
                    }
                    
                    //backwards single quote is important here to interpret the ${dataName}
                    locationTimezone.textContent = `${data.name} Area`;

                    sec.addEventListener('click', () =>{

                        if(spa.textContent === "C"){
                            tempDeg.textContent = Math.round(((data.main.temp -273.15) * 9/5) + 32);
                            spa.textContent = "F";
                        }
                        else{
                            tempDeg.textContent = Math.round(data.main.temp - 273.15);
                            spa.textContent = "C";
                        }

                    });

                });
        
        });

    }
    else{
        alert('Please refresh and allow location');
    }

});