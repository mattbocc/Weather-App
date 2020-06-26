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

            const proxy = "https://cors-anywhere.herokuapp.com/";
            const key = "7d208166e1f3ab14953cf6af05917ac6";
            const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}`;
        
            fetch(api)
                .then(response =>{
                    return response.json();
                })
                .then(data =>{
                    console.log(data);

                    tempDeg.textContent = Math.round(data.main.temp - 273.15);
                    
                    
                    const weather = data.weather[0].description
                    tempDesc.textContent = weather.charAt(0).toUpperCase() + weather.slice(1);

                    const ic = data.weather[0].icon;
                    const icon = `http://openweathermap.org/img/wn/${ic}@2x.png`;
                    img.src = icon;
                    
                    
                    
                    const time = new Date(data.dt  * 1000);//mulitply by 1000 to convert from seconds to milliseconds
                    let hours = time.getHours();
                    const minutes = time.getMinutes();
                    

                    if(hours > 12){
                        hours = hours - 12;
                        if(minutes < 10){
                            timeDis.textContent = `${hours}:0${minutes} PM`;
                        }
                        else{
                            timeDis.textContent = `${hours}:${minutes} PM`;
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