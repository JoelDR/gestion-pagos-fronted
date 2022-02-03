import {React, useRef} from "react";
import {PDFExport} from "@progress/kendo-react-pdf"
import QRCodeReact from "qrcode.react";
import './Reporte.css'
import logo from '../../assets/logo.jpeg'

export default function VisualizadorPdf(reporte) {
  let data = reporte.reporte;
  const pdfExportComponent = useRef(null);

  const hundleExportWithComponent = (event) => {
    pdfExportComponent.current.save();
  }

  return (
    <div>
      {reporte.reporte._id ?  
        <div> 
          <div className="flex justify-end p-3 shadow">
            <button onClick={hundleExportWithComponent} className="text-white bg-gradient-to-r from-rose-300 via-rose-400 to-rose-400 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-3 py-2 text-center">
              Descargar
            </button>
          </div>
          <PDFExport ref={pdfExportComponent} paperSize="A4">
              <div>
                <div className="Encabezado">
                  <br />
                </div>
                <div className="pl-12 pr-12 pt-1 flex justify-between content-info">
                  <img src={logo} alt="" width={225}/>
                  <div>
                    <h6 className="text-indigo-900 font-bold">Agencia de pagos PaguayGo</h6>
                    <div>
                      <h6 className="text-indigo-900 font-bold inline">RUC </h6>
                      <h6 className="inline text-gray-500 font-semibold">0706458742001</h6>
                    </div>
                    <div>
                      <h6 className="text-indigo-900 font-bold inline">Dirección </h6>
                      <h6 className="inline text-gray-500 font-semibold">Circunvalación Norte y 10 de Agosto</h6>
                    </div>
                    <div>
                      <h6 className="text-indigo-900 font-bold inline">Correo </h6>
                      <h6 className="inline text-gray-500 font-semibold">paguaygo@hotmail.com</h6>
                    </div>
                    <div>
                      <h6 className="text-indigo-900 font-bold inline">Telefono </h6>
                      <h6 className="inline text-gray-500 font-semibold">(07) 2963 880 - (07) 2965 235</h6>
                    </div>
                  </div>
                </div>
                <div className="p-12">
                  <div className="flex justify-between">
                    <div className="p-2">
                        <h1 className="text-indigo-900 text-base"><strong>{data.deudors[0].nombre}</strong></h1>
                      <div>
                        <h1 className="text-gray-700 text-sm font-bold inline">Cedula: </h1>
                        <h1 className="inline text-sm font-semibold text-gray-500 ">{data.deudors[0].cedula}</h1>
                      </div>
                      <div>
                        <h1 className="text-gray-700 text-sm font-bold inline">Fecha: </h1>
                        <h1 className="inline text-sm font-semibold text-gray-500">{data.fecha.substr(0,10)}</h1>
                      </div>
                      <div>
                        <h1 className="text-gray-700 font-bold inline">Correo: </h1>
                        <h1 className="inline text-sm font-semibold text-gray-500">{data.deudors[0].correo}</h1>
                      </div>
                      <div>
                        <h1 className="text-gray-700 text-sm font-bold inline">Pago No: </h1>
                        <h1 className="inline text-sm font-semibold text-gray-500">{data._id}</h1>
                      </div>
                    </div>
                    <div className="content-qr">
                      <QRCodeReact value={`ID: ${data._id}`}></QRCodeReact>
                    </div>
                  </div>
                  <div className='pt-12'>
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Servicio
                          </th>
                          <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Fecha
                          </th>
                          <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 text-center whitespace-nowrap">
                              <h1 className="text-sm text-gray-500">{data.cobradors[0].nombre}</h1>
                          </td>
                          <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500">
                            <h1 className="text-sm text-gray-500">{data.fecha.substr(0,10)}</h1>
                          </td>
                          <td className="px-6 py-4 text-center whitespace-nowrap">
                            <h1 className="text-sm text-indigo-800 font-bold">${data.total}</h1>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="container-espacio">
                </div>
                <div className=" bg-gray-200 p-12">
                  <div className="container-foot">
                    <div className="flex justify-between">
                      <div className="text-xs font-medium text-gray-500 uppercase">Lugar</div>
                      <div className="text-xs font-medium text-gray-500 uppercase">Fecha</div>
                      <div className="text-xs font-medium text-gray-500 uppercase">Total</div>
                    </div>
                    <div className="flex justify-between">
                      <div className="text-xl text-gray-500 font-bold">Machala</div>
                      <div className="text-xl text-gray-500 font-bold">{data.fecha.substr(0,10)}</div>
                      <div className="text-xl text-indigo-900 font-bold">${data.total}</div>
                    </div>
                  </div>
                  <div className="flex justify-between pt-10">
                    <div className="text-xl text-rose-400 font-bold">
                      ¡Gracias!
                    </div>
                    <div className="text-xs flex justify-between">
                      <div>
                        PaguayGo
                      </div>
                      <div className="text-xs pl-4">
                        (07) 2963 880 - (07) 2965 235             
                      </div>
                      <div className="text-xs pl-4">
                        paguaygo@hotmail.com
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </PDFExport>
        </div>
      : 
        <div className="text-xl text-indigo-500 font-bold flex justify-center p-10">
          <h1>Previsualizador...</h1>
        </div>
      }
    </div>
  );
}