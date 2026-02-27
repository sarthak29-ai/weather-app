import React, { useEffect, useContext, memo } from 'react'

import { UserContext } from '../Store/store.jsx';

const Measure = () => {
  const { measureToUnit, measureUnit, setMeasureUnit } = useContext(UserContext)
  
  
  const changeUnit = (e) =>{
    setMeasureUnit((quantity) => ({
      ...quantity,
      [e.target.name]: e.target.value
    }))
  }
  useEffect(() => {
    localStorage.setItem("unit", JSON.stringify(measureUnit))
  }, [measureUnit]);
  
  
  
  return (
    
     measureToUnit.map((Unit, index) =>{
        const quantity = Unit.quantity
        const unit = Unit.unit
        const aragQuantity = quantity.charAt(0).toLowerCase() + quantity.slice(1).replace(' ','')
        
        
        return(
        <fieldset key={quantity} className=" not-last:border-b border-neutral-700 mt-2">
          <legend className="ml-2 text-neutral-300">{quantity}</legend>
          <label className="flex justify-between items-center has-[:checked]:bg-neutral-700 font-[500] rounded-lg my-2 p-2 cursor-pointer">
            <input className="hidden peer" type="radio" name={aragQuantity} value={unit[0]} defaultChecked={unit[0] === measureUnit[aragQuantity]} onChange={changeUnit} />
            <span>{unit[0]}</span>
            <img className="peer-checked:block hidden" src="/weather-app/images/icon-checkmark.svg" height ="11" width="14" alt="checked icon"/>
          </label>
          <label className="flex justify-between items-center has-[:checked]:bg-neutral-700 font-[500] rounded-lg my-2 p-2 cursor-pointer">
            <input type="radio" className="hidden peer" name={aragQuantity} value={unit[1]} defaultChecked={unit[1] === measureUnit[aragQuantity]} onChange={changeUnit} />
            <span>{unit[1]}</span>
            <img className="peer-checked:block hidden" src="/weather-app/images/icon-checkmark.svg" height ="11" width="14" alt="checked icon"/>
          </label>
        </fieldset>
        )
      })
  )
}

export default memo(Measure)