import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import useScrollToTop from "../hooks/useScrollToTop";


export default function Routers() {
  useScrollToTop();
  return (
    <Routes>
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
