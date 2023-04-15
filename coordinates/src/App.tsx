import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.sass'


type CoordinationInfo = {
  city?: string
  latitude?: number
  longitude?: number
  error?: string
}

function getCoordinates(
  successCallback: (lat: number, lon: number) => any, 
  errorCallback: (text: string) => any
  ) : void {
  console.log(1);
  
  navigator.geolocation.getCurrentPosition((location) => {
    const lat = location.coords.latitude
    const lon = location.coords.longitude
    successCallback(lat, lon)
  }, (err) => {
    let errText: string
    switch (err.code) {
      case err.PERMISSION_DENIED:
        errText = "Разрешите определение геопозиции"
      case err.POSITION_UNAVAILABLE:
        errText = "Геопозиция недоступна"  
      default: 
        errText = "Что-то пошло не так"
    }
    errorCallback(errText)
  })
}


function App() {
  const [coords, setCoords] = useState<CoordinationInfo | undefined>(undefined)

  getCoordinates((lat: number, lon: number) => {
    var url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address";
    var token = "bcc240e3483b19352eb99d336602717a6e25ef78";
    var query = { lat: lat, lon: lon };

    var options: RequestInit = {
        method: "POST",
        mode: 'cors',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Token " + token
        },
        body: JSON.stringify(query)
    }

    fetch(url, options)
    .then(response => response.json())
    .then(result => {
      console.log(result);
      
      setCoords({city: result.suggestions[0].data.city, latitude: lat, longitude: lon, error: undefined})
    })
    .catch(error => setCoords({error: "Что-то пошло не так"}));
  }, (text: string) => {
    setCoords({error: text})
  })

  return (
    <div className="App">
      {coords ? coords.error ? coords.error: 2: "Пытаюсь вычислить тебя"}
      {/* <p>О, вы из: г. {coords?.city}</p>
      <p>Широта: {coords?.latitude}</p>
      <p>Долгота: {coords?.longitude}</p> */}
    </div>
  )
}

export default App
