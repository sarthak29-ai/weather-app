import React from 'react';
import Image from '../Image.jsx'

const daily = Array.from({length: 7}, (_, i)=>{
  return {"id": i};
});
const DailyCard = ({dailyWhether,isPending}) => {
  return (
    daily.map((item,i) => { 
      return(
        <li key={item.id} className="list-none bg-neutral-800 border border-neutral-700 rounded-lg">
          {isPending? "": 
          <article className="w-full h-full py-2 px-3 flex flex-col items-center md:gap-3 md:px-1.5">
            <div>    
              <p className="text-center">{dailyWhether[i].day}</p>
              <Image className="w-16 h-[4.5rem] md:w-[2.5rem] md:h-12 md:mt-3" code={dailyWhether[i].whetherCode}></Image>
            </div>
            <div className="w-full flex items-center justify-between text-[14px]">
              <h4 className="text-neutral-0">{dailyWhether[i].temperatureMax}</h4>
              <h4 className="text-neutral-300">{dailyWhether[i].temperatureMin}</h4>
            </div>
          </article>}
        </li>
      )
    })
  )
}

export default DailyCard;