import React from "react";
import Navbar from "../component/Navbar";
import CryptoSearch from "../container/CryptoSearch";
import Footer from "../container/Footer";

export default function CryptoCurrencies() {
  return (
    <>
      <Navbar />
      <CryptoSearch />
      <Footer />
    </>
  );
}
