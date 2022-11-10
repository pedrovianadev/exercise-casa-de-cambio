const currencyAPI = (currency) => 
  fetch(`https://api.exchangerate.host/latest?base=${currency}`)
    .then(resp => resp.json())
    .then(data => console.log(data.rates));

currencyAPI('USD');