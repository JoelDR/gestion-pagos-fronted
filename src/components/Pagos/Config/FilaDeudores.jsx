import React from "react";

export default function FilaCobradores({ data, getDeudor, getStateModal }) {
  let { nombre, cedula, telefono, correo } = data;

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
        <button
          onClick={() => {
            getDeudor(data);
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
