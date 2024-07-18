"use client";
import Input from './components/FormInput/Input';
import Dropdown from './components/FormInput/Dropdown';
import api from '../app/api/base_api'
import React, { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Home() {

  const [options, selectionOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [dropdownOpen, setdropdownOpen] = useState(true);

  const handleSelection = async () => {
    try {
      const headers = { 'Content-Type': 'application/json' };
      const response = await api.get('/codes', { headers: headers });
      const supportedCodes = response.data.supported_codes.map(code => ({ value: code[0], name: code[1] }));
      console.log(supportedCodes)
      selectionOptions(supportedCodes);

    } catch (error) {
      console.error('Error fetching data', error);
    }
  }


  const handleInputChange = (e) => {
    setInputValue(e.target.value)
    setdropdownOpen(true)
  }

  const handleDropdownChange = (e) => {
    setInputValue(e.target.value)
    setdropdownOpen(false)
  }

  useEffect(() => {
    handleSelection();
  }, [])


  return (

    <>
      <Head>
        <title>Money Currency Converter</title>
      </Head>

      <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ">

        <div className="relative container m-12 flex flex-row  w-auto h-auto  bg-white rounded-xl">

          <div className='relative mx-12 my-12  flex flex-col'>
            <label className="ml-4  mx-auto text-2xl text-black font-bold">Amount</label>

            <Input searchQuery={inputValue} handleChange={handleInputChange} placeholder="amount..." />

            {dropdownOpen && (

              <Dropdown onChange={handleDropdownChange}>
                {options.map((option, index) =>
                (
                  <option key={index} value={option.value} >
                    {option.name}
                  </option>
                ))}
              </Dropdown>
            )}
          </div>


          <div className='relative mx-12 my-12  flex flex-col'>
            <span className="text-dark">asas</span>
          </div>


          <div className='relative  mx-12 my-12  flex flex-col'>
            <label className="ml-4  mx-auto text-2xl text-black font-bold">Converted to</label>
            
            <Input searchQuery={inputValue} handleChange={handleInputChange} placeholder="amount..." />

{dropdownOpen && (

  <Dropdown onChange={handleDropdownChange}>
    {options.map((option, index) =>
    (
      <option key={index} value={option.value} >
        {option.name}
      </option>
    ))}
  </Dropdown>
)}
          </div>

        </div>
      </main>

    </>

  );
}
