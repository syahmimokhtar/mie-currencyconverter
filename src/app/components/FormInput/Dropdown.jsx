"use client";
import React from 'react'
// import Select from 'react-select'
import dynamic from 'next/dynamic';

// Dynamically import react-select with SSR disabled
const Select = dynamic(() => import('react-select'), { ssr: false });

const Dropdown = ({options, ...otherProps}) => {
  return (
           <Select options={options} {...otherProps} className="container md:mx-2 relative  border border-black font-center md:text-2xl text-black md:w-96  rounded-md border border-white  px-4 py-2 " />
            
  )
}

export default Dropdown