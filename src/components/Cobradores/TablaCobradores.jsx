import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Filacobradores from './FilaCobradores';
import LoaderTable from '../Loader/LoaderTable';
import Message from '../Loader/Message';
import {Link } from "react-router-dom";
import Visualziar from './Visualizar';

export default function TablaCobradores() {
  const [cobradores, setCobradores] = useState(null);
  const [loader, setLoder] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0)
  const [search, setSearch ] = useState('');
  const [stateModal, setStateModal] = useState(true);
  const [cobradorSelect,setCobradorSelect] = useState(false);
  const APIURL = 'http://localhost:3800/api/cobradores';

  const filtrarcobradores = () => {
    if (search.length === 0) {
      return cobradores.slice(currentPage, currentPage + 5);
    }
    const filtro = cobradores.filter(cobrador => cobrador.nombre.toUpperCase().includes(search.toUpperCase()));
    return filtro.slice( currentPage, currentPage + 5);
  }

  const nextPage = () => {
    if (
      cobradores.filter((cobrador) => cobrador.nombre.includes(search)).length >
      currentPage + 5
    )
    setCurrentPage(currentPage + 5);
  };

  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 5);
  };

  const onSearchChange = ({ target }) => {
    setSearch( target.value );
    setCurrentPage(0);
  }

  useEffect(() => {
    axios.get(APIURL).then(res => {
      setCobradores(res.data.cobrador);
      setError(null);
      setLoder(false);
    })
    .catch(err => {
      setCobradores(null)
      setError(err)
      setLoder(false);
    });
  },[APIURL]);
  
  return(
    <div className="flex flex-col bg-white">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <section className='p-4'>
          <h2 className='text-xl font-semibold my-3'>cobradores</h2>
          <div className='flex justify-between'>
            <Link to="/menu/cobradores/nuevo" className="text-white bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-3 py-2 text-center mr-2 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-1 p-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
              Nuevo
            </Link>
            <input 
            type="text" 
            value={search}
            onChange={onSearchChange}
            placeholder='Buscar...' 
            className='px-2 border border-slate-400 focus:outline-none rounded-lg focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400'/>
          </div>
        </section>
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            {loader && <LoaderTable/>}
            {error && <Message/>}
            {cobradores && (
              <div className='p-4'>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        RUC
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Entidad
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Servicio
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Direccion
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {
                      cobradores.length > 0 ? 
                      filtrarcobradores().map(deudor => (<Filacobradores key={deudor._id} data={deudor} setStateModal={setStateModal} setCobradorSelect={setCobradorSelect}/>)) :
                      <tr><td className="px-6 py-4 whitespace-nowrap">No hay datos</td></tr>
                    }
                  </tbody>
                </table>
                {
                  cobradores.length > 5 && (
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
            )}
          </div>
        </div>
      </div>
      <Visualziar state={stateModal} setState={setStateModal} cobrador={cobradorSelect}/>
    </div>
  );
}