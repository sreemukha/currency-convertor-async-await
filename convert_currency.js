const axios = require('axios');

const getExchangeRate = (base, to) => {
  return axios.get(`http://api.fixer.io/latest?base=${base}`).then((response) => {
    // returning promise from axios
    return response.data.rates[to];
  });
}

const getCountries = (currencyCode) => {
  return axios.get(`http://restcountries.eu/rest/v2/currency/${currencyCode}`).then((response) => {
    return response.data.map((country) => {
      return country.name;
    });
  });
}

const convertCurrency = (base, to, amount) => {
  let cntrys;
  return getCountries(to).then((countries) => {
    cntrys = countries;
    return getExchangeRate(base,to);
  }).then((rate) => {
    const exchange = amount * rate;

    return `${amount} ${base} is worth ${exchange} ${to}. ${to} can be used in the following countries: ${cntrys.join(', ')}`;
  });
}

const convertCurrencyAsync = async (base,to,amount) => {
  const countries = await getCountries(to);
  const rate = await getExchangeRate(base,to);
  const exchange = amount * rate;
  return `${amount} ${base} is worth ${exchange} ${to}. ${to} can be used in the following countries: ${countries.join(', ')}`;
}

convertCurrencyAsync('USD', 'CAD', 100).then((result) => {
  console.log(result);
});

getExchangeRate('USD', 'INR').then((result) => {
  console.log(result);
});
