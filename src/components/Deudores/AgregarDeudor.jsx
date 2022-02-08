import React from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function AgregarDeudor() {
  const APIURL = 'http://localhost:3800/api/deudores';

  return(
    <div className="mt-10 sm:mt-0">
      <Formik
        initialValues={{
            cedula: '',
            nombre: '',
            correo: '',
            telefono: ''
        }}
        validate={(valores) => {
          let errores = {};
          if (!valores.nombre) {
            errores.nombre = 'Ingrese un nombre';
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.nombre)) {
            errores.nombre = 'El nombre solo puede contener letras y espacios'
          }

          if (!valores.cedula) {
            errores.cedula = 'Ingrese el número de cédula'  
          } else if(!/^[0-9]{10}$/.test(valores.cedula)) {
            errores.cedula = 'Ingrese una cédula de 10 digitos'
          }

          if (!valores.correo) {
            errores.correo = 'Ingrese un correo'
          } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(valores.correo)) {
            errores.correo = 'El correo ingresado no es válido'
          }

          if (!valores.telefono) {
            errores.telefono = 'Ingrese un número de teléfono'
          } else if(!/^[0-9]{10}$/.test(valores.telefono)){
            errores.telefono = 'Ingrese un número 10 digitos'
          }
          return errores;    
        }}
        onSubmit={(values, {resetForm}) => {
          axios.post(APIURL, {
            cedula: values.cedula,
            nombre: values.nombre,
            telefono: values.telefono,
            correo: values.correo
          }).then(res => console.log(res));
          resetForm();
        }}
      >
        {({errors, touched}) => (
          <div className="mt-10 sm:mt-0">
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Información del deudor</h3>
                  <p className="mt-1 text-sm text-gray-600">Registre todos los datos del deudor para registrarlo</p>
                </div>
              </div>
              <div className="mt-5 md:mt-0 md:col-span-2">
                <Form>
                  <div className="shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 bg-white sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                          <label htmlFor="cedula" className="block text-sm font-medium text-gray-700">
                            Cedula
                          </label>
                          <Field
                            type="tel"
                            id="cedula"
                            name="cedula"
                            className={`mt-2 border ${touched.cedula && errors.cedula? "border-rose-400" :"border-slate-400"} focus:outline-none text-gray-900 text-sm rounded-lg focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 block w-full p-2.5`}
                            placeholder="Cédula"
                            />
                            {touched.cedula && errors.cedula && <div className="text-rose-500">{errors.cedula}</div>}
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                            Nombres y apellidos
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
                            Correo
                          </label>
                          <Field
                            type="email"
                            name="correo"
                            id="correo"
                            className={`mt-2 border ${touched.correo && errors.correo? "border-rose-400" :"border-slate-400"} focus:outline-none text-gray-900 text-sm rounded-lg focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 block w-full p-2.5`}
                          />
                          {touched.correo && errors.correo && <div className="text-rose-500">{errors.correo}</div>}
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                            Teléfono
                          </label>
                          <Field
                            type="tel"
                            name="telefono"
                            id="telefono"
                            className={`mt-2 border ${touched.telefono && errors.telefono? "border-rose-400" :"border-slate-400"} focus:outline-none text-gray-900 text-sm rounded-lg focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 block w-full p-2.5`}
                          />
                          {touched.telefono && errors.telefono && <div className="text-rose-500">{errors.telefono}</div>}
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                      <Link to="/menu/deudores/lista" className="inline-flex mr-3 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-300 hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400">Cancelar</Link>
                      <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Guardar
                      </button>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </div>
          )
        }
      </Formik>
    </div>
  );
}
