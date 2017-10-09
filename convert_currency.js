const axios = require('axios');

// const getExchangeRate = (base, to) => {
//   return axios.get(`http://api.fixer.io/latest?base=${base}`).then((response) => {
//     // returning promise from axios
//     return response.data.rates[to];
//   });
// }
//
// const getCountries = (currencyCode) => {
//   return axios.get(`http://restcountries.eu/rest/v2/currency/${currencyCode}`).then((response) => {
//     return response.data.map((country) => {
//       return country.name;
//     });
//   });
// }

// const convertCurrency = (base, to, amount) => {
//   let cntrys;
//   return getCountries(to).then((countries) => {
//     cntrys = countries;
//     return getExchangeRate(base,to);
//   }).then((rate) => {
//     const exchange = amount * rate;
//
//     return `${amount} ${base} is worth ${exchange} ${to}. ${to} can be used in the following countries: ${cntrys.join(', ')}`;
//   });
// }

const getExchangeRateAsync = async (base, to) => {
  try{
    const response = await axios.get(`http://api.fixer.io/latest?base=${base}`);
    const rate = response.data.rates[to];
    if(rate) return rate;
    else {
      throw new Error(`Unable to get exchange rate for ${base} and ${to}`);
    }
  } catch(e){
    throw new  Error(`Unable to get exchange rate for ${base} and ${to}`);
  }
}

const getCountriesAsync = async (currencyCode) => {
  try{
    const response = await axios.get(`http://restcountries.eu/rest/v2/currency/${currencyCode}`);
    return response.data.map((country) => {
      return country.name;
    });
  } catch(e){
    throw new Error(`Unable to get countries that use ${currencyCode}`);
  }
}

const convertCurrencyAsync = async (base,to,amount) => {
  const countries = await getCountriesAsync(to);
  const rate = await getExchangeRateAsync(base,to);
  const exchange = amount * rate;
  return `${amount} ${base} is worth ${exchange} ${to}. ${to} can be used in the following countries: ${countries.join(', ')}`;
}

convertCurrencyAsync('USD', 'EUR', 100).then((result) => {
  console.log(result);
}).catch((e) => {
  console.log(e.message);
});

// getExchangeRate('USD', 'INR').then((result) => {
//   console.log(result);
// });
