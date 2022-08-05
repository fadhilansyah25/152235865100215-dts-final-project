import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import useScrollToTop from "../hooks/useScrollToTop";
import Homepage from "../pages/Homepage";
import CryptoCurrencies from "../pages/CryptoCurrencies";
import CryptoDetailsPage from "../pages/CryptoDetailsPage";
import CryptoNewsPage from "../pages/CryptoNewsPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import WatchListPage from "../pages/WatchListPage";
import ExchangesPage from "../pages/ExchangesPage";

export default function Routers() {
  useScrollToTop();
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route
        path="/cryptocurrencies"
        element={
          <PrivateRoute>
            <CryptoCurrencies />
          </PrivateRoute>
        }
      />
      <Route
        path="/news"
        element={
          <PrivateRoute>
            <CryptoNewsPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/cryptocurrencies/details/:id"
        element={
          <PrivateRoute>
            <CryptoDetailsPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile/:id"
        element={
          <PrivateRoute>
            <ExchangesPage/>
          </PrivateRoute>
        }
      />
      <Route
        path="/account/:id"
        element={
          <PrivateRoute>
            <ExchangesPage/>
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/:id"
        element={
          <PrivateRoute>
            <ExchangesPage/>
          </PrivateRoute>
        }
      />
      <Route
        path="/exchange"
        element={
          <PrivateRoute>
            <ExchangesPage/>
          </PrivateRoute>
        }
      />
      <Route
        path="/watchlist"
        element={
          <PrivateRoute>
            <WatchListPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/login"
        element={
          <ProtectLoginRegister>
            <LoginPage />
          </ProtectLoginRegister>
        }
      />
      <Route
        path="/register"
        element={
          <ProtectLoginRegister>
            <RegisterPage />
          </ProtectLoginRegister>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function PrivateRoute({ children }) {
  const [user, loading] = useAuthState(auth);
  return loading ? null : user ? children : <Navigate to="/login" />;
}

function ProtectLoginRegister({ children }) {
  const [user, loading] = useAuthState(auth);
  return loading ? null : !user ? children : <Navigate to="/" />;
}
