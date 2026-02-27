import Search from './Search.jsx';
import React, { memo } from 'react';

const MainHeader = () => {

  return (
    
    <div className="my-6 mt-8 flex flex-col items-center">
      <h1 className="text-[3rem] px-8 sm:px-0 text-center align-bottom font-bold leading-tight italic">How's the sky looking today?</h1>
      <Search></Search>
    </div>
  )
}

export default memo(MainHeader)