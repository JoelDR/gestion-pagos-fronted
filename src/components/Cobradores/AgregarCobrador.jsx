import React from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import {Link} from 'react-router-dom';

export default function AgregarDeudor() {
  const APIURL = 'http://localhost:3800/api/cobradores';

  return(
    <div className="mt-10 sm:mt-0">
      <Formik
        initialValues={{
            ruc: '',
            nombre: '',
            servicio: '',
            direccion: ''
        }}
        validate={(valores) => {
          let errores = {};
          if (!valores.nombre) {
            errores.nombre = 'Ingrese un nombre';
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.nombre)) {
            errores.nombre = 'El nombre solo puede contener letras y espacios'
          }

          if (!valores.ruc) {
            errores.ruc = 'Ingrese el número de RUC'  
          } else if(!/^[0-9]{13}$/.test(valores.ruc)) {
            errores.ruc = 'Ingrese un RUC válido'
          }

          if (!valores.servicio) {
            errores.servicio = 'Ingrese un servicio'
          } 

          if (!valores.direccion) {
            errores.direccion = 'Ingrese una direccion'
          }

          return errores;    
        }}
        onSubmit={(values, {resetForm}) => {
          axios.post(APIURL, {
            ruc: values.ruc,
            nombre: values.nombre,
            direccion: values.direccion,
            servicio: values.servicio
          }).then(res => console.log(res));
          resetForm();
        }}
      >
        {({errors, touched}) => (
          <div className="w-full min-w-min bg-white">
              <div className="mt-5 md:mt-0 md:col-span-2">
                <Form>
                    <div className="px-4 py-5 bg-white sm:p-6">
            <         h2 className="text-xl font-semibold my-4">Registrar cobrador</h2>
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                          <label htmlFor="ruc" className="block text-sm font-medium text-gray-700">
                            RUC
                          </label>
                          <Field
                            type="tel"
                            id="ruc"
                            name="ruc"
                            className={`mt-2 border ${touched.ruc && errors.ruc? "border-rose-400" :"border-slate-400"} focus:outline-none text-gray-900 text-sm rounded-lg focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 block w-full p-2.5`}
                            placeholder="Número de RUC"
                            />
                            {touched.ruc && errors.ruc && <div className="text-rose-500">{errors.ruc}</div>}
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                            Institución
                          </label>
                          <Field
                            type="text"
                            name="nombre"
                            id="nombre"
                            className={`mt-2 border ${touched.nombre && errors.nombre? "border-rose-400" :"border-slate-400"} focus:outline-none text-gray-900 text-sm rounded-lg focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 block w-full p-2.5`}
                          />
                          {touched.nombre && errors.nombre && <div className="text-rose-500">{errors.nombre}</div>}
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                            Servicio
                          </label>
                          <Field
                            type="text"
                            name="servicio"
                            id="servicio"
                            className={`mt-2 border ${touched.servicio && errors.servicio? "border-rose-400" :"border-slate-400"} focus:outline-none text-gray-900 text-sm rounded-lg focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 block w-full p-2.5`}
                          />
                          {touched.servicio && errors.servicio && <div className="text-rose-500">{errors.servicio}</div>}
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                            Dirección
                          </label>
                          <Field
                            type="tel"
                            name="direccion"
                            id="direccion"
                            className={`mt-2 border ${touched.direccion && errors.direccion? "border-rose-400" :"border-slate-400"} focus:outline-none text-gray-900 text-sm rounded-lg focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 block w-full p-2.5`}
                          />
                          {touched.direccion && errors.direccion && <div className="text-rose-500">{errors.direccion}</div>}
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                      <Link to="/menu/cobradores/lista" className="inline-flex mr-3 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-300 hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400">Cancelar</Link>
                      <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Guardar
                      </button>
                    </div>
                </Form>
              </div>
          </div>
          )
        }
      </Formik>
    </div>
  );
}
