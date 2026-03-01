import React from "react";
import styles from "../css/home.module.css";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className={styles.container}>
      <form className={styles.form}>
        <input type="text" placeholder="Digite o nome da moeda..." />
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
    </main>
  );
};

export default Home;
