import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import { CoinContext } from '../../context/CoinContext'

const Home = () => {

  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDiplayCoin] = useState([]);
const [input,setInput]=useState('');

const InputHandler=(event)=>{
 setInput(event.target.value);
 if(event.target.value===""){
  setDiplayCoin(allCoin);
 }
}
const SearchHandler=async (event)=>{
event.preventDefault();
const coins = await allCoin.filter((item)=>{
return item.name.toLowerCase().includes(input.toLowerCase())
})
setDiplayCoin(coins)
}
  
useEffect(() => {
    setDiplayCoin(allCoin);
  }, [allCoin])
  return (
    <div className='home'>
      <div className='hero'>
        <h1>Largest <br /> Crypto Marketplace</h1>
        <p>Welcome to the worlds largest cryptocurrency marketplace. Sign up to explore more about
          crypto.</p>
        <form onSubmit={SearchHandler}>
          <input onChange={InputHandler} value={input}  type="text" placeholder='SEARCH CRYPTO' required/>
          <button type="submit">Search</button>
        </form>

      </div>
      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>COINS</p>
          <p>PRICE</p>
          <p style={{ textAlign: "center" }}>24H CHANGE</p>
          <p className='market-cap'>MARKET CAP</p>


        </div>
        {
          displayCoin.slice(0, 10).map((item, index) => (
            <div className="table-layout" key={index}>
              <p>{item.market_cap_rank}</p>
              <div>
                <img src={item.image} alt=''></img>
                <p>{item.name + " - " + item.symbol}</p>
              </div>
              <p>{currency.symbol} {item.current_price.toLocaleString()}</p>
              <p className={item.price_change_percentage_24h>0?
                "green":"red"
              }>{Math.floor(item.price_change_percentage_24h*100)/100}</p>
              <p className='market-cap'>{currency.symbol}{item.market_cap.toLocaleString()}</p>

            </div>
          ))
        }
      </div>

    </div>
  )
}

export default Home
