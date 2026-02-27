import React from 'react';
const TodayWhether = ({quantityToShow, isPending, todaywhether}) => {
  
  return (
    quantityToShow.map(item => {
      
      return(      
      <article key={item} className="bg-neutral-800 min-w-[130px] sm:min-w-[130px] md:min-w-[150px] border border-neutral-700 px-5 py-5 rounded-lg flex flex-col gap-4 flex-1 grow">
        <h4 className="text-neutral-300 text-[16px]">{item}</h4>
        {isPending? <p>—</p>: <h3 className="text-2xl">{todaywhether[item]}</h3>}
      </article>
      )
    })
  )
}
export default TodayWhether;