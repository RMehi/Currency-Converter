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
    

    function getExchangeRateP() {
        getExchangeRate(from, to, 1).then(data => {
            exchangeRate[0].textContent = `1 ${from} = ${data.rates[`${to}`]} ${to}`;
        });
        getExchangeRate(to, from, 1).then(data => {
            exchangeRate[1].textContent = `1 ${to} = ${data.rates[`${from}`]} ${from}`;
        });
        
    }


    function getExchangeRateFunc(forward, value) {
        if (from === to) {
            if (forward) {
                input[1].value = input[0].value;
            } else {
                input[0].value = input[1].value;
            }
            getExchangeRateP();
        } else {
            if (forward) {
                if (input[0].value == 0) {
                    input[1].value = 0;
                    getExchangeRateP();
                } else {
                    getExchangeRate(from, to, value).then(data => {
                        input[1].value = data.rates[`${to}`];
                        getExchangeRateP();
                    }).catch((e) => {
                        alert('Internet Disconnected');
                    });
                }
            } else {
                if (input[1].value == 0) {
                    input[0].value = 0;
                    getExchangeRateP();
                } else {
                    getExchangeRate(to, from, value).then(data => {
                        amount = input[0].value = data.rates[`${from}`];
                        console.log(amount);
                        getExchangeRateP();
                    }).catch(() => {
                        alert('Internet Disconnected');
                    });
                }
            }
        }
    }


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
        input.forEach((item,index) => {


            item.addEventListener('change', changeEnterEvent);
            item.addEventListener('keypress', (e) => {
                if (e.code == "Enter") {
                    changeEnterEvent();
                }
            });
            function changeEnterEvent() {
                if (index == 0) {
                    amount = item.value;
                }
                if (index == 0) {
                    getExchangeRateFunc(true, item.value);
                } else {
                    getExchangeRateFunc(false, item.value);
                    console.log(item.value)
                }
            }
        })

        
    }

    document.addEventListener('keypress', (e) => {
        let regex = new RegExp("^[0-9]|[.]|[,]");
    
        if (!regex.test(e.key)) {
            e.preventDefault(); 
        }
        else {
            if (e.target.value.includes('.') && (e.key === ',' || e.key === '.')) {
                e.preventDefault();
            }
            else if(e.key === ','){  
                e.target.value += '.';
                e.preventDefault();
            }
        }
    });

    first.forEach(item => {
        item.addEventListener("click", (e) => {
            from = e.target.innerText;

            changeColor(from, to);


            getExchangeRateFunc(true, amount);

        })
    })

    second.forEach(item => {
        item.addEventListener("click", (e) => {
            to = e.target.innerText;

            changeColor(from, to);

            getExchangeRateFunc(true, amount);
        })
    })



    getExchangeRateFunc(true, amount)
    getInput(amount);
    changeColor(from, to);
