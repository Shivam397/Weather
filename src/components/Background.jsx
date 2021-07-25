import React, { useState, useEffect } from 'react';
import './css/style.css';

const backImg = {
    backgroundImage: "url(/img/image.jpg)",
    width: '100%',
    height: '100vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: "no-repeat",
    zIndex: '-1'
}

const style = {
    fontSize : '40px'
}


const Background = () => {
    const [tym, setTym] = useState(new Date().toLocaleString());
    const [city, setCity] = useState(null);
    const [search, setSearch] = useState(null);
    const [weather, setWeather] = useState(null);
    const [land, setLand] = useState(null);

    const setTime = () => {
        setTym(new Date().toLocaleString());
    }
    setInterval(setTime, 1000);
            

    useEffect(() => {
        const fetchApi = async () => {
            const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&APPID=3553a0b46fdd790764f7067ebb4cf1b7`);
            const data = await response.json();
            setLand(data.weather);
            setWeather(data.wind);
            setCity(data.main);
        }

        fetchApi();
    },[search] )

    
    const desc = () => {
        switch(land[0].main){
            case 'clear':
                return <i className="fas fa-sun" style={style}></i>;
            case 'Clouds':
                return <i className="fas fa-cloud" style={style}></i>;
            case 'Thunderstorm':
                return <i className="fas fa-poo-storm" style={style}></i>;
            case 'Drizzle':
                return <i className="fas fa-cloud-sun" style={style}></i>;
            case 'Rain':
                return <i className="fas fa-cloud-showers-heavy" style={style}></i>;
            case 'snow':
                return <i className="fas fa-snowflake" style={style}></i>;
            case 'Mist':
                return <i className="fab fa-cloudsmith" style={style}></i>;
            case 'Haze':
                return <i className="fas fa-smog" style={style}></i>;
            default:
                return <i className="fas fa-sun" style={style}></i>;
        }
    }

    const temp = () => {
        if(city.temp < 30)
            return <i className="fas fa-temperature-low" style={style}></i>;
        else
            return <i className="fas fa-temperature-high" style={style}></i>;
    }


    return (
        <>
            <div className='container' style={backImg}>
                <h1 style={{ textAlign: 'center', color: '#fff', zIndex: '999' }}>{tym}</h1><br></br><br></br>
                <div className='inputData'>
                    <input type='text'
                        className='inputField'
                        placeholder='enter city name'
                        onChange={(event) => {
                            setSearch(event.target.value);
                        }}
                    />
                </div>

            {!city ? (
                <p className='noData'> No data found </p>
            ) : (
                    <>
                        <h1 className='location'>
                            <i className="fas fa-street-view"></i>
                            {search}
                        </h1>
                        <div className='box-info'>
                            <div className='box'>
                                <h1 className='tempt'>
                                    {temp()} &nbsp;
                                    {city.temp}&deg;C
                                </h1><br/>
                                <h1 className='temp_max'> Max: {city.temp_max}&deg;C </h1> 
                                <h1 className='temp_min'> Min: {city.temp_min}&deg;C </h1>
                                <h1> Feels like : {city.feels_like}&deg;C </h1>
                            </div>

                            <div className='weather-info'>
                                <h2 className='humidity'>
                                <i className="fas fa-humidity" style={{fontSize:'40px'}}></i>
                                    {city.humidity}% Humidity
                                </h2><br></br>

                                <h2 className='pressure'>
                                <i className="fas fa-tire-pressure-warning"></i>
                                    {city.pressure} PS Pressure
                                </h2><br></br>

                                <h2 className='wind-speed'>
                                <i className="fas fa-wind" style={{fontSize:'40px'}}></i>
                                    &nbsp; {weather.speed} km/h
                                </h2>

                            </div>
                        </div>

                        <div className='nature'>
                            <div className='nature-info'>
                                <h1 className='main'>
                                    {desc()}&nbsp; 
                                    {land[0].main}
                                </h1>
                                <p className='we-desc' style={{fontSize:'40px',textDecoration:'capitalize'}}> {land[0].description} </p>
                            </div>
                        </div>
                    </>

                )}

            </div>
        </>
    );
}

export default Background;