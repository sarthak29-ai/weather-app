import React from 'react';
const HourlyOpt = ({today,setToday}) => {
  
  return (
    today.weekday.map((item,i) => {
      const day = item.day
      return (
        <li key={day} className="list-none">
          <label className="w-full flex items-center justify-start has-[:checked]:bg-neutral-700 py-1.5 px-2 rounded-lg cursor-pointer">
          <input role="option" aria-selected={item.day === today.day} defaultChecked={item.day === today.day} className="sr-only" type="radio" name="day" value={item.date} onChange={(e) => setToday(e,item.day,item.date)}/>{day}
          </label>
        </li>
      )
    })
  )
}
export default HourlyOpt;