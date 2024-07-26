import { useEffect, useState } from "react";
import Inputs from "./components/inputs";

function App() {
  const [from, setfrom] = useState("USD");
  const [to, setto] = useState("PKR");
  const [amount, setamount] = useState(0);
  const [convertedamount, setconvertedamount] = useState(0);
  const [data, setdata] = useState({});
  const [keys, setkeys] = useState([]);
  useEffect(() => {
    fetch(`https://api.exchangerate-api.com/v4/latest/${from}`)
      .then((from) => {
        return from.json();
      })
      .then((data) => {
        setdata(data);
        setkeys(Object.keys(data.rates));
      });
  }, [from]);

  const handlefromchange = (value) => {
    setfrom(value);
  };
  const handletochange = (value) => {
    setto(value);
  };
  const handleconversion = (e) => {
    e.preventDefault();
    setconvertedamount(Number(amount * data.rates[to]));
  };
  const swap = () => {
    setto(from);
    setfrom(to);
    setamount(convertedamount);
    setconvertedamount(amount);
  };
  return (
    <div className="maincontainer">
      <img
        src="https://images.pexels.com/photos/3943723/pexels-photo-3943723.jpeg?auto=compress&cs=tinysrgb&w=600"
        alt=""
      />
      <div className="currency">
        <h1>Currency Coverter</h1>
        <form className="inputs" onSubmit={handleconversion}>
          <button type="button" onClick={swap} className="swap">
            Swap
          </button>
          <Inputs
            value={amount}
            onamountchange={(amount)=>setamount(amount)}
            label="From"
            disabled={false}
            keys={keys}
            onchange={handlefromchange}
            selected={from}
          ></Inputs>
          <Inputs
            onchange={handletochange}
            value={convertedamount}
            label="To"
            disabled={true}
            keys={keys}
            selected={to}
          ></Inputs>
          <button className="convert" type="submit">
            Convert
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
