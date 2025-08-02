import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import './App.css'; 
function App() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [weather, setWeather] = React.useState(null);

  const onSubmit = async (data) => {
    try {
      const response = await axios.get(`https://weather-backend-production-fc95.up.railway.app/api/weather?city=${data.city}`);
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
      <button type="submit">Get Weather</button>
      {errors.city && <p className="error-message">{errors.city.message}</p>}
    </form>

    {weather && (
      <div className="weather-info">
        <h2>{weather.name}</h2>
        <p>{weather.weather[0].main} - {weather.weather[0].description}</p>
        <p>Temp: {weather.main.temp} °C</p>
        <p>Humidity: {weather.main.humidity}%</p>
      </div>
    )}
  </div>
);
}

export default App;

