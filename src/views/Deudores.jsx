import React from "react";
import TablaDeudores from "../components/Deudores/TablaDeudores";
import {Outlet, Link } from "react-router-dom";

export default function Deudores() {
  return (
    <div>
        <Outlet/>
    </div>
  );
}