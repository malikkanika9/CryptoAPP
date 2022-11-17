
import { useEffect, useState } from 'react';
import { Coin } from './components/Coin';
import axios from 'axios';

function App() {
  const [coins, setCoins]= useState([])
  const [search, setSearch]=useState("")

  useEffect(()=>{
axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=100&page=1&sparkline=false")
.then((res)=>{
  setCoins(res.data)
  console.log(res.data)
}).catch((err)=>{

  console.log(err)
})
  },[])

  const handleChange=((e)=>{
setSearch(e.target.value)

  })
const filteredCoins=coins.filter(coin=>
  
  coin.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="coin-app">
      <div className="coin-search">

<form >
<input type="text" placeholder='Provide the Coun Name'  onChange={handleChange} />

</form>
      </div>
      {filteredCoins.map(coin=>{
        return(
          <Coin 
          key={coin.id} 
          name={coin.name} 
          image={coin.image} 
          symbol={coin.symbol}
          marketcap={coin.market_cap}
          price={coin.current_price}
          pricechange={coin.price_change_percentage_24h}

          />
        );
      })}
    </div>
  );
}

export default App;
