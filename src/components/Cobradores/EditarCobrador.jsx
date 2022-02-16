import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function AgregarDeudor({toast}) {
  const APIURL = "http://localhost:3800/api/cobradores/";
  const [cobrador, setCobrador] = useState(null);
  let params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(APIURL + params.id).then((res) => {
      setCobrador(res.data.cobrador[0]);
    });
  }, [APIURL]);

  return (
    <div className="mt-10 sm:mt-0">
      {cobrador && (
        <Formik
          initialValues={cobrador}
          validate={(valores) => {
            let errores = {};
            if (!valores.nombre) {
              errores.nombre = "Ingrese un nombre";
            } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.nombre)) {
              errores.nombre = "El nombre solo puede contener letras y espacios";
            }

            if (!valores.ruc) {
              errores.ruc = "Ingrese el número de RUC";
            } else if (!/^[0-9]{13}$/.test(valores.ruc)) {
              errores.ruc = "Ingrese un RUC válido";
            }

            if (!valores.servicio) {
              errores.servicio = "Ingrese un servicio";
            }

            if (!valores.direccion) {
              errores.direccion = "Ingrese una direccion";
            }

            return errores;
          }}
          onSubmit={(values, { resetForm }) => {
            axios.put(APIURL + values._id, {
              ruc: values.ruc,
              nombre: values.nombre,
              direccion: values.direccion,
              servicio: values.servicio,
            });
            resetForm();
            toast('Cobrador guardado con éxito');
            navigate('/menu/cobradores/lista');
          }}
        >
          {({ errors, touched }) => (
            <div className="w-full min-w-min drop-shadow-md mt-10 sm:mt-0">
              <section className="mb-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Información del cobrador
                </h3>
                <p className="mt-1 text-base text-gray-600">
                  Registre todos los datos del cobrador
                </p>
              </section>
              <Form>
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="flex flex-col w-3/4 ml-10">
                    <div className="mb-3">
                      <label
                        htmlFor="ruc"
                        className="block text-sm font-medium text-gray-700"
                      >
                        RUC
                      </label>
                      <Field
                        type="tel"
                        id="ruc"
                        name="ruc"
                        className={`mt-2 border ${
                          touched.ruc && errors.ruc? "border-rose-400" : "border-slate-400"
                        } focus:outline-none text-gray-900 text-sm rounded-lg focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 block w-full p-2.5`}
                        placeholder="Número de RUC"
                      />
                      {touched.ruc && errors.ruc && (<div className="text-rose-500">{errors.ruc}</div>)}
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Institución
                      </label>
                      <Field
                        type="text"
                        name="nombre"
                        id="nombre"
                        className={`mt-2 border ${
                          touched.nombre && errors.nombre? "border-rose-400" : "border-slate-400"
                        } focus:outline-none text-gray-900 text-sm rounded-lg focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 block w-full p-2.5`}
                      />
                      {touched.nombre && errors.nombre && (<div className="text-rose-500">{errors.nombre}</div>)}
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="email-address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Servicio
                      </label>
                      <Field
                        type="text"
                        name="servicio"
                        id="servicio"
                        className={`mt-2 border ${
                          touched.servicio && errors.servicio? "border-rose-400" : "border-slate-400"
                        } focus:outline-none text-gray-900 text-sm rounded-lg focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 block w-full p-2.5`}
                      />
                      {touched.servicio && errors.servicio && (
                        <div className="text-rose-500">{errors.servicio}</div>
                      )}
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="email-address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Dirección
                      </label>
                      <Field
                        type="tel"
                        name="direccion"
                        id="direccion"
                        className={`mt-2 border ${
                          touched.direccion && errors.direccion? "border-rose-400" : "border-slate-400"
                        } focus:outline-none text-gray-900 text-sm rounded-lg focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 block w-full p-2.5`}
                      />
                      {touched.direccion && errors.direccion && (
                        <div className="text-rose-500">
                          {errors.direccion}
                        </div>
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
                      to="/menu/cobradores/lista"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-rose-500 hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400"
                    >
                      Cancelar
                    </Link>
                  </div>
                </div>
              </Form>
            </div>
          )}
        </Formik>
      )}
    </div>
  );
}
