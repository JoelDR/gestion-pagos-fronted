import React from "react";
import { Link } from 'react-router-dom';
export default function FilaPagos({ data, setStateModal, setPago }) {
  let { _id, deudors, cobradors, total, fecha } = data;
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-500">{deudors[0].nombre}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{cobradors[0].nombre}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm text-gray-900">{total}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <div className="text-sm text-gray-900">{fecha.substr(0,10)}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex">
        <button 
          type="button" 
          className="px-6 text-indigo-600 hover:text-indigo-900"
          onClick={()=> {
            setStateModal(true);
            setPago(data);
          }}
        >Ver</button>
      </td>
    </tr>
  )
}