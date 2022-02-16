import React from "react";
import deudores from '../../assets/deudores.png'
import pagos from '../../assets/pagos.png'

export default function SectionModules() {
  return(
    <>
      <section id="seccion-modulos" className="grid grid-cols-6 gap-4 bg-indigo-900 p-12 mb-4">
        <article className="col-span-2 flex flex-col justify-center">
          <h3 className="text-white text-3xl font-bold mb-4">Módulo Deudores</h3>
          <p className="text-lg text-white">Organiza y lista todos tus deudores utilizando este módulo, también ingresa nuevos deudores o modifica la información de cada uno</p>
        </article>
        <div className="col-span-4 rounded-lg">
          <img 
            src={deudores} 
            alt="Módulo de deudores" 
            className="rounded-lg"
          />
        </div>
      </section>

      <section className="grid grid-cols-6 gap-4 bg-white p-12 mt-12">
        <div className="col-span-4 rounded-lg bg-white">
          <img 
            src={pagos} 
            alt="Módulo de deudores" 
            className="rounded-lg"
          />
        </div>
        <article className="col-span-2 flex flex-col justify-center">
          <h3 className="text-indigo text-3xl font-bold mb-4">Módulo Pagos</h3>
          <p className="text-lg text-gray-700">Lista todos los pagos realizados por tus deudores, ingresa nuevos pagos en pocos pasos.</p>
        </article>
      </section>
    </>
  );
}