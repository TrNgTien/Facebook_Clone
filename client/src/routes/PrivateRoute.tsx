import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "@hooks/useStore";

function PrivateRoute({ children }: any) {
  const { isLogged } = useAppSelector((state) => state.auth);
  return isLogged ? children : <Navigate to='/' />;
}
export default PrivateRoute;
