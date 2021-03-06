import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link } from "react-router-dom";
import LoaderTable from '../Loader/LoaderTable';
import Message from '../Loader/Message';
import FilaPagos from './FilaPagos';
import Visualziar from './Visualizar';

export default function TablaPagos() {
  const [pagos, setPagos] = useState(null);
  const [search, setSearch ] = useState('');
  const [loader, setLoder] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [pagoSelect, setPagoSelect] = useState(null);
  const [stateModal, setStateModal] = useState(false);
  const APIURL = 'https://paguaygo.herokuapp.com/api/pagosfull';

  const filtrarPagos = () => {
    if (search.length === 0) {
      return pagos.slice(currentPage, currentPage + 5);
    }
    const filtro = pagos.filter(pago => pago.deudors[0].nombre.toUpperCase().includes(search.toUpperCase()) || pago.cobradors[0].nombre.toUpperCase().includes(search));
    return filtro.slice( currentPage, currentPage + 5);;
  }

  const nextPage = () => {
    if (
      pagos.filter(pago => pago.deudors[0].nombre.toUpperCase().includes(search) || pago.cobradors[0].nombre.toUpperCase().includes(search)).length > currentPage + 5
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
      setPagos(res.data.pagosfull);
      setError(null);
      setLoder(false);
    })
    .catch(err => {
      setPagos(null)
      setError(err)
      setLoder(false);
    });
  },[APIURL]);
  
  return (
    <div className="flex flex-col bg-white">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <section className='p-4'>
            <h2 className='text-xl font-semibold my-3'>Pagos</h2>
            <div className='flex justify-between'>
              <Link to="/menu/pagos/nuevo" className="text-white bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-3 py-2 text-center mr-2 mb-2">
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
            {pagos && (
              <div className='p-4'>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Deudor
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Cobrador
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fecha
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {
                      pagos.length > 0 ? 
                      filtrarPagos().map(pago => (<FilaPagos key={pago._id} data={pago} setPago={setPagoSelect} setStateModal={setStateModal}/>)) :
                      <tr><td className="px-6 py-4 whitespace-nowrap">No hay datos</td></tr>
                    }
                    
                  </tbody>
                </table>
                {
                  pagos.length > 5 && (
                    <nav aria-label="Page navigation" className='mt-7 flex flex-col items-center'>
                      <div className="flex flex-col items-center">
                        <div className="inline-flex mt-2 xs:mt-0">
                          <button className="py-2 px-4 text-sm font-medium text-white bg-indigo-600 rounded-l hover:bg-indigo-700 focus:outline-none" onClick={prevPage}>
                              Anterior
                          </button>
                          <button className="py-2 px-4 text-sm font-medium text-white bg-indigo-600 rounded-r border-0 border-l border-gray-700 hover:bg-indigo-700" onClick={nextPage}>
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
      <Visualziar state={stateModal} setState={setStateModal} pago={pagoSelect}/>
    </div>
  );
}
