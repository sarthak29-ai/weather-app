import React, { memo } from 'react';
const SearchResult = ({cities,ref, selectCity}) => {
  
  
  return (
    <ul ref={ref} className="w-full max-h-44 overflow-y-auto bg-[hsl(243,27%,20%)] rounded-lg absolute top-14 left-0 flex flex-col items-start gap-1.5 px-2 py-1.5"
    >
      {cities.map((oldCity,index) => { 
        const {city, discription, country} = oldCity
        return(
          <li key={index} className="w-full list-none rounded-lg ">
          <button className=" w-full h-full flex justify-start items-start text-start rounded-lg px-2 py-1.5 hover:bg-[hsl(243,23%,24%)] focus:bg-[hsl(243,23%,24%)] before: content-[attr(before)] before:text-2xl before:font-medium text-neutral-300" type="button" onClick={(e)=>{selectCity(oldCity)}}>
          <p>
            <span className="font-medium text-[19px] text-neutral-200"
            >{city}</span>
            <span>{`, ${discription} (${country})`}</span>
          </p>
          </button>
          </li>
        )
      })}
    </ul>
  )
}
export default memo(SearchResult);
