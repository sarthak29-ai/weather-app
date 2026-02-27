import React, { useRef } from 'react'
import { useToggle } from '../Store/toggleHook.jsx';
import Measure from './Measure.jsx'


const Unit = () => {

  const secRef = useRef(null)
  const sumRef = useRef(null);
  const [isOpen, setIsOpen] = useToggle(secRef,sumRef)
  const setOpen = (e) =>{
    e.preventDefault()
    setIsOpen(!isOpen)
  };
  
  return (
    <div className="relative h-[34px] sm:h-[40px] w-max-36">
      <details open={isOpen} className="absolute top-0 right-0 w-[calc(100vw-8rem)] text-[15px] sm:w-56 z-10">
        <summary ref={sumRef} className="list-none float-right w-24 sm:w-auto h-[32px] sm:h-[40px] bg-neutral-800 rounded-lg p-2.5 sm:pr-4 sm:pl-4 flex gap-1.5 sm:gap-3 items-center hover:bg-neutral-700 focus:bg-neutral-700 focus:outline outline-offset-2 sm:outline-offset-3 font-[500] cursor-pointer" onClick={setOpen}>
          <img src="../../assets/images/icon-units.svg" height="16" width="16" alt="setting icon"/>
          <span>Units</span>
          <img src="../../assets/images/icon-dropdown.svg" height="8" width="13" alt=""/>
          </summary>
          <section ref={secRef} className="mt-10 sm:mt-12 rounded-2xl  bg-neutral-800 border-[1px] border-neutral-600 px-1.5 py-1">
            <h4 className="p-2 py-2.5 focus:border rounded-lg hover:bg-neutral-700 focus:outline-1 font-[500] cursor-pointer">Switch to Imperial</h4>
            <Measure></Measure>
          </section>
      </details>
    </div>
  )
}

export default Unit