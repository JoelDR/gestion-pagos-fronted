import React from 'react';
import './Loader.css';

export default function LoaderTable () {
  return(
    // <div className="min-w-full shadow rounded-md p-4 max-w-sm w-full mx-auto bg-white">
    //   <div className="animate-pulse">
    //     <div className="h-4 bg-gray-200 mt-3 mb-6 rounded"></div>
    //     <div className="h-4 bg-gray-300 mb-6 rounded"></div>
    //     <div className="h-4 bg-gray-200 mb-6 rounded"></div>
    //     <div className="h-4 bg-gray-300 mb-6 rounded"></div>
    //     <div className="h-4 bg-gray-200 mb-6 rounded"></div>
    //   </div>      
    // </div>
    <div className="min-w-full p-4 max-w-sm w-full min-h-min flex flex-col content-center">
      <div className="m-auto">
        <div className="lds-dual-ring"></div>
        <p className="text-indigo-400 text-xl">Cargando...</p>
      </div>
    </div>
  );
}
