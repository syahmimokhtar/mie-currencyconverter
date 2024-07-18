"use client";
import React from 'react'
// import Select from 'react-select'
import dynamic from 'next/dynamic';

// Dynamically import react-select with SSR disabled
const Select = dynamic(() => import('react-select'), { ssr: false });

const Dropdown = ({options, ...otherProps}) => {
  return (
           <Select options={options} {...otherProps} className="container md:mx-4 relative  border border-black font-center text-xl text-black w-80  rounded-md border border-white  px-4 py-2 " />
            
  )
}

export default Dropdown