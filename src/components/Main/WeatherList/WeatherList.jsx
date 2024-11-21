import React, { useEffect, useState } from "react";
import WeatherCard from "./WeatherCard";
import axios from "axios";


const WeatherList = () => {
  const [weather, setWeather] = useState([]);
  const [city, setCity] = useState("Toronto");
  const [values, setValue] = useState();
  const renderWeather = () => {
    return weather.map((w) => <WeatherCard weather={w}/>);
  }


  useEffect(() => {
    const getWeather = async () => {
      try {
        const resp = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=es&appid=${import.meta.env.VITE_API_KEY}`)
        setWeather(resp.data.list)
      } catch (err) {
        console.log(err)
      }
    }
    getWeather();
  }, []);

  useEffect(() => {
    // La primera vez que se hace la llamada a la API y lo pinta
    const getWeather = async () => {
      try {
        const resp = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=es&appid=${import.meta.env.VITE_API_KEY}`);

        setWeather(resp.data.list)
      } catch (err) {
        console.log(err)
      }
    }
    getWeather();
  }, [city]);

  const handleChange = (e) => {
    setValue(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setCity(values);
    setValue("");
  }

  return <>
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Cuenca..."name="title" value={values} onChange={handleChange} />
      <button type="submit">🔎</button>
    </form>
    <h2>{city}</h2>
    <section className="section-cards">
      {renderWeather()}
    </section>
  </>
};

export default WeatherList;
