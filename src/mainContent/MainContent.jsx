import HourlyContainer from './hourlyForcast/HourlyContainer.jsx';
import Hero from './todayForecast/Hero.jsx';
import DailyContainer from './dailyForecast/DailyContainer.jsx'
import React, { useEffect, useContext, useRef, use } from 'react';
import MainHeader from './mainHeader/Main-Header.jsx';
import { useQuery } from '@tanstack/react-query';
import { UserContext } from '../Store/store.jsx'


const ProhibitedIcon = () => {
  return (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white">
    <circle cx="12" cy="12" r="10" strokeWidth="2"/>
    <path d="M4.93 4.93l14.14 14.14" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)};
const RetryIcon = () => {
  return (
  <svg 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    className="hover:rotate-180 transition-transform duration-500"
  >
    <path 
      d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C14.8273 3 17.3509 4.30055 19 6.31758" 
      stroke="#fff" 
      strokeWidth="2" 
      strokeLinecap="round"
    />
    <path 
      d="M19 2V6H15" 
      stroke="#fff" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
)};



const MainContent = () => {
  
  const {location,quantityToShow,measureUnit, today, setToday, Error} = useContext(UserContext);
  const loc = useRef(location);
  
  const unit = {
    "temperature": measureUnit.temperature === "Celsius (°C)"? "": "&temperature_unit=fahrenheit",
    "windSpeed": measureUnit.windSpeed === "km/h"? "": "&wind_speed_unit=mph",
    "precipitation": measureUnit.precipitation === "Millimeters (mm)"? "": "&precipitation_unit=inch"
  }
  
  const dayShort = {
    "0": "Sun",
    "1": "Mon",
    "2": "Tue",
    "3": "Wed",
    "4": "Thu",
    "5": "Fri",
    "6": "Sat"
  };
  const dayLong = {
    "0": "Sunday",
    "1": "Monday",
    "2": "Tuesday",
    "3": "Wednesday",
    "4": "Thursday",
    "5": "Friday",
    "6": "Saturday"
  };
  
  const getDays = (now) => {
    const c = now.getDay();
    
    const daily = Array.from({length: 7,}, (_,i) =>{
      let d = (c + i) % 7
      const obj = {
        "id": `${d}`,
        "day": dayShort[`${d}`]
      }
      return obj;
    });
    const days = Array.from({length: 7,}, (_,i) =>{
      let a = (c + i) % 7
      let curr = new Date(now)
      curr.setDate(now.getDate() + i);
      const obj = {
        "id": `${a}`,
        "day": dayLong[`${a}`],
        "date": `${String (curr.getFullYear()).padStart(2,"0")}-${String(curr.getMonth()+1).padStart(2,"0")}-${String (curr.getDate()).padStart(2,"0")}`
      }
      return obj;
    });
    return [daily,days];
  };
  
  const getWhether = (whether) => {
    const current = whether.current
    const currentUnit = whether.current_units
    const daily = whether.daily;
    const currentDate = new Date();
    const utcTime = currentDate.getTime() + (currentDate.getTimezoneOffset() * 60000);
    const date = new Date(utcTime + (whether.utc_offset_seconds * 1000));
    const [day, dailyHour] = getDays(date)
    const dayName = date.toLocaleString('default', { weekday: "long" });
    const fullDate = date.toDateString().split(" ").with(0,dayName)
    const curWhether = {
      "whetherCode": current.weather_code,
      "Temperature": `${Math.floor(current.temperature_2m)}°`,
      "Feels Like": `${Math.floor(current.apparent_temperature)}°`,
      "Humidity":`${Math.floor(current.relative_humidity_2m)}%`,
      "Wind": `${Math.floor(current.wind_speed_10m)} ${currentUnit.wind_speed_10m}`,
      "Precipitation": `${Math.floor(current.precipitation)} ${currentUnit.precipitation}`,
      "date": `${fullDate[0]}, ${fullDate[1]} ${fullDate[2]}, ${fullDate[3]}`
    };
    const dailyWhether = day.map((item, i) => {
      return {
        ...item ,
        "whetherCode": daily.weather_code[i],
        "temperatureMax": `${Math.floor(daily.temperature_2m_max[i])}°`,
        "temperatureMin":`${Math.floor(daily.temperature_2m_min[i])}°`
      };
    });
    const hourly = {
      "dateObj": date,
      "today": `${dailyHour[0]["day"]}`,
      "todayDate": `${dailyHour[0]["date"]}`,
      "day": `${dailyHour[0]["day"]}`,
      "date": `${dailyHour[0]["date"]}`,
      "time": `${date.toLocaleTimeString()}`,
      "weekday": dailyHour
    }
    return [curWhether,dailyWhether,hourly];
  }
  
  const getHourly = (data) => {
    const hourly = data.hourly;
    const date = today.dateObj;
    const hourlyTime = hourly.time;
    const temp = hourly.temperature_2m;
    const code = hourly.weather_code;
    const curTimeIndex = today["today"] === today["day"]? (date.getHours()): 0;
    const hourlyTemp = Array.from({length: (24 - curTimeIndex),}, (_,i) =>{
        const idx = curTimeIndex + i;
        const obj = {
          "id": idx,
          "time": `${hourlyTime[idx].split("T")[1].split(":")[0]}`,
          "temperature": `${Math.floor(temp[idx])}`,
          "code": code[idx]
        }
        return obj;
      });
    return hourlyTemp;
  }  
  

  const {data:dailyData,isPending:isDailyDataPending, isError:isDailyDataError,refetch:refetchDaily} = useQuery({
    queryKey: ['city', 'whether',`${Object.values(measureUnit).join(", ")}`,`${Object.values(location).join(", ")}`],
    queryFn: () =>
      fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&daily=temperature_2m_max,temperature_2m_min,weather_code&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&timezone=auto${unit.temperature}${unit.windSpeed}${unit.precipitation}`)
      .then(res => res.json())
      .then(data => {
        if(!data || !data.current || !data.daily){
          throw new Error('No api data');
          return data;
        }
        return getWhether(data);
      }),
    refetchInterval: 1000 * 60 * 15, 
  });
  useEffect(() => {
    const isLocChange = loc.current.lat !== location.lat || loc.current.lon !== location.lon
    if(dailyData){
      if(!today || isLocChange || today["todayDate"] !== dailyData[2]["todayDate"]){
        console.log("in use effect set today change")
        setToday(dailyData[2])
        loc.current = location 
      }
    }
  }, [dailyData, today,location,setToday]);
  
  const {data:hourlyData,isPending:isHourlyDataPending, isError:isHourlyDataError, refetch:refetchHourly} = useQuery({
    queryKey: ['hourly whether','whether',today?.day,today?.date],
    queryFn: () => fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&hourly=temperature_2m,weather_code&timezone=auto&start_date=${today.date}&end_date=${today.date}${unit.temperature}${unit.windSpeed}${unit.precipitation}`)
    .then(res => res.json())
    .then(data =>{
      if(!data || !data.hourly){
          throw new Error('No api data');
          return data;
        }
      return getHourly(data)
    }),
    enabled: !!today,
    refetchInterval: 1000 * 60 * 15,
  });
  useEffect(() => {
    if (!today) return;
    if(today.today !== today.day) return
    const now = today.dateObj;
    const msUntilNextHour = (60 - now.getMinutes()) * 60000 - (now.getSeconds() * 1000);
  
    const timer = setTimeout(() => {
      refetchHourly();
    }, msUntilNextHour);
  
    return () => clearTimeout(timer); 
  }, [hourlyData, today, refetchHourly]);
  
  useEffect(() => {
    if (!dailyData) return;
  
    const now = dailyData[2].dateObj;
    const msUntilMidnight = 
      ((23 - now.getHours()) * 3600000) + 
      ((59 - now.getMinutes()) * 60000) + 
      ((60 - now.getSeconds()) * 1000);
  
    const timer = setTimeout(() => {
      refetchDaily();
    }, msUntilMidnight);
  
    return () => clearTimeout(timer); 
  }, [dailyData, refetchDaily]); 

  
  const whether = dailyData? dailyData[0]: null; 
  const dailyWhether = dailyData? dailyData[1]: null;
  const hourly = hourlyData? hourlyData: null;
  const isPending = isDailyDataPending || isHourlyDataPending
  const isError = isDailyDataError || isHourlyDataError;
  
  if(isError){
    return (
      <div className="w-full flex items-center justify-center mt-10 p-4">
      <div className="flex flex-col items-center gap-3">
        <div className="mb-4">
          {ProhibitedIcon()}
        </div>
        <h6 className="text-4xl font-medium text-center">Something went wrong</h6>
        <p className="text-[14px] text-neutral-300 text-center">We couldn't connect to server(API error). Please try again in a few movements</p>
        <button className="mt-4 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 focus:bg-neutral-700 flex items-center gap-2 rounded" onClick={(e)=>{ refetchDaily(); refetchHourly();}} type="button">
          <div>{RetryIcon()}</div>
          <span>Retry</span>
        </button>
      </div>
      </div>
    )
  }
  
  return (
    
    <main className="w-full flex flex-col md:items-center gap-6 px-5 mb-2 sm:p-0 sm:m-0 sm:p-0 mb-20 sm:mb-28">
      <MainHeader></MainHeader>
      {Error? 
      <p className="text-[18px] text-center mt-6">No search result found!</p>
      :<div className="sm:flex md:flex-row md:items-start md:gap-6 sm:w-full md:w-auto sm:flex-col sm:items-center">
        <div className="sm:w-full md:w-auto md:flex md:flex-col md:gap-8">
          <Hero todaywhether={whether} isPending={isPending} location={location} quantityToShow={quantityToShow} ></Hero>
          <DailyContainer dailyWhether={dailyWhether} isPending={isPending}></DailyContainer>
        </div>
        <HourlyContainer hourlyWhether={hourly} isPending={isPending}></HourlyContainer>
      </div>}
    </main>
    
  )
}

export default MainContent