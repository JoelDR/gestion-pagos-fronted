import React from "react";
import {Link} from 'react-router-dom'

export default function FilaReportes(data) {
  let { deudor, cobrador, total, fecha } = data.data;
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-500">{deudor}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{cobrador}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm text-gray-900">{total}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <div className="text-sm text-gray-900">{fecha}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
      <Link to={"/menu/reportes/lista"} className="text-indigo-600 hover:text-indigo-900">Ver</Link>
      </td>
    </tr>
  )
}