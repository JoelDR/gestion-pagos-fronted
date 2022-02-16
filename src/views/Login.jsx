import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import NavBar from '../components/Home/NavBar';
import HeroSecion from '../components/Home/HeroSection';
import SectionModules from "../components/Home/SectionModules";
import Footer from "../components/Home/Footer";

const features = [
  {
    name: 'Módulo de deudores',
    description:
      'Agrega y modifica la información de todos tus deudores, podrás ver una información detallada de cada uno.',
  },
  {
    name: 'Módulo de cobradores',
    description:
      'Agrega y modifica la información de todos tus cobradores, podrás ver una información detallada de cada uno.',
  },
  {
    name: 'Módulo de pagos',
    description:
      'Registra los pagos realizados por los deudores a cada una de los cobradores, filtra la información y previsualizala',
  },
  {
    name: 'Reportes',
    description:
      'Genera reportes de los pagos realizados por cada uno de los deudores',
  },
]

export default function Login() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  return (
    <div className="bg-white w-full">
      { !isAuthenticated? (
        <div className="w-full">
          <NavBar login={loginWithRedirect}/>
          <HeroSecion/>
          <div id="beneficios" className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="lg:text-center">
                <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Beneficios</h2>
                <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                  Mejora la gestión de tus cobranzas
                </p>
                <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                  Utiliza nuestro módulos para administrar correctamente tus cobros, registrando tus deudores. Además genera reportes de los cobros realizados.
                </p>
              </div>

              <div className="mt-10">
                <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                  {features.map((feature) => (
                    <div key={feature.name} className="relative">
                      <dt>
                        <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                        </div>
                        <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                      </dt>
                      <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
          <SectionModules/>
          <section id="nosotros" className="bg-white w-full p-12 my-10 divide-y-4 divide-slate-400/25">
            <div className="w-/34">
              <h3 className="text-gray-800 font-bold text-3xl text-center">Nosotros</h3>
              <p className="w-3/4 text-base text-gray-700 my-4 text-center m-auto">Somos una empresa orientada a la gestión de cobranzas, contamos con un sistema de pagos ágil, rápido y seguro brindando al cliente la mayor facilidades para su servicio</p>
            </div>
            <div className="w-3/4 m-auto">
              <img 
                src="https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" 
                alt="" 
                className="rounded-lg"
              />
            </div>
          </section>
          <Footer/>
        </div>
      )
      : 
        <Navigate to="/menu/dashboard"></Navigate>
      }
    </div>
  );
}
