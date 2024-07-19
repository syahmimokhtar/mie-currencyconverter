import React from 'react'

const Footer = () => {
  return (
    <footer className="text-center text-2xl">
         <div className="flex flex-col relative container mx-auto md:my-4">
                 <p className="font-bold md:text-nowrap"><a target="_blank" href="https://www.exchangerate-api.com/">Powered by ExchangeRate API</a></p>
                 <img className='container mx-auto rounded-md relative w-24 h-24' src='./xchangerate.png' /> 
         </div>


    </footer>
  )
}

export default Footer;