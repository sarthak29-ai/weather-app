import SearchLogo from './Search-logo.jsx';
import React, { memo } from 'react';
const SearchInput = ({inputRef}) => {

  return (
    <div className="w-full rounded-lg h-12 flex items-center gap-3 px-6 py-3.5 bg-neutral-800 text-neutral-200 cursor-pointer focus:outline-1 focus:outline-offset-2 focus:outline-neutral-0">
      <SearchLogo></SearchLogo>
      <input ref={inputRef} className="border-none outline-none w-full text-[16px] font-normal" type="search" name="search" id="search" placeholder="Search for place..."/>
      
    </div>
  )
}

export default memo(SearchInput);