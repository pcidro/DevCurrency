import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../css/details.module.css";

const Details = () => {
  interface bitCoin {
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

  interface ApiResponse {
    data: bitCoin;
  }

  const [coin, setCoin] = useState<bitCoin | null>(null);
  const [loading, setLoading] = useState(true);
  const apiKey =
    "006cfddc56db5cb49f34d9698643f972e276cbe99adcdda4f387ea4017559c62";
  const { cripto } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getCoin() {
      try {
        setLoading(true);
        const res =
          await fetch(`https://rest.coincap.io/v3/assets/${cripto}?apiKey=${apiKey}​​​
`);
        const data: ApiResponse = await res.json();
        const price = Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        });

        const priceCompact = Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          notation: "compact",
        });
        const resultData = {
          ...data.data,
          formatedPrice: price.format(Number(data.data.priceUsd)),
          formatedMarket: priceCompact.format(Number(data.data.marketCapUsd)),
          formatedVolume: priceCompact.format(Number(data.data.volumeUsd24Hr)),
        };
        if (data) setCoin(resultData);
      } catch (err) {
        console.log(err);
        navigate("/");
      } finally {
        setLoading(false);
      }
    }
    getCoin();
  }, [cripto, navigate]);

  if (loading) return <p className={styles.loading}>Loading...</p>;
  if (coin)
    return (
      <div className={styles.container}>
        <h1>
          {coin.name} | {coin.symbol}
        </h1>
        <section className={styles.content}>
          <img
            className={styles.logo}
            src={`https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`}
          />
          <p>
            <strong>Preço:</strong>
            <span className={styles.info}>{coin.formatedPrice}</span>
          </p>
          <p>
            <strong>Mercado:</strong>
            <span className={styles.info}>{coin.formatedMarket}</span>
          </p>
          <p>
            <strong>Volume:</strong>
            <span className={styles.info}>{coin.formatedVolume}</span>
          </p>
          <p>
            <strong>Mudança 24h:</strong>{" "}
            <span
              className={
                Number(coin.changePercent24Hr) > 0
                  ? styles.tdProfit
                  : styles.tdLoss
              }
            >
              {Number(coin.changePercent24Hr).toFixed(3)}
            </span>
          </p>
        </section>
      </div>
    );
};

export default Details;
