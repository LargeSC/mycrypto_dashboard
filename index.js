// javascript
const cryptoContainer = document.getElementById("crypto-container")
const crypto = ["ethereum","bitcoin","tezos","solana","litecoin","polkadot"]


// CRYPTO INFO

async function getCryptoApi(coin) {
        
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coin}?localization=false&tickers=false&community_data=false&developer_data=false`)
    const data = await res.json()
        // console.log(data)
        // cryptoContainer.innerHTML = getCryp
        return data

}

// cryptoContainer.innerHTML = getCryptoCardHtml(data)


function getCryptoCardHtml(data){
    const marketData = data.market_data
    const currentVal = marketData.current_price.usd.toFixed(1)
    const arrow = growOrDecline(marketData.price_change_percentage_24h) === "grow"? "⬆":"⬇"
    const isGrowing24H = growOrDecline(marketData.price_change_percentage_24h)
    const isGrowing7D = growOrDecline(marketData.price_change_percentage_7d)
    const isGrowing30D = growOrDecline(marketData.price_change_percentage_30d)

   return `
        <div id="crypto-header">
            <img class="crypto-img" src="${data.image.small}" />
            <p class="crypto-title">
                ${data.name} <span class="${isGrowing24H}">${arrow}</span>
            </p>
        </div>
        <div class="crypto-price-holder">
            <p class="crypto-price current ${isGrowing24H}">
                $${numberWithCommas(currentVal)}
            </p>
            
            <h3 class="card-subheader P24H">P24H</h3>
            <p class="crypto-price percentage24H ${isGrowing24H}"> 
                ${marketData.price_change_percentage_24h.toFixed(1)}%
            </p>
            <p class="crypto-price diff24H ${isGrowing24H}">
                ${marketData.price_change_24h.toFixed(1)}
            </p>
            
            <h3 class="card-subheader P7D">P7D</h3>
            <p class="crypto-price percentage7D ${isGrowing7D}">
                ${marketData.price_change_percentage_7d.toFixed(1)}%
            </p>
            <p class="crypto-price diff7D ${isGrowing7D}">
                ${(marketData.price_change_percentage_7d*currentVal/100).toFixed(1)}
            </p>
            
            <h3 class="card-subheader P30D">P30D</h3>
            <p class="crypto-price percentage30D ${isGrowing30D}"> 
                ${marketData.price_change_percentage_30d.toFixed(1)}%
            </p>
            <p class="crypto-price diff30D ${isGrowing30D}"> 
                ${(marketData.price_change_percentage_30d*currentVal/100).toFixed(1)}
            </p>
        </div>`
}

function growOrDecline(number){
    return number > 0? "grow" : "decline";
}

function numberWithCommas(num) {
    num = num.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(num))
        num = num.replace(pattern, "$1,$2");
    return num;
}

function getCryptoDataHtml(array) {
   return array.map((coin, index) =>{
        getCryptoApi(coin).then(data => {
                return  
                `<div class="crypto-card" id="${data.name.toLowerCase()}"style="order:${index}">
                    ${getCryptoCardHtml(data)}
                </div>
            `
        })
    }).join('')
}

// function displayCrypto(){
//     cryptoContainer.innerHTML = getCryptoDataHtml(crypto)
// }
function displayCrypto(){
    cryptoContainer.innerHTML =""
    crypto.map((coin, index) =>{
        getCryptoApi(coin).then(data => {
            cryptoContainer.innerHTML += `
                <div class="crypto-card" id="${data.name.toLowerCase()}"style="order:${index}">
                    ${getCryptoCardHtml(data)}
                </div>
            `
            // const cards = document.getElementsByClassName('crypto-card')
            const cards = document.getElementsByClassName('crypto-card')
            for(let card of cards){
                card.addEventListener('click',(event)=>console.log(event.target))
            }
        })
    })
}
displayCrypto()
setInterval(displayCrypto,60000)


document.getElementById('refresh-data').addEventListener('click',displayCrypto)
