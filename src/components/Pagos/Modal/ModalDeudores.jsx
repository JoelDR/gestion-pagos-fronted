import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ModalDeudores({ state, setState, setDeudor }) {
  let tableHead = ['RUC', 'Entidad', 'Servicio', 'Dirección', 'Acción']
  const [listaDeudores, setListaDeudores] = useState(null);
  const [currentPage, setCurrentPage] = useState(0)
  const [search, setSearch ] = useState('');

  const filtrarDeudores = () => {
    if (search.length === 0) {
      return listaDeudores.slice(currentPage, currentPage + 5);
    }
    const filtro = listaDeudores.filter(deudor => deudor.nombre.toUpperCase().includes(search));
    return filtro.slice( currentPage, currentPage + 5);
  }

  const nextPage = () => {
    if (
      listaDeudores.filter((deudor) => deudor.nombre.toUpperCase().includes(search)).length >
      currentPage + 5
    )
    setCurrentPage(currentPage + 5);
  };

  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 5);
  };

  const onSearchChange = ({ target }) => {
    setSearch( target.value );
  }

  const APIURL = 'http://localhost:3800/api/deudores'
  useEffect(() => {
    axios.get(APIURL).then(response => {
      setListaDeudores(response.data.deudores)
    })
  }, [APIURL]);

  return(
    <>
      {
        state && 
          <div className='fixed flex p-8 justify-center h-screen bg-gray-800 bg-opacity-50 top-0 left-0 w-screen'>
            <div className='flex flex-col w-3/4 mt-3 bg-white opacity-100 rounded-lg px-8 py-8'>
              <header className="flex justify-between mb-3">
                <h3 className="text-lg font-bold text-indigo-600">Lista de deudores</h3>
                <button 
                  onClick={() => setState(false)} 
                  className="pointer bg-inherit font-bold text-xl text-rose-400 rounded-lg hover:bg-slate-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </header>
              <input 
                type="text" 
                value={search}
                onChange={onSearchChange}
                placeholder='Buscar...' 
                className='px-3 py-2 w-1/4 my-2 border border-slate-400 focus:outline-none rounded-lg focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400'
              />
              <table className="divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {
                      tableHead.map(head => 
                        <th key={Math.random() * 100} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          { head }
                        </th>
                      )
                    }
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {
                    listaDeudores && filtrarDeudores().map(deudor => (
                      <tr key={deudor._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{deudor.cedula}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{deudor.nombre}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{deudor.correo}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="text-sm text-gray-900">{deudor.telefono}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button 
                            type="button" 
                            className="mr-4 text-indigo-600 hover:text-indigo-900" 
                            onClick={() => {
                              setDeudor(deudor);
                              setState(false);
                            }}
                          >Selecionar</button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
              {
                listaDeudores && listaDeudores.length > 5 && (
                  <nav aria-label="Page navigation" className='mt-7 flex flex-col items-center'>
                    <div className="flex flex-col items-center">
                      <div className="inline-flex mt-2 xs:mt-0">
                        <button 
                          className="py-2 px-4 text-sm font-medium text-white bg-indigo-600 rounded-l hover:bg-indigo-700 focus:outline-none"
                          onClick={ prevPage }>
                            Anterior
                        </button>
                        <button 
                          className="py-2 px-4 text-sm font-medium text-white bg-indigo-600 rounded-r border-0 border-l border-gray-700 hover:bg-indigo-700"
                          onClick={ nextPage }>
                            Siguiente
                        </button>
                      </div>
                    </div>
                  </nav>
                )
              }
            </div>
          </div>
      }
    </>
  );
}