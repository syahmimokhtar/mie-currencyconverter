import React from 'react'

const Dropdown = ({children, ...otherProps}) => {
  return (
           <select {...otherProps} className="container md:mx-4 relative  border border-black font-center text-2xl text-black w-72  rounded-md border border-white  px-4 py-2 ">
                {children}
            </select>
  )
}

export default Dropdown