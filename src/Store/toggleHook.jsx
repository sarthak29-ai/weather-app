import React, { useState, useEffect } from 'react';
export function useToggle(ref, trigBtn = null, inValue = false, doValue = false) {
const [ isOpen, setIsOpen ] = useState(inValue)
useEffect(() => {
// Performance: Don't even add listeners if the menu is closed
if (!isOpen) return;

const handleEvents = (event) => {
// 1. ESC Key Logic
if (event.key === "Escape") {
setIsOpen(doValue);
}
// 2. Click Outside Logic (using your section ref fix)
if (trigBtn){
if ((ref.current && !ref.current.contains(event.target)) && (trigBtn.current && !trigBtn.current.contains(event.target))) {
setIsOpen(doValue);
}
} else {
if (ref.current && !ref.current.contains(event.target)) {
setIsOpen(doValue);
}
}
};

document.addEventListener("mousedown", handleEvents);
document.addEventListener("keydown", handleEvents);

// Cleanup: Removes BOTH listeners as soon as menu closes or user leaves page
return () => {
document.removeEventListener("mousedown", handleEvents);
document.removeEventListener("keydown", handleEvents);
};
}, [isOpen, ref, doValue]);
return [ isOpen, setIsOpen ]
}