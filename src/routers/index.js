import React from "react";
import { Routes, Route } from "react-router-dom";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "../firebase/firebase";
import useScrollToTop from "../hooks/useScrollToTop";
import Homepage from "../pages/Homepage";
import CryptoCurrencies from "../pages/CryptoCurrencies";
import CryptoDetailsPage from "../pages/CryptoDetailsPage";

export default function Routers() {
  useScrollToTop();
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/*" element={<Homepage />} />
      <Route path="/cryptocurrencies" element={<CryptoCurrencies />} />
      <Route
        path="/cryptocurrencies/details/:id"
        element={<CryptoDetailsPage />}
      />
    </Routes>
  );
}

// function PrivateRoute({ children }) {
//   const [user, loading] = useAuthState(auth);
//   return loading ? null : user ? children : <Navigate to="/login" />;
// }

// function ProtectLoginRegister({ children }) {
//   const [user, loading] = useAuthState(auth);
//   return loading ? null : !user ? children : <Navigate to="/" />;
// }
