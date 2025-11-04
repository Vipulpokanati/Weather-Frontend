import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import './App.css';

function App() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [weather, setWeather] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    setWeather(null);
    
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${data.city}&appid=5800f42a1230b82e64fe80e6cd21211d&units=metric`
      );
      setWeather(response.data);
    } catch (error) {
      setError("City not found. Please check the spelling and try again.");
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (weatherMain) => {
    const iconMap = {
      Clear: '☀️',
      Clouds: '☁️',
      Rain: '🌧️',
      Drizzle: '🌦️',
      Thunderstorm: '⛈️',
      Snow: '❄️',
      Mist: '🌫️',
      Fog: '🌫️',
    };
    return iconMap[weatherMain] || '🌤️';
  };

  const getBackgroundClass = (weatherMain) => {
    const backgroundMap = {
      Clear: 'clear',
      Clouds: 'clouds',
      Rain: 'rain',
      Drizzle: 'drizzle',
      Thunderstorm: 'thunderstorm',
      Snow: 'snow',
      Mist: 'mist',
      Fog: 'mist',
    };
    return backgroundMap[weatherMain] || 'default';
  };

  return (
    <div className={`app ${weather ? getBackgroundClass(weather.weather[0].main) : 'default'}`}>
      <div className="container">
        <div className="header">
          <h1 className="title">🌤️ Weather Forecast</h1>
          <p className="subtitle">Get real-time weather information for any city</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="weather-form">
          <div className="input-group">
            <input
              className="city-input"
              placeholder="Enter city name..."
              {...register("city", { 
                required: "City name is required",
                minLength: {
                  value: 2,
                  message: "City name must be at least 2 characters"
                }
              })}
            />
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Searching...' : 'Get Weather'}
            </button>
          </div>
          {errors.city && <p className="error-message">{errors.city.message}</p>}
        </form>

        {error && (
          <div className="error-container">
            <p className="error-text">{error}</p>
          </div>
        )}

        {loading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Fetching weather data...</p>
          </div>
        )}

        {weather && (
          <div className="weather-card">
            <div className="weather-header">
              <h2 className="city-name">
                {weather.name}, {weather.sys.country}
              </h2>
              <div className="weather-icon">
                {getWeatherIcon(weather.weather[0].main)}
              </div>
            </div>
            
            <div className="weather-main">
              <div className="temperature">
                {Math.round(weather.main.temp)}°C
              </div>
              <div className="weather-description">
                {weather.weather[0].description}
              </div>
            </div>

            <div className="weather-details">
              <div className="detail-item">
                <span className="detail-label">Feels like</span>
                <span className="detail-value">{Math.round(weather.main.feels_like)}°C</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Humidity</span>
                <span className="detail-value">{weather.main.humidity}%</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Pressure</span>
                <span className="detail-value">{weather.main.pressure} hPa</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Wind Speed</span>
                <span className="detail-value">{weather.wind.speed} m/s</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Min Temp</span>
                <span className="detail-value">{Math.round(weather.main.temp_min)}°C</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Max Temp</span>
                <span className="detail-value">{Math.round(weather.main.temp_max)}°C</span>
              </div>
            </div>

            <div className="weather-footer">
              <p className="update-time">
                Last updated: {new Date(weather.dt * 1000).toLocaleTimeString()}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
