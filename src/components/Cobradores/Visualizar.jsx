import React, {Fragment} from "react";

export default function Visualziar({ state, setState, cobrador }) {
  return (
    <>
      {
        state && cobrador &&
          <div className="fixed flex p-8 justify-center h-screen bg-gray-800 bg-opacity-50 top-0 left-0 w-screen">
            <div className="flex flex-col w-2/4 h-2/4 mt-3 bg-white opacity-100 rounded-lg px-8 py-8">
              <header className="flex justify-between mb-4">
                <h3 className="text-lg font-bold text-indigo-600">Información</h3>
                <button 
                  onClick={() => setState(false)} 
                  className="pointer bg-inherit font-bold text-xl text-rose-400 rounded-lg hover:bg-slate-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </header>
              <label className="mb-4"><span className="font-semibold">RUC: </span> { cobrador.ruc }</label>
              <label className="mb-4"><span className="font-semibold">Entidad: </span>{ cobrador.nombre }</label>
              <label className="mb-4"><span className="font-semibold">Servicio: </span>{ cobrador.servicio }</label>
              <label className="mb-4"><span className="font-semibold">Dirección: </span>: { cobrador.direccion }</label>
            </div>
          </div>
      }
    </>
  );
}
