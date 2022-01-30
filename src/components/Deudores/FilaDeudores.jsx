import React from "react";
import {Link} from 'react-router-dom'

export default function FilaCobradores(data) {
  let { _id, nombre, cedula, telefono, correo } = data.data;

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-500">{cedula}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{nombre}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm text-gray-900">{correo}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <div className="text-sm text-gray-900">{telefono}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <Link to={"/menu/deudores/editar/" + _id} className="text-indigo-600 hover:text-indigo-900">Editar</Link>
      </td>
    </tr>
  );
}
