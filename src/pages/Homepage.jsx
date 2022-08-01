import React from "react";
import Navbar from "../component/Navbar";
import Footer from "../container/Footer";
import HeroBanner from "../container/HeroBanner";
import StatsBanner from "../container/StatsBanner";


export default function Homepage() {

  return (
    <>
      <Navbar/>
      <HeroBanner/>
      <StatsBanner/>
      <Footer/>
    </>
  );
}
