import React from 'react';
import {Link } from "react-router-dom";
export default function PageNotFound() {
  return(
    <div className='h-screen max-h-full flex flex-col justify-center items center'>
      <div className='m-auto text-center'>
        <p className='text-indigo-600 font-bold text-lg'>ERROR 404</p>
        <h2 className='text-5xl font-bold mb-3'>Página no encontrada</h2>
        <p className='text-base mb-4'>Perdón no pudimos encontrar la página que desea ver</p>
        <Link to='/' className='text-white text-base py-2 px-3 bg-indigo-600 rounded-lg'>Página principal</Link>
      </div>
    </div>
  );
}
