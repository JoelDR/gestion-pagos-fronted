import React from 'react';
import {Outlet, Link } from "react-router-dom";
import icono from '../../assets/Logotipoiconomorado.png'
import './Sidebar.css'

export default function Sidebar() {
  return(
    <div className='grid grid-cols-12 h-screen'>
      <div className='bg-[#313559] col-span-2 flex flex-col content-center'>
        <div className='flex justify-start p-10'>
          <img className='imagen' src={icono} alt="" />
          <div>
            <h2 className='text-white text-2xl text-center my-6'><strong>PaguayGo</strong></h2>
          </div>
        </div>
        <ul className='flex flex-col justify-center text-center content-center'>
          <Link to="/menu/dashboard" className='py-3 pl-7 hover:bg-rose-400 text-white text-left ml-7 rounded-l-full focus:bg-rose-400'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-3" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg> 
            Dasboard
          </Link>
          <Link to="/menu/deudores/lista" className='py-3 pl-7 hover:bg-rose-400 text-white text-left ml-7 rounded-l-full focus:bg-rose-400'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-3" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
            Deudores
          </Link>
          <Link to="/menu/cobradores/lista" className='py-3 pl-7 hover:bg-rose-400 text-white text-left ml-7 rounded-l-full focus:bg-rose-400'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-3" viewBox="0 0 20 20" fill="currentColor">
              <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
              <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
            </svg>
            Cobradores
          </Link>
          <Link to="/menu/pagos/lista" className='py-3 pl-7 hover:bg-rose-400 text-white text-left ml-7 rounded-l-full focus:bg-rose-400'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-3" viewBox="0 0 20 20" fill="currentColor">
              <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
              <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
            </svg>
            Pagos
          </Link>
          <Link to="/menu/reportes/lista" className='py-3 pl-7 hover:bg-rose-400 text-white text-left ml-7 rounded-l-full focus:bg-rose-400'>
            <svg xmlns="
            http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-3" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v7a1 1 0 102 0V8z" clipRule="evenodd" />
            </svg>
            Reportes
          </Link>
        </ul>
      </div>
      <div className='bg-slate-100 col-span-10 p-10'>
        <Outlet/>
      </div>
    </div>
  );
}
