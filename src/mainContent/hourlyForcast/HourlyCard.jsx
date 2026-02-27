import React from 'react';
import Image from '../Image.jsx'
let hourly = Array.from({length: 24}, (_, i)=>{
  return {"id": i};
});
const HourlyCard = ({hourlyWhether,isPending}) => {
  const whether = hourlyWhether? hourlyWhether: null;
  
  if(isPending){
    return (
      hourly.map((item,i) => {
        return(
          <li key={i} className="w-full list-none bg-neutral-700 rounded-lg border border-neutral-600 p-[1.34rem]"></li>
        )
      })
    )
  }
  
  return (
    whether.map((item,i)=>{
      const amPm = Number(item.time) >= 12? "PM":"AM";
      const t = Number(item.time);
      const time = (t === 0 || t === 12)? 12: t % 12;
      return(
          <li key={i} className=" w-full flex items-center justify-between bg-neutral-700 border border-neutral-600 px-2.5 rounded-lg py-[0.6rem]">
            <div className="h-full flex items-end gap-1">
              <Image className="h-7 w-7" code={Number(item.code)}></Image>
              <p className="text-[17px]">{`${time} ${amPm}`}</p>
            </div>
            <h5 className="text-[16px] text-neutral-200">{`${item.temperature}°`}</h5>
          </li>
        )
    })
  )
}
export default HourlyCard;