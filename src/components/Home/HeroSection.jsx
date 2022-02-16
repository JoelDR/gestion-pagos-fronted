import React from 'react';

export default function HeroeSection() {
  return(
    <>
      <main className={`mx-auto w-full h-screen flex bg-[url('./assets/backgroundHome.png')] justify-center bg-no-repeat bg-center bg-cover`}>
        <div className="flex flex-col justify-center items-center sm:text-center w-full">
          <h1 className="text-4xl tracking-tight font-extrabold text-center text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block text-white">Gestión de cobranzas</span>
            <span className="text-indigo-500">PaguayGO</span>
          </h1>
          <p className="mt-3 text-base text-center text-slate-100 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
            Gestiona tus cobranzas de forma fácil, ágil y segura
          </p>
        </div>
      </main>
    </>
  );
}