import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./SearchBox.css";
import { useState } from 'react';

export default function SearchBox ({updateInfo}){
    let [city, SetCity]=useState("");
    let[error ,SetError]=useState(false);

    const API_URL="https://api.openweathermap.org/data/2.5/weather";
    const API_KEY="6cf21cb4a438e7380284c9baaa7758c4";

    let getWeatherInfo=async()=>{
        try{
            let response=await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
        let data=await response.json();
        // console.log(data);
        let result={
            city:city,
            temp: data.main.temp,
            humidity: data.main.humidity,
            weather: data.weather[0].description,
            tempMin: data.main.temp_min,
            tempMax: data.main.temp_max,
            feelsLike: data.main.feels_like,
        };
        console.log(result);
        return result;
        } catch(error){
            throw error;
        }
        
    };

    let handleChange =(event)=>{
        SetCity(event.target.value)
    };

    let handleSubmit=async (event)=>{
        try{
        event.preventDefault();
        console.log(city);
        SetCity("");
        let newInfo=await getWeatherInfo();
        updateInfo(newInfo);
        } catch(error){
            SetError(true);
            }
    }
    return(
        <div className="SearchBox">
            <form action="" onSubmit={handleSubmit}>
            <TextField 
              id="city" 
              label="City Name" 
              variant="outlined" 
              required 
              value={city}
              onChange={handleChange}
            />
            <br /><br />
            <Button variant="contained" type='submit'>Send </Button>
            {error && <p style={{color:"red"}}>No such place exists</p>}
            </form>
        </div>
    )
}