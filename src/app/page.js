"use client";
import Input from './components/FormInput/Input';
import Dropdown from './components/FormInput/Dropdown';
import api from '../app/api/base_api'
import React, { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Home() {

  const [options, selectionOptions] = useState([]); //dropdown values
  const [inputValue, setInputValue] = useState(1000); //amount to be converted 
  const [convertedAmount, setConvertedAmount] = useState(); //converted amount
  const [selectedCurrency, setSelectedCurrency] = useState({ value: 'MYR', label: 'Malaysian Ringgit' }); // State to track selected currency
  const [selectedConvertedCurrency, setselectedConvertedCurrency] = useState({ value: 'JPY', label: 'Japanese Yen' }); // State to track selected currency
  const [dropdownOpen, setdropdownOpen] = useState(true); //state to dropdown appear


  //populate dropdown data
  const handleSelection = async () => {
    try {
      const headers = { 'Content-Type': 'application/json' };
      const response = await api.get('/codes', { headers: headers });
      const supportedCodes = response.data.supported_codes.map(code => ({ value: code[0], label: code[1] }));
      selectionOptions(supportedCodes);

      if(supportedCodes.length>0)
      {
        const defaultSelectedCurrency=supportedCodes.find(element=>element.value==="MYR")
        const defaultedConvertedCurrency=supportedCodes.find(element=>element.value==="JPY")
        setSelectedCurrency(defaultSelectedCurrency)
        setselectedConvertedCurrency(defaultedConvertedCurrency)
        handleConversionRate(1000, defaultSelectedCurrency, defaultedConvertedCurrency);

      }



    } catch (error) {
      console.error('Error fetching data', error);
    }
  }

  //
  const handleConversionRate = async (amount, fromCurrency, toCurrency) => {
    if (fromCurrency && toCurrency && amount) {
      try {
        const headers = { 'Content-Type': 'application/json' };
        const response = await api.get(`/pair/${fromCurrency.value}/${toCurrency.value}/${amount}`, { headers: headers });
        const data=response.data
        console.log(data)
       setConvertedAmount(data.conversion_result.toFixed(2));
      } catch (error) {
        console.error('Error fetching conversion rate', error);
      }
    }
  };


  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    handleConversionRate(1000, selectedCurrency, selectedConvertedCurrency);
  
  }

   // Handle from currency dropdown change
   const handleFromCurrencyChange = (selectedOption) => {
    setSelectedCurrency(selectedOption);
    handleConversionRate(inputValue, selectedOption, selectedConvertedCurrency);
  };

  // Handle to currency dropdown change
  const handleToCurrencyChange = (selectedOption) => {
    setselectedConvertedCurrency(selectedOption);
    handleConversionRate(inputValue, selectedCurrency, selectedOption);
  };


  useEffect(() => {
    handleSelection();
    handleConversionRate(inputValue, selectedCurrency, selectedConvertedCurrency);
  }, [])


  return (

    <>
      <Head>
        <title>Money Currency Converter</title>
      </Head>

      <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ">

        <div className="relative container m-12 flex flex-row  w-auto h-auto  bg-white rounded-xl">
          <div className='relative mx-12 my-12  flex flex-row'>
            <div className='relative  mx-12 my-12  flex flex-col'>
              <label className="ml-4  mx-auto text-2xl text-black font-bold">Amount</label>
              <Input searchQuery={inputValue} handleChange={handleInputChange} />

              {dropdownOpen && (
                <Dropdown
                  options={options}
                  value={selectedCurrency}
                  onChange={handleFromCurrencyChange} // Corrected onChange handler

                />
              )}


            </div>

            <div className='relative mx-12 my-12  flex flex-col'>
                  <img className="cursor-pointer container mx-auto relative w-40 " src={`./exchange.svg`} alt="exchange rate" />
            </div>


            <div className='relative  mx-12 my-12  flex flex-col'>
              <label className="ml-4  mx-auto text-2xl text-black font-bold">Converted to</label>

              <Input searchQuery={convertedAmount} handleChange={()=>{}}/>

              {dropdownOpen && (
                <Dropdown
                  options={options}
                  value={selectedConvertedCurrency}
                  onChange={handleToCurrencyChange} // Corrected onChange handler

                />
              )}


            </div>
          </div>

        </div>
      </main>

    </>

  );
}
