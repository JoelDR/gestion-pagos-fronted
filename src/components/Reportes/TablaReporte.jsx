import React, {useState, useEffect} from 'react';
import axios from 'axios';
import LoaderTable from '../Loader/LoaderTable';
import Message from '../Loader/Message';
import FilaReportes from './FilaReporte';
import VisualizadorPdf from './VisualizadorPdf';

export default function TablaReportes() {
  const [reportes, setReportes] = useState(null);
  const [search, setSearch ] = useState('');
  const [loader, setLoder] = useState(true);
  const [error, setError] = useState(null);
  const [reporte, setReporte] = useState({});
  const APIURL = 'http://localhost:3800/api/pagosfull';

  const onSearchChange = ({ target }) => {
    setSearch( target.value );
  }

  const filtrarReportes = () => {
    if (search.length === 0) {
      return reportes;
    }
    const filtro = reportes.filter(reporte => reporte.deudors[0].nombre.toUpperCase().includes(search.toUpperCase()) || 
    reporte.cobradors[0].nombre.toUpperCase().includes(search.toUpperCase()));
    return filtro;
  }

  useEffect(() => {
    axios.get(APIURL).then(res => {
      setReportes(res.data.pagosfull);
      setError(null);
      setLoder(false);
    })
    .catch(err => {
      setReportes(null)
      setError(err)
      setLoder(false);
    });
  },[APIURL]);
  
  return (
    <div className="overscroll-none flex flex-auto  grid grid-cols-12 gap-5">
      <div className="col-span-5 shadow-md bg-white rounded-lg">
        <div className=" align-middle inline-block min-w-full sm:px-6 lg:px-5 py-2">
          <section className='flex justify-between p-4'>
            <h2 className='text-xl font-semibold my-3'>Reportes</h2>
            <div>
              <input 
              type="text" 
              value={search}
              onChange={onSearchChange}
              placeholder='Buscar...' 
              className='text-sm px-3 py-2 mr-2 mb-2 border border-slate-400 focus:outline-none rounded-lg focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400'/>
            </div>
          </section>
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            {loader && <LoaderTable/>}
            {error && <Message/>}
            {reportes && (
              <div className='p-4'>
                <div className="min-w-full divide-y divide-gray-200">
                  <div className="bg-white divide-y divide-gray-200">
                    {
                      reportes.length > 0 ? 
                      filtrarReportes().map(report => (<FilaReportes setReporte={setReporte} key={report._id} data={report}/>)) :
                      <tr><td className="px-6 py-4 whitespace-nowrap">No hay datos</td></tr>
                    }
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="col-span-7 shadow-md bg-white rounded-lg"> 
          <VisualizadorPdf reporte={reporte}></VisualizadorPdf>
      </div>
    </div>
  );
}