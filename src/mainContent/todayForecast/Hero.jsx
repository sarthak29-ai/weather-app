import TodayWhether from './TodayWhether.jsx';
import MainWhether from './MainWhether.jsx';
import React, { memo } from 'react';


const Hero = ({todaywhether,isPending,location,quantityToShow}) => {
  
  const temperature = todaywhether? todaywhether.Temperature: null;
  const whether = todaywhether? todaywhether: null;
  const date = todaywhether? todaywhether.date: null;
  const whetherCode = todaywhether? todaywhether.whetherCode: null
  
  return (
    <section className="w-full mb-6 sm:m-0" aria-labelledby="today-header">
      <h4 id="today-header" className="sr-only">Today's whether</h4>
      <MainWhether code={whetherCode} date={date} temperature={temperature} isPending={isPending} location={location}></MainWhether>
      <div className="w-full flex flex-wrap gap-4 mt-3 mb-2 md:mt-6">
        <TodayWhether todaywhether={whether} quantityToShow={quantityToShow} isPending={isPending}></TodayWhether>
      </div>
    </section>
  )
}
export default memo(Hero);
