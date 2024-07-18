import React from 'react'

 const Input = ({handleChange, searchQuery, placeholder, ...otherProps}) => {
  return (
   <input
     type='text'
     value={searchQuery}
     onChange={handleChange}
     placeholder={placeholder}
     style={{ color:"black"}}
     className="container  border border-black w-72 h-12 relative w-full rounded-md px-4 my-4 mx-4"
     />
  )
}

export default Input;