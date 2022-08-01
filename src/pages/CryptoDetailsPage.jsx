import React from "react";
import Navbar from "../component/Navbar";
import { useParams } from "react-router-dom";

export default function CryptoDetailsPage() {
  const { id } = useParams();

  console.log(id);
  return (
    <>
      <Navbar />
      
    </>
  );
}
