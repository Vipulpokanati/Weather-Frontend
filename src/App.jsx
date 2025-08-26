import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import './App.css'; 
function App() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [weather, setWeather] = React.useState(null);
  const onSubmit = async (data) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${data.city}&appid=5800f42a1230b82e64fe80e6cd21211d&units=metric`);
      setWeather(response.data);
    } catch (error) {
      alert("Error fetching weather data.");
    }
  };

return (
  <div className="container">
    <h1>Weather Report</h1>

    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        placeholder="Enter city"
        {...register("city", { required: "City name is required" })}
      />
      {errors.city && <p className="error-message">{errors.city.message}</p>}
      <button type="submit">Get Weather</button>
    </form>

    {weather && (
      <div className="weather-info">
        <h2>{weather.name}</h2>
        <p>{weather.weather[0].main} - {weather.weather[0].description}</p>
        <p>Temp: {weather.main.temp} °C</p>
        <p>Feels like: {weather.main.feels_like} °C</p>
        <p>Humidity: {weather.main.humidity}%</p>
        <p>Min Temp: {weather.main.temp_min} °C</p>
        <p>Max Temp: {weather.main.temp_max} °C</p>
      </div>
    )}
  </div>
);
}

export default App;

