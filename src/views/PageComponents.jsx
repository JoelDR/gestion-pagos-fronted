import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "./Login";
export default function Deudores() {
  const { user, loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
  return (
    <div>
      <Outlet />
    </div>
  );
}
