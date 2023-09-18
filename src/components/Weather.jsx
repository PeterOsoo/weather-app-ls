import { useState, useEffect } from "react"
import axios from "axios"

const API_KEY = "e707f0dfb8bd54402326bf6c75984a34"
const API_URL = "https://api.openweathermap.org/data/2.5/weather"

const Weather = () => {
	const [weatherData, setWeatherData] = useState(null)
	const [city, setCity] = useState("")

	useEffect(() => {
		if (city.trim() === "") return

		axios
			.get(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`)
			.then(response => {
				setWeatherData(response.data)
			})
			.catch(error => {
				console.error("Error fetching weather data:", error)
			})
	}, [city])

	return (
		<div className="weather-app">
			<h1>Weather App</h1>
			<input
				type="text"
				placeholder="Enter city..."
				value={city}
				onChange={e => setCity(e.target.value)}
				className="input-field"
			/>
			{weatherData && (
				<div>
					<h2>
						Weather in {weatherData.name}, {weatherData.sys.country}
					</h2>
					<p className="temperature">Temperature: {weatherData.main.temp}°C</p>
					<p className="weather-description">
						Weather: {weatherData.weather[0].description}
					</p>
				</div>
			)}

			{!weatherData && (
				<p className="weather-description">
					{" "}
					No data. Kindly enter city in the input{" "}
				</p>
			)}
		</div>
	)
}

export default Weather
