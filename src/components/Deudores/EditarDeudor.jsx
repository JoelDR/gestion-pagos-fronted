import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function Formulario({toast}) {
  const APIURL = 'http://localhost:3800/api/deudores/';
  const [deudor, setDeudor] = useState(null);
  let params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(APIURL+params.id).then(res => {
      setDeudor(res.data.deudor[0]);
    });
  }, [APIURL]);

  return(
    <div className="mt-10 sm:mt-0">
      {
        deudor && (
          <Formik
            initialValues={deudor}
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
              axios.put(APIURL+values._id, {
                cedula: values.cedula,
                nombre: values.nombre,
                telefono: values.telefono,
                correo: values.correo
              }).then(res => {
                resetForm();
                toast('Deudor guardado con éxito');
                navigate('/menu/deudores/lista');
              });
            }}
          >
            {({errors, touched}) => (
                <div className="mt-10 sm:mt-0 drop-shadow-md">
            <section className="mb-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Información del deudor
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Registre todos los datos del deudor para registrarlo
              </p>
            </section>
            <Form>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="flex flex-col w-3/4 ml-10">
                    <div className="mb-3">
                      <label
                        htmlFor="cedula"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Cedula
                      </label>
                      <Field
                        type="tel"
                        id="cedula"
                        name="cedula"
                        className={`mt-2 border ${
                          touched.cedula && errors.cedula
                            ? "border-rose-400"
                            : "border-slate-400"
                        } focus:outline-none text-gray-900 text-sm rounded-lg focus:border-indigo-400focus:ring-1 focus:ring-indigo-400 block w-full p-2.5`}
                        placeholder="Cédula"
                      />
                      {touched.cedula && errors.cedula && (
                        <div className="text-rose-500">{errors.cedula}</div>
                      )}
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Nombres y apellidos
                      </label>
                      <Field
                        type="text"
                        name="nombre"
                        id="nombre"
                        className={`mt-2 border ${
                          touched.nombre && errors.nombre
                            ? "border-rose-400"
                            : "border-slate-400"
                        } focus:outline-none text-gray-900 text-sm rounded-lg focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 block w-full p-2.5`}
                      />
                      {touched.nombre && errors.nombre && (
                        <div className="text-rose-500">{errors.nombre}</div>
                      )}
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="email-address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Correo
                      </label>
                      <Field
                        type="email"
                        name="correo"
                        id="correo"
                        className={`mt-2 border ${
                          touched.correo && errors.correo
                            ? "border-rose-400"
                            : "border-slate-400"
                        } focus:outline-none text-gray-900 text-sm rounded-lg focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 block w-full p-2.5`}
                      />
                      {touched.correo && errors.correo && (
                        <div className="text-rose-500">{errors.correo}</div>
                      )}
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="email-address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Teléfono
                      </label>
                      <Field
                        type="tel"
                        name="telefono"
                        id="telefono"
                        className={`mt-2 border ${
                          touched.telefono && errors.telefono
                            ? "border-rose-400"
                            : "border-slate-400"
                        } focus:outline-none text-gray-900 text-sm rounded-lg focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 block w-full p-2.5`}
                      />
                      {touched.telefono && errors.telefono && (
                        <div className="text-rose-500">{errors.telefono}</div>
                      )}
                    </div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Sexo</label>
                    <div role="group" aria-labelledby="my-radio-group">
                      <label className="mr-4">
                        <Field type="radio" name="sexo" value="Masculino" className="w-4 h-4 mr-1 text-indigo-600 bg-indigo-600 focus:outline-none"/>
                        Masculino
                      </label>
                      <label>
                        <Field type="radio" name="sexo" value="Femenino" className="w-4 h-4 border-gray-300 focus:outline-none indeterminate:bg-indigo-600"/>
                        Femenino
                      </label>
                      {touched.sexo && errors.sexo && (
                        <div className="text-rose-500">{errors.sexo}</div>
                      )}
                    </div>
                  </div>
                  <div className="px-4 py-3 mt-3 ml-2 bg-white text-right sm:px-6 flex justify-items-start w-3/4">
                    <button
                      type="submit"
                      className="inline-flex mr-3 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Guardar
                    </button>
                    <Link
                      to="/menu/deudores/lista"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-rose-500 hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400"
                    >
                      Cancelar
                    </Link>
                  </div>
                </div>
              </div>
            </Form>
          </div>
              )
            }
          </Formik>
        )
      }
      
    </div>
  );
}
