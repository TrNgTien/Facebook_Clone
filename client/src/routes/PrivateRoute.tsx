import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "@store/hooks";

function PrivateRoute({ children }: any) {
  const { isLogged } = useAppSelector((state) => state.auth);
  // const tokenData = localStorage.getItem("token");
  return isLogged ? children : <Navigate to='' />;
}
export default PrivateRoute;
