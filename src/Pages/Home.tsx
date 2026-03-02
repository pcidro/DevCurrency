import React, { useState, useEffect } from "react";
import type { SubmitEvent } from "react";
import styles from "../css/home.module.css";
import { BsSearch } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";

interface ApiResponse {
  data: bitCoins[];
  timestamp: number;
}

interface bitCoins {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  supply: string;
  maxSupply: string;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  priceUsd: string;
  changePercent24Hr: string;
  vwap24Hr: string;
  explorer: string;
  formatedPrice?: string;
  formatedMarket?: string;
  formatedVolume?: string;
}

const Home = () => {
  const [input, setInput] = useState("");
  const [coins, setCoins] = useState<bitCoins[]>([]);
  const [offset, setOffSet] = useState(0);
  const apiKey =
    "006cfddc56db5cb49f34d9698643f972e276cbe99adcdda4f387ea4017559c62";

  useEffect(() => {
    async function getData() {
      const res = await fetch(
        `https://rest.coincap.io/v3/assets?limit=10&offset=${offset}&apiKey=${apiKey}`,
      );
      const data: ApiResponse = await res.json();
      const coinsData = data.data;
      const price = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });

      const priceCompact = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        notation: "compact",
      });
      const formatedResult = coinsData.map((coin) => {
        const formated = {
          ...coin,
          formatedPrice: price.format(Number(coin.priceUsd)),
          formatedMarket: priceCompact.format(Number(coin.marketCapUsd)),
          formatedVolume: priceCompact.format(Number(coin.volumeUsd24Hr)),
        };
        return formated;
      });
      const listCoins = [...coins, ...formatedResult];
      setCoins(listCoins);
    }
    getData();
  }, [offset]);
  const navigate = useNavigate();

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    const coinExists = coins.find((coin) =>
      coin.name.toLowerCase().includes(input.trim().toLowerCase()),
    );

    if (!coinExists) {
      alert("Moeda não localizada");
      setInput("");
      return;
    }

    navigate(`/detail/${input}`);
  }

  function handleGetMore() {
    if (offset === 0) {
      setOffSet(10);
      return;
    }
    setOffSet(offset + 10);
  }
  if (coins !== null)
    return (
      <main className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            placeholder="Digite o nome da moeda..."
            value={input}
            onChange={({ target }) => setInput(target.value)}
          />
          <button type="submit">
            <BsSearch size={30} color="#fff" />
          </button>
        </form>
        <table>
          <thead>
            <tr>
              <th scope="col">Moeda</th>
              <th scope="col">Valor de mercado</th>
              <th scope="col">Preço</th>
              <th scope="col">Volume</th>
              <th scope="col">Mudança 24h</th>
            </tr>
          </thead>
          <tbody id="tbody">
            {coins.length > 0 &&
              coins.map((coin) => (
                <tr key={coin.id} className={styles.tr}>
                  <td data-label="Moeda" className={styles.tdLabel}>
                    <div className={styles.name}>
                      <img
                        className={styles.logo}
                        src={`https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`}
                      />
                      <Link to={`/detail/${coin.id}`}>
                        <span>{coin.name} | </span>
                        {coin.symbol}
                      </Link>
                    </div>
                  </td>
                  <td data-label="valor Mercado" className={styles.tdLabel}>
                    {coin.formatedMarket}
                  </td>
                  <td data-label="Preco" className={styles.tdLabel}>
                    {coin.formatedPrice}
                  </td>
                  <td data-label="Volume" className={styles.tdLabel}>
                    {coin.formatedVolume}
                  </td>

                  <td
                    data-label="Mudança 24h"
                    className={
                      Number(coin.changePercent24Hr) > 0
                        ? styles.tdProfit
                        : styles.tdLoss
                    }
                  >
                    <span>{Number(coin.changePercent24Hr).toFixed(3)}</span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <button onClick={handleGetMore} className={styles.carregarMais}>
          Carregar mais
        </button>
      </main>
    );
};

export default Home;
