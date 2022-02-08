import React, {useState, useEffect} from 'react';
import axios from 'axios';
import FilaDeudores from './FilaDeudores';
import LoaderTable from '../Loader/LoaderTable';
import Message from '../Loader/Message';
import {Link } from "react-router-dom";

export default function TablaDeudores() {
  const [deudores, setDeudores] = useState(null);
  const [loader, setLoder] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch ] = useState('');
  const APIURL = 'http://localhost:3800/api/deudores';

  const filtrarDeudores = () => {
    if (search.length === 0) {
      return deudores;
    }
    const filtro = deudores.filter(deudor => deudor.nombre.includes(search));
    return filtro;
  }

  const onSearchChange = ({ target }) => {
    setSearch( target.value );
  }

  useEffect(() => {
    axios.get(APIURL).then(res => {
      setDeudores(res.data.deudores);
      setError(null);
      setLoder(false);
    })
    .catch(err => {
      setDeudores(null)
      setError(err)
      setLoder(false);
    });
  },[APIURL]);
  
  return(
    <div className="flex flex-col bg-white">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <section className='p-4'>
          <h2 className='text-xl font-semibold my-3'>Deudores</h2>
          <div className='flex justify-between'>
            <Link to="/menu/deudores/nuevo" className="text-white bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-3 py-2 text-center mr-2 mb-2">
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
            {deudores && (
              <div className='p-4'>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Cedula
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nombres y Apellidos
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        correo
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        telefono
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {
                      deudores.length > 0 ? 
                      filtrarDeudores().map(deudor => (<FilaDeudores key={deudor._id} data={deudor}/>)) :
                      <tr><td className="px-6 py-4 whitespace-nowrap">No hay datos</td></tr>
                    }
                    
                  </tbody>
                </table>
                {
                  deudores.length > 10 && (
                    <nav aria-label="Page navigation" className='mt-7 flex flex-col items-center'>
                      <div className="flex flex-col items-center">
                        <span className="text-sm text-gray-700">
                            Mostrando <span className="font-semibold text-gray-900">1</span> to <span className="font-semibold text-gray-900">5</span> de <span className="font-semibold text-gray-900">{deudores.length}</span> Entradas
                        </span>
                        <div className="inline-flex mt-2 xs:mt-0">
                            <button className="py-2 px-4 text-sm font-medium text-white bg-indigo-600 rounded-l hover:bg-indigo-700 focus:outline-none">
                                Anterior
                            </button>
                            <button className="py-2 px-4 text-sm font-medium text-white bg-indigo-600 rounded-r border-0 border-l border-gray-700 hover:bg-indigo-700">
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
    </div>
  );
}