import React from 'react';
const Searching = () => {
  return (
    <div className="w-full h-12 bg-neutral-800 rounded-lg absolute top-14 left-0 flex items-center gap-3 px-4" >
      <img className="animate-spin" src="/weather-app/images/icon-loading.svg" alt="loading icon" />
      <p>Search in progress</p>
    </div>   
    
  )
}
export default Searching;
