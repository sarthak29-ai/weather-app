import React, { memo } from 'react'
import Logo from './Logo.jsx'
import Unit from './Unit.jsx'

const Header = () => {
  return (
    <header className="flex justify-between items-center w-full sm:h-[96px] p-4 sm:mt-8">
      <Logo></Logo>
      <Unit></Unit>
    </header>
  )
}

export default memo(Header)