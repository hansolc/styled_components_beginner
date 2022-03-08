const BASE_URL = 'https://api.coinpaprika.com/v1'

export function fetchCoins(){
    return fetch(`${BASE_URL}/coins`).then(res => res.json())
}

export function fetchCoinInfo(coinId: string){
    return fetch(`${BASE_URL}/coins/${coinId}`).then(res => res.json());
}

export function fetchCoinPriceInfo(coinId: string){
    return fetch(`${BASE_URL}/tickers/${coinId}`).then(res => res.json());
}

export function fetchCoinHistory(coinId: string){
    const endDate = Math.floor(Date.now() / 1000)
    const startTime = endDate - 60*60*24*7
    return fetch(`${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startTime}&end=${endDate}`).then(res => res.json());
}