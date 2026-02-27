import HourlySelect from './HourlySelect.jsx';
import HourlyCard from './HourlyCard.jsx';
import React, { memo } from 'react';


const HourlyContainer = ({hourlyWhether,isPending}) => {
  const hourly = hourlyWhether? hourlyWhether: null
  return (
    <section className="w-full md:w-88 sm:w-80 p-4 pb-3 flex flex-col gap-4 bg-neutral-800 rounded-2xl mt-7 md:m-0" aria-labelledby="hourly-header">
      <div className="w-full flex items-center justify-between">
        <h3 id="hourly-header" className="">Hourly forecast</h3>
        <HourlySelect isPending={isPending}/>
      </div>
      <div className="w-full flex flex-col gap-4 h-128 overflow-scroll">
        <HourlyCard hourlyWhether={hourly} isPending={isPending}></HourlyCard>
      </div>
    </section>   
  )
}
export default memo(HourlyContainer);