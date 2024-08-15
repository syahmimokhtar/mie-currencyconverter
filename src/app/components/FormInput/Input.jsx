"use client";
import React from 'react'

 const Input = ({handleChange, searchQuery, placeholder, isValid ,...otherProps}) => {
  return (
   <input
     type='text'
     value={searchQuery}
     onChange={handleChange}
     placeholder={placeholder}
     style={{
      color: "black",
      borderColor: isValid ? 'initial' : 'red',
      borderWidth: '2px',
    }}

     className={`container  border-2 border-black md:w-full w-80 h-12 relative  rounded-md px-4 my-4 mx-4`} 
     />
  )
}

export default Input;