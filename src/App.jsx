import React, { useState } from 'react';
import Header from './HeaderComp/Header.jsx';
import { UserContext } from './Store/store.jsx'
import MainContent from './mainContent/MainContent.jsx'
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  const selectedCity = localStorage.getItem("location")
  const measuredUnit = localStorage.getItem('unit')
  
  const measureToUnit = [{
    "quantity": "Temperature",
    "unit": ["Celsius (°C)",
      "Fahrenheit (°F)"]
  },
    {
      "quantity": "Wind Speed",
      "unit": ["km/h",
        "mph"]
    },
    {
      "quantity": "Precipitation",
      "unit": ["Millimeters (mm)",
        "Inches (in)"]
    }]
  const [measureUnit,setMeasureUnit] = useState(measuredUnit ? JSON.parse(measuredUnit): {
      "temperature": "Celsius (°C)",
      "windSpeed": "km/h",
      "precipitation": "Millimeters (mm)"

    })
  
  const [location , setLocation ] = useState(selectedCity ? JSON.parse(selectedCity): {
    "city": "Mumbai",
    "discription": "Mumbai Suburban, Maharashtra", 
    "country": "India",
    "lon": 72.8692035,
    "lat": 19.054999
  });
  const quantityToShow= ["Feels Like","Humidity","Wind","Precipitation"];
  const [today, setToday] = useState(null);
  const [Error, setError] = useState(false);
  
  return (
    <>
      <UserContext.Provider value={{ measureToUnit, measureUnit, setMeasureUnit, location, setLocation , quantityToShow,today, setToday,Error, setError}}>
        <QueryClientProvider client={queryClient}>
          <Header></Header>
          <MainContent></MainContent>
        </QueryClientProvider>
      </UserContext.Provider>
    </>
  );
}

export default App