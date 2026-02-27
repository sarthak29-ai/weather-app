import React, { memo } from 'react';
const SearchBtn = () => {
  return (
    
    <button className="h-12 w-full sm:w-[30%] bg-blue-500 rounded-lg text-neutral-200 text-[20px] cursor-pointer hover:bg-blue-700 focus:outline-1 focus:outline-blue-500 focus:outline-offset-2">Search</button>
    
  )
}
export default memo(SearchBtn);
