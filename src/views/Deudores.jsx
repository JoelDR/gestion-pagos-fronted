import React from "react";
import TablaDeudores from "../components/Deudores/TablaDeudores";
import {Outlet, Link } from "react-router-dom";

export default function Deudores() {
  return (
    <div>
      <div className="border-b border-gray-200 dark:border-gray-700 mb-5 bg-white">
        <ul className="flex flex-wrap -mb-px">
          <li className="mr-2">
            <Link to="/menu/deudores/lista" className="inline-block py-4 px-4 text-sm font-medium text-center text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500">Lista</Link >
          </li>
          <li className="mr-2">
            <Link to="/menu/deudores/formulario" className="inline-block py-4 px-4 text-sm font-medium text-center text-gray-500 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300">Registrar</Link >
          </li>
          <li className="mr-2">
            <Link to="/menu/deudores/lista" className="inline-block py-4 px-4 text-sm font-medium text-center text-gray-500 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300">Lista</Link >
          </li>
          <li className="mr-2">
            <Link to="/menu/deudores/lista" className="inline-block py-4 px-4 text-sm font-medium text-center text-gray-500 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300">Lista</Link >
          </li>
        </ul>
      </div>
      <div>
        <Outlet/>
      </div>
    </div>
  );
}