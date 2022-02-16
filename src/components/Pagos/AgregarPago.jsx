import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ModalDeudores from "./Modal/ModalDeudores";
import ModalCobradores from "./Modal/ModalCobradores";

export default function AgregarPago({ toast }) {
  const APIURL = "http://localhost:3800/api/";
  const [showModalDeudores, setShowModalDeudores] = useState(false);
  const [showModalCobradores, setShowModalCobradores] = useState(false);
  const [cobradorSelect, setCobradorSelect] = useState(null);
  const [deudorSelect, setDeudorSelect] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="mt-10 sm:mt-0">
      <Formik
        enableReinitialize={true}
        initialValues={{
          deudor: "",
          cobrador: "",
          fecha: "",
          total: "",
        }}
        validate={(valores) => {
          let errores = {};
          let currentDate = new Date().toJSON().slice(0, 10).replace(/-/g, "-");

          if (!valores.deudor) {
            errores.deudor = "Ingrese un deudor";
          }

          if (!valores.cobrador) {
            errores.cobrador = "Ingrese un cobrador";
          }

          if (valores.fecha === "") {
            errores.fecha = "Ingrese una fecha";
          } else if (valores.fecha < currentDate) {
            errores.fecha = "Ingrese una fecha mayor a la actual";
          }

          if (!valores.total) {
            errores.total = "Ingrese el valor ";
          } else if (!/^[0-9]+$/.test(valores.total)) {
            errores.total = "Ingrese un valor válido";
          } else if (valores.total <= "0") {
            errores.total = "La cantidad debe ser mayor a cero";
          }

          return errores;
        }}
        onSubmit={(values, { resetForm }) => {
          axios
            .post(`${APIURL}pagos`, {
              deudor: values.deudor,
              cobrador: values.cobrador,
              total: values.total,
              fecha: values.fecha,
            })
            .then((res) => console.log(res));
          resetForm();
          toast('Deudor guardado con éxito')
          navigate('/menu/pagos/lista');
        }}
      >
        {({ errors, touched, values }) => (
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
                    <div className="">
                      <label
                        htmlFor="Deudor"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Deudor
                      </label>
                      <Field
                        type="text"
                        id="deudor"
                        name="deudor"
                        value={
                          deudorSelect !== null
                            ? ((values.deudor = deudorSelect._id), deudorSelect.nombre)
                            : ""
                        }
                        onKeyPress={(event) => {
                          // eslint-disable-next-line no-unused-expressions
                          event.key === "Enter"
                            ? setShowModalDeudores(true)
                            : "";
                        }}
                        className={`mt-2 border ${
                          touched.deudor && errors.deudor
                            ? "border-rose-400"
                            : "border-slate-400"
                        } focus:outline-none text-gray-900 text-sm rounded-lg focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 block w-full p-2.5`}
                        placeholder="Presione Enter"
                      />
                      {touched.deudor && errors.deudor && (
                        <div className="text-rose-500">{errors.deudor}</div>
                      )}
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="cobrador"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Cobrador
                      </label>
                      <Field
                        type="text"
                        name="cobrador"
                        id="cobrador"
                        placeholder="Presione Enter"
                        value={
                          cobradorSelect !== null
                            ? ((values.cobrador = cobradorSelect._id), cobradorSelect.nombre)
                            : ""
                        }
                        onKeyPress={(event) => {
                          // eslint-disable-next-line no-unused-expressions
                          event.key === "Enter"
                            ? setShowModalCobradores(true)
                            : "";
                        }}
                        className={`mt-2 border ${
                          touched.cobrador && errors.cobrador
                            ? "border-rose-400"
                            : "border-slate-400"
                        } focus:outline-none text-gray-900 text-sm rounded-lg focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 block w-full p-2.5`}
                      />
                      {touched.cobrador && errors.cobrador && (
                        <div className="text-rose-500 mb-3">
                          {errors.cobrador}
                        </div>
                      )}
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="date"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Fecha del pago
                      </label>
                      <div className="flex flex-wrap items-center">
                        <div className="relative">
                          <div className="flex absolute inset-y-1 left-0 items-center pl-3 pointer-events-none">
                            <svg
                              className="w-5 h-5 text-gray-500 dark:text-gray-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </div>
                        </div>
                        <Field
                          type="date"
                          name="fecha"
                          id="fecha"
                          className={`mt-2 border ${
                            touched.fecha && errors.fecha
                              ? "border-rose-400"
                              : "border-slate-400"
                          } focus:outline-none text-gray-900 text-sm rounded-lg focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 block w-full p-2.5 pl-10`}
                          placeholder="Seleccione la fecha"
                        />
                        {touched.fecha && errors.fecha && (
                          <div className="text-rose-500">
                            {errors.fecha}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="total"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Valor
                      </label>
                      <div className="mt-2 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-5 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">
                            $
                          </span>
                        </div>
                        <Field
                          type="tel"
                          name="total"
                          id="total"
                          placeholder="0.00"
                          className={`mt-2 border ${
                            touched.total && errors.total
                              ? "border-rose-400"
                              : "border-slate-400"
                          } focus:outline-none text-gray-900 text-sm rounded-lg focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 block w-full pt-2.5 pb-2.5 pl-7 pr-12`}
                        />
                      </div>
                      {touched.total && errors.total && (
                        <div className="text-rose-500">{errors.total}</div>
                      )}
                    </div>
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
                    to="/menu/pagos/lista"
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
      <ModalDeudores 
        state={showModalDeudores} 
        setState={setShowModalDeudores} 
        setDeudor={setDeudorSelect}
      />
      <ModalCobradores 
        state={showModalCobradores} 
        setState={setShowModalCobradores} 
        setCobrador={setCobradorSelect}
      />
    </div>
  );
}
