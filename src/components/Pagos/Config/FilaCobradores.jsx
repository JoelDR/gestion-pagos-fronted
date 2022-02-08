import React from "react";

export default function FilaDeudores({ data, getCobrador, getStateModal }) {
  let { nombre, servicio, ruc, direccion } = data;

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
        <button
          onClick={() => {
            getCobrador(data);
            getStateModal(false);
          }}
          className="text-indigo-600 hover:text-indigo-900"
        >
          Seleccionar
        </button>
      </td>
    </tr>
  );
}
