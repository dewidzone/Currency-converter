import React, {useEffect, useState} from 'react';
import axios from 'axios';
 
export default function MainPage() {
  const [date,setDate] = useState(null);
  const [sourceCurrency, setSourceCurrency] = useState("");
  const [targetCurrency, setTargetCurrency] = useState("");
  const [amountInSourceCurrency, setAmountInSourceCurrency] = useState(0);
  const [amountInTargetCurrency, setAmountInTargetCurrency] = useState(0);


  const [currencyNames, setCurrencyNames] = useState([]);
  //handle submit method
const handleSubmit = async (e) => {
  e.preventDefault();
  try{
  
    const response = await axios.get("http://localhost:5000/convert", {
      params: {
        date,
        sourceCurrency,
        targetCurrency,
        amountInSourceCurrency,

      },
      
      });

      setAmountInTargetCurrency(response.data.targetAmount);

      
      console.log(amountInSourceCurrency, amountInTargetCurrency );


//TODO:set the rest..

  }catch (err) {
console.error(err);
  }
};


//get all currency names
useEffect(() =>{
  const getCurrencyNames = async() => {
    try{

      const response = await axios.get("http://localhost:5000/getAllCurrencies");
      setCurrencyNames(response.data);
    }catch(err){
      console.error(err);
    }

  };
  getCurrencyNames();
}, [])
  return (
    <div>
      <h1 className="lg:mx-32 text-5xl text-green-600 font-bold ">Convert your currencies today</h1>
      <p className="lg:mx-32 text-2xl opacity-40 py-5">Need to exchange currencies quickly and at competitive rates?
        Look no further! Whether you're traveling, trading, or sending money abroad, we've got you covered. Enjoy fast and hassle-free currency conversion with up-to-date rates that you can trust.
        Don't wait—convert your currencies today and stay ahead of the market!
      </p>

      <div className="mt-5 flex justify-center">
        <section className="w-full lg:w-1/2">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
            <label htmlfor={date} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>

            <input 
            onChange={(e)=>setDate(e.target.value)}
            type="Date" id={date} name={date} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" required />
          </div>

          <div className="mb-4">
            <label htmlfor={sourceCurrency} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Source currency</label>

            <select 
            onChange={(e)=>setSourceCurrency(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"  name={sourceCurrency} id={sourceCurrency} value={sourceCurrency}>
              
              <option values=""> Select source currency</option>
              {Object.keys(currencyNames).map((currency)=>(
                <option className="p-1" key={currency} value={currency}>
                  {currencyNames[currency]}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlfor={targetCurrency} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Target Currency</label>

            <select 
            onChange={(e)=>setTargetCurrency(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"  
            name={targetCurrency}  id={targetCurrency} 
            value={targetCurrency}>
            
            <option values={targetCurrency} > Target currency</option>
            {Object.keys(currencyNames).map((currency)=>(
                <option className="p-1" key={currency} value={currency}>
                  {currencyNames[currency]}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlfor={amountInSourceCurrency} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount in Source Currency</label>
            
            <input 
            onChange={(e)=>setAmountInSourceCurrency(e.target.value)}
            type="number" id={amountInSourceCurrency} 
            name={amountInSourceCurrency}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" 
            placeholder="Amount in Source Currency" required />

          </div>
            <button className="bg-green-500 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-md">Get the Targett Currency</button>
          </form>
        </section>
      </div>
      {amountInTargetCurrency}
    </div>
  )
}
