import React from "react";
import Navbar from "../component/Navbar";
import Footer from "../container/Footer";
import HomepageBanner from "../container/HomepageBanner";
import StatsBanner from "../container/StatsBanner";


export default function Homepage() {

  return (
    <>
      <Navbar/>
      <HomepageBanner/>
      <StatsBanner/>
      <Footer/>
    </>
  );
}
