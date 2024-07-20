"use client";
import Input from './components/FormInput/Input';
import Dropdown from './components/FormInput/Dropdown';
import api from '../app/api/base_api'
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Footer from './components/Footer'
export default function Home() {

  const [options, selectionOptions] = useState([]); //dropdown values
  const [inputValue, setInputValue] = useState(1000); //amount to be converted 
  const [convertedAmount, setConvertedAmount] = useState(0); //converted amount
  const [selectedCurrency, setSelectedCurrency] = useState({ value: 'MYR', label: 'Malaysian Ringgit' }); // State to track selected currency
  const [selectedConvertedCurrency, setselectedConvertedCurrency] = useState({ value: 'JPY', label: 'Japanese Yen' }); // State to track selected currency
  const [dropdownOpen, setdropdownOpen] = useState(true); //state to dropdown appear
  const [editingField, setEditingField] = useState('amount'); // Track which field is being edited
  const [rate, setRate] = useState(''); // print rate of each conversion based on currency

  //populate dropdown data
  const handleSelection = async () => {
    try {
      const headers = { 'Content-Type': 'application/json' };
      const response = await api.get('/codes', { headers: headers });
      const supportedCodes = response.data.supported_codes.map(code => ({ value: code[0], label: code[1] }));
      selectionOptions(supportedCodes);

      if (supportedCodes.length > 0) {
        const defaultSelectedCurrency = supportedCodes.find(element => element.value === "MYR")
        const defaultedConvertedCurrency = supportedCodes.find(element => element.value === "JPY")
        setSelectedCurrency(defaultSelectedCurrency)
        setselectedConvertedCurrency(defaultedConvertedCurrency)
        handleConversionRate(1000, defaultSelectedCurrency, defaultedConvertedCurrency, 'amount');

      }



    } catch (error) {
      console.error('Error fetching data', error);
    }
  }

  //handle conversion rate
  const handleConversionRate = async (amount, fromCurrency, toCurrency, field) => {
    if (fromCurrency && toCurrency && amount) {
      try {
        const headers = { 'Content-Type': 'application/json' };
        let response, data, conversionRate;

        if (field === 'amount') {
           response = await api.get(`/pair/${fromCurrency.value}/${toCurrency.value}/${amount}`, { headers: headers });
           data = response.data
          setConvertedAmount(data.conversion_result.toFixed(2));
          conversionRate= `1.000 ${fromCurrency.value} = ${data.conversion_rate.toFixed(2)}  ${toCurrency.value} (Last Updated:  ${data.time_last_update_utc})`

        }
        else if (field === "convertedAmount") {
          response = await api.get(`/pair/${toCurrency.value}/${fromCurrency.value}/${amount}`, { headers: headers });
          data = response.data
          setInputValue(data.conversion_result.toFixed(2));
          conversionRate= `1.000 ${fromCurrency.value} = ${data.conversion_rate.toFixed(2)}  ${toCurrency.value} (Last Updated:  ${data.time_last_update_utc})`

        }
        setRate(conversionRate);


      } catch (error) {
        console.error('Error fetching conversion rate', error);
        setRate('');

      }
    }
    else{
      setRate('');

    }
  };


  const handleInputAmount = (e) => {
    setRate('')
    const value = e.target.value;
    setInputValue(value);
    setEditingField('amount')
    handleConversionRate(1000, selectedCurrency, selectedConvertedCurrency, 'amount');

  }


  const handleInputConverted = (e) => {
    setRate('')
    const value = e.target.value;
    setConvertedAmount(value);
    setEditingField('convertedAmount')
    handleConversionRate(1000, selectedCurrency, selectedConvertedCurrency, 'convertedAmount');
  }


  // Handle from currency dropdown change
  const handleFromCurrencyChange = (selectedOption) => {
    setSelectedCurrency(selectedOption);
    setRate('')
    if (editingField === 'amount') {
      handleConversionRate(inputValue, selectedOption, selectedConvertedCurrency, 'amount');
    }
    else {
      handleConversionRate(convertedAmount, selectedOption, selectedConvertedCurrency, 'convertedAmount');
    }

  };

  // Handle to currency dropdown change
  const handleToCurrencyChange = (selectedOption) => {
    setselectedConvertedCurrency(selectedOption);
    setRate('')
    if (editingField === 'amount') {
      handleConversionRate(inputValue, selectedCurrency, selectedOption, 'amount');
    }
    else {
      handleConversionRate(convertedAmount, selectedCurrency, selectedOption,  'convertedAmount');
    }

  };


  useEffect(() => {
    handleSelection();
  }, [])


  return (

    <>
      <Head>
        <title>Money Currency Converter</title>
      </Head>

      <main className="flex flex-col min-h-screen  items-center justify-between p-24 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ">
            <h2 className="relative text-2xl text-center font-bold text-nowrap	">Currency Exchange</h2>
     

        <div className="relative md:px-12 md:py-12 md:grid md:grid-cols-2  w-auto  md:w-auto   bg-white rounded-xl mb-12">



          <div className='relative  flex flex-col px-4 py-4'>
            <label className="ml-4  mx-auto text-2xl text-black font-bold">Amount</label>
            <Input searchQuery={inputValue} handleChange={handleInputAmount} type="number"
              pattern="[0-9]*" />

            {dropdownOpen && (
              <Dropdown
                options={options}
                value={selectedCurrency}
                onChange={handleFromCurrencyChange} // Corrected onChange handler

              />
            )}

          </div>


          <div className='relative flex flex-col px-4 py-4'>
            <label className="ml-4  mx-auto text-2xl text-black font-bold">Converted to</label>

            <Input searchQuery={convertedAmount} handleChange={handleInputConverted} type="number"
              pattern="[0-9]*" />

            {dropdownOpen && (
              <Dropdown
                options={options}
                value={selectedConvertedCurrency}
                onChange={handleToCurrencyChange} // Corrected onChange handler

              />
            )}


          </div>

            
            <h3 className="px-4 py-4 text-center md:ml-6 text-black text-xl font-bold  md:text-nowrap text-balance">{rate}</h3>
        </div>
        <Footer />

      </main>


    </>

  );
}
