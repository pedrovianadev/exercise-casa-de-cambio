import Swal from "sweetalert2";

const searchButton = document.querySelector('.search-btn');

const coinInput = document.querySelector('#coin-input');

const coinsList = document.querySelector('.coins');

function fetchAPI(coin){
    const url = `https://api.exchangerate.host/latest?base=${coin}`;
    return fetch(url)
    .then((response) => response.json())
    .then((data) => {
        if(data.base !== coin.toUpperCase()){
            throw new Error('Moeda não existente!')
        }
        return data.rates;
    })
}

function renderCoins(coins){
    // deixo a lista vazia
    coinsList.innerHTML = ''; 

    // Aqui eu pego meu objeto e transformo em um array que possui vários arrays que contém a moeda de cotação e o objeto
    const coinsArray = Object.entries(coins)
    console.log(coinsArray);

    coinsArray.forEach((coin) => {
        const [coinName, value] = coin;
        
        const li = document.createElement('li');
        li.textContent = `${coinName} - ${value}`;
        coinsList.appendChild(li);
    })
}

function handleSearch(){
    const coin = coinInput.value;
    console.log(coin);

    if(!coin){
        return Swal.fire({
            icon: 'error',
            title: 'Opsss...',
            text: 'Você precisa digitar uma moeda'
        })
    }

    fetchAPI(coin)
    .then(renderCoins)
    .catch((error) => {
        Swal.fire({
            icon: 'error',
            title: 'Opsss...',
            text: error.message
        })
    })
}

searchButton.addEventListener('click', handleSearch);
