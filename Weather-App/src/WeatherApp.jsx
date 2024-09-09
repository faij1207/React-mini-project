import SearchBox from "./SearchBox"
import InfoBox from "./InfoBox"
import { useState } from "react"

export default function WeatherApp(){
    const[weatherInfo, setWeatherInfo]=useState({
        city: "Wonderland",
        temp:25.05,
        feelsLike:24.98,
        humidity: 60,
        tempMax:32.32,
        tempMin: 18.32,
        weather:"haze",
    });

    let updateInfo=(newInfo)=>{
        setWeatherInfo(newInfo);
    }

    return(
        <div style={{textAlign:"center"}}>
            <h2>Weather App by Crazy Coder</h2>
            <SearchBox updateInfo={updateInfo}/>
            <InfoBox info={weatherInfo}/>
        </div>
    )
}