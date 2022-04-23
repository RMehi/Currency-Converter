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

getExchangeRate(from, to, amount).then((data) => {
    input[1].value = data.rates[`${to}`];
})


function changeColor(from, to) {
    currencyList.forEach((item, index) => {
        item = item.children;
        for (let i = 0; i < item.length; i++) {
            if (index == 0) {
                item[i].style.backgroundColor = null;
                item[i].style.color = '#C6C6C6';
                if (item[i].id == from) {
                    item[i].style.backgroundColor = "#833AE0";
                    item[i].style.color = "#FFFFFF";
                }
            } else {
                item[i].style.backgroundColor = null;
                item[i].style.color = '#C6C6C6';
                if (item[i].id == to) {
                    item[i].style.backgroundColor = "#833AE0";
                    item[i].style.color = "#FFFFFF";
                }
            }
        }
    })
}

function getInput() {
    input.forEach(item => {
        item.addEventListener("keyup", (e) => {
            amount = item.value;
            return amount;
        })
    })
}

first.forEach(item => {
    item.addEventListener("click", (e) => {
        from = e.target.innerText;

        changeColor(from, to);

        getInput(amount);

        getExchangeRate(from, to, amount).then((data) => {
            input[1].value = data.rates[`${to}`];
        })

    })
})

second.forEach(item => {
    item.addEventListener("click", (e) => {
        to = e.target.innerText;

        changeColor(from, to);

        getInput(amount);

        getExchangeRate(from, to, amount).then((data) => {
            input[1].value = data.rates[`${to}`];
        })

    })
})

changeColor(from, to);
