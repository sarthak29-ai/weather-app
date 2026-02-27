import React, { useContext, useRef, memo } from 'react';
import HourlyOpt from './HourlyOpt.jsx';
import { useToggle } from '../../Store/toggleHook.jsx'
import { UserContext } from '../../Store/store.jsx'
 

const HourlySelect = ({isPending}) => {
  const {setToday,today} = useContext(UserContext);
  
  const uListRef = useRef(null)
  const sumRef = useRef(null);
  const [isOpen, setIsOpen] = useToggle(uListRef,sumRef)
  
  const setOpen = (e) =>{
    e.preventDefault()
    setIsOpen(!isOpen)
  };
  const setDate = (e,day,date) => {
    setToday((prev)=>({
        ...prev,
        "day": `${day}`,
        "date": `${date}`
    }))
  };
  const weekday = today? today: null 
  return (
    <div className="relative h-8 w-32 flex justify-end">
      <details role="combobox" aria-haspopup="listbox" aria-expanded={isOpen} open={isOpen} className="absolute top-0 right-0 flex flex-col items-end gap-4">
        <summary aria-controls="hourly-title" ref={sumRef} className="list-none flex gap-2 items-center py-1 px-3 bg-neutral-600 rounded cursor-pointer" onClick={setOpen}>
            {isPending? <span>—</span>:<span>{today.day}</span>}
            <img height="8" width="13" className="" src="/weather-app/images/icon-dropdown.svg" alt="" />
        </summary>
        <ul role="listbox" id="hourly-title" ref={uListRef} className={`px-1.5 py-1.5 bg-neutral-800 rounded-lg w-40 border border-neutral-600 flex flex-col gap-0.5 ${isPending && "hidden"}`}>
        {isPending || <HourlyOpt today={weekday} setToday={setDate}/>}
        </ul>
      </details>
    </div>  
  )
}
export default memo(HourlySelect);