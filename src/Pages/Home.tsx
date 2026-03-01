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
}

const Home = () => {
  const [input, setInput] = useState("");
  const [coins, setCoins] = useState<bitCoins[] | null>(null);
  const apiKey =
    "006cfddc56db5cb49f34d9698643f972e276cbe99adcdda4f387ea4017559c62";

  useEffect(() => {
    async function getData() {
      const res = await fetch(
        `https://rest.coincap.io/v3/assets?limit=10&offset=0&apiKey=${apiKey}`,
      );
      const data: ApiResponse = await res.json();
      const coinsData = data.data;
      const price = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });
      const formatedResult = coinsData.map((coin) => {
        const formated = {
          ...coin,
          formatedPrice: price.format(Number(coin.priceUsd)),
        };
        return formated;
      });
      setCoins(formatedResult);
    }
    getData();
  }, []);
  const navigate = useNavigate();

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    if (input === "") return;

    navigate(`/detail/${input}`);
  }

  function handleGetMore() {}
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
          <tr className={styles.tr}>
            <td data-label="Moeda" className={styles.tdLabel}>
              <div className={styles.name}>
                <Link to={"/detail/bitcoin"}>
                  <span>Bitcoin</span>|BTC
                </Link>
              </div>
            </td>
            <td data-label="valor Mercado" className={styles.tdLabel}>
              1T
            </td>
            <td data-label="Preco" className={styles.tdLabel}>
              8000
            </td>
            <td data-label="Volume" className={styles.tdLabel}>
              2b
            </td>
            <td data-label="Volume" className={styles.tdLabel}>
              2b
            </td>
            <td data-label="Mudança 24h" className={styles.tdProfit}>
              <span>1.20</span>
            </td>
          </tr>
        </tbody>
      </table>
      <button onClick={handleGetMore} className={styles.carregarMais}>
        Carregar mais
      </button>
    </main>
  );
};

export default Home;
