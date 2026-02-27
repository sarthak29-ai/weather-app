import React from 'react';
import Image from '../Image.jsx'

const MainWhether = ({isPending, temperature,location,date,code}) => {
  
  if (isPending){
    return (
      <article className="w-full h-auto flex flex-col gap-2 justify-center items-center bg-neutral-800 aspect-[1.2] sm:aspect-[2.79] rounded-2xl sm:rounded-3xl overflow-hidden mb-4">
        <div className="flex gap-2 px-2 text-2xl">
          <span className="animate-bounce ani">•</span>
          <span className="animate-bounce">•</span>
          <span className="animate-bounce delay-500">•</span>
        </div>
        <p>Loading...</p>
      </article>
    )
  }else{
    return(
      <article className="w-full h-auto flex flex-col items-center justify-center gap-4 bg-[url('../../assets/images/bg-today-small.svg')] sm:bg-[url('../../assets/images/bg-today-large.svg')] bg-contain aspect-[1.2] sm:aspect-[2.79] bg-no-repeat mb-4 rounded-2xl sm:rounded-3xl overflow-hidden sm:p-4 sm:flex-row sm:justify-between sm:items-center">
        <div className="m-0 mt-2 sm:m-0  sm:max-w-[300px] flex flex-col items-center gap-3.5 px-3">
          <h2 className="font-extrabold text-2xl text-center">{`${location.city}, ${location.country}`}</h2>
          <h3 className="text-neutral-200 text-center">{date}</h3>
        </div>
        <div className="flex items-center gap-4 p-0">
          <Image className="h-24 w-24 object-contain" code={code}></Image>
          <h2 className="text-7xl md:text-8xl italic font-medium p-0">{temperature}</h2>
        </div>
      </article>
    )
  }
}
export default MainWhether;