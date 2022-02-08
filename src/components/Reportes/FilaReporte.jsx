import React from "react";

export default function FilaReportes({data, setReporte}) {
  let { deudors, cobradors, total, fecha } = data;

  return (
    <div className="pb-2">
      <div className="flex justify-between">
        <h1 className="text-sm text-indigo-600 font-bold">{cobradors[0].nombre}</h1>
        <div className="text-sm text-gray-900 flex">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" viewBox="0 0 20 20" fill="gray">
            <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
          </svg>
          <h1 className="text-sm text-gray-500 font-bold inline">{total}</h1>
        </div>
      </div>
      <label className="text-sm text-gray-500 font-semibold">{deudors[0].nombre}</label>
      <div className="text-sm text-gray-900 flex justify-between">
        <div className="flex">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" viewBox="0 0 20 20" fill="gray">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
          <div className="text-sm text-gray-500 font-semibold inline">{fecha.substr(0,10)}</div>
        </div>
        <div>
          <span className="px-2 inline-flex text-sm font-bold rounded-full bg-green-100 text-green-800">
            <button className="text-indigo-600 hover:text-indigo-900 font-bold" onClick={()=>{setReporte(data)}}>Ver</button>
          </span>
        </div>
      </div>
    </div>
  )
}