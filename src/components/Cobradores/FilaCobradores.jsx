import React from "react";
import {Link} from 'react-router-dom'

export default function FilaDeudores(data) {
  let { _id, nombre, servicio, ruc, direccion } = data.data;

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-500">{ruc}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{nombre}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm text-gray-900">{servicio}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <div className="text-sm text-gray-900">{direccion}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <Link to={"/menu/cobradores/editar/" + _id} className="text-indigo-600 hover:text-indigo-900">Editar</Link>
      </td>
    </tr>
  );
}
