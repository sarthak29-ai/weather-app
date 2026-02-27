import React, { memo } from 'react';
import DailyCard from './DailyCard.jsx'


const DailyContainer = ({dailyWhether, isPending}) => {
  const whether = dailyWhether? dailyWhether: null;
  return (
    <section className="w-full flex flex-col gap-4" aria-labelledby="daily-header">
      <h4 id="daily-header" className="">Daily forecast</h4>
      <ul className="res-grid ">
        <DailyCard dailyWhether={whether} isPending={isPending}></DailyCard>
      </ul>
    </section>    
  )
}
export default memo(DailyContainer);