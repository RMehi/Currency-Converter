let input = document.querySelectorAll(".input-number");
let currencyList = document.querySelectorAll(".currency-list");
let first = document.querySelectorAll(".first");
let second = document.querySelectorAll(".second");

let exchangeRate = document.querySelectorAll(".exchange-rate");

let from = "RUB";
let to = "USD";
let amount = 1;

async function getExchangeRate(from, to, amount) {
    let api = await fetch(`https://api.exchangerate.host/latest?base=${from}&symbols=${to}&amount=${amount}`);
    let data = await api.json();
    return data;
}


// getExchangeRate(from, to, amount).then(data => {
//     console.log(data)
//     input[1].value = data.rates[`${to}`];
// })

getExchangeRate(from,to,amount).then((data)=>{
    input[1].value = data.rates[`${to}`];

    first.forEach(item=>{
        item.addEventListener("click",(e)=>{
            from = e.target.innerText;
            console.log(from)
        })
    })
    
    second.forEach(item=>{
        item.addEventListener("click",(e)=>{
            to = e.target.innerText;
            console.log(to)
        })
    })})
