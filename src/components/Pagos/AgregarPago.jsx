import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import { Link } from "react-router-dom";
import FilaDeudores from "./Config/FilaDeudores";
import FilaCobradores from "./Config/FilaCobradores";
import LoaderTable from "../Loader/LoaderTable";
import Message from "../Loader/Message";

export default function AgregarPago() {
  const APIURL = "http://localhost:3800/api/";
  const [showModal, setShowModal] = useState(false);
  const [deudores, setDeudores] = useState(null);
  const [cobradores, setCobradores] = useState(null);
  const [search, setSearch] = useState("");
  const [loader, setLoder] = useState(true);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState("");
  const [cobrador, setCobrador] = useState(null);
  const [deudor, setDeudor] = useState(null);

  const filtrarDeudores = () => {
    if (search.length === 0) {
      return deudores;
    }
    const filtro = deudores.filter((deudor) => deudor.nombre.includes(search));
    return filtro;
  };

  const onSearchChange = ({ target }) => {
    setSearch(target.value);
  };

  const getDeudores = (state, idenficadorAPI) => {
    setShowModal(state);
    setTitle("Deudor");
    setCobradores(null);
    // eslint-disable-next-line no-unused-expressions
    if (state === true) {
      axios
        .get(`${APIURL}${idenficadorAPI}`)
        .then((res) => {
          setDeudores(res.data.deudores);

          setError(null);
          setLoder(false);
        })
        .catch((err) => {
          setDeudores(null);
          setError(err);
          setLoder(false);
        });
    }
  };

  const filtrarcobradores = () => {
    if (search.length === 0) {
      return cobradores;
    }
    const filtro = cobradores.filter((cobrador) =>
      cobrador.nombre.includes(search)
    );
    return filtro;
  };

  const getCobradores = (state, idenficadorAPI) => {
    setShowModal(state);
    setTitle("Cobrador");
    setDeudores(null);
    // eslint-disable-next-line no-unused-expressions
    if (state === true) {
      axios
        .get(`${APIURL}${idenficadorAPI}`)
        .then((res) => {
          setCobradores(res.data.cobrador);
          setError(null);
          setLoder(false);
        })
        .catch((err) => {
          setDeudores(null);
          setError(err);
          setLoder(false);
        });
    }
  };

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
          setCobrador(null);
          setDeudor(null);
        }}
      >
        {({ errors, touched, values }) => (
          <div className="mt-10 sm:mt-0">
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Información del pago
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Registre todos los datos del pago para registrarlo
                  </p>
                </div>
              </div>
              <div className="mt-5 md:mt-0 md:col-span-2">
                <Form>
                  <div className="shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 bg-white sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
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
                              deudor !== null
                                ? ((values.deudor = deudor._id), deudor.nombre)
                                : ""
                            }
                            onKeyPress={(event) => {
                              // eslint-disable-next-line no-unused-expressions
                              event.key === "Enter"
                                ? getDeudores(true, "deudores")
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
                        <div className="col-span-6 sm:col-span-3">
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
                              cobrador !== null
                                ? ((values.cobrador = cobrador._id),
                                  cobrador.nombre)
                                : ""
                            }
                            onKeyPress={(event) => {
                              // eslint-disable-next-line no-unused-expressions
                              event.key === "Enter"
                                ? getCobradores(true, "cobradores")
                                : "";
                            }}
                            className={`mt-2 border ${
                              touched.cobrador && errors.cobrador
                                ? "border-rose-400"
                                : "border-slate-400"
                            } focus:outline-none text-gray-900 text-sm rounded-lg focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 block w-full p-2.5`}
                          />
                          {touched.cobrador && errors.cobrador && (
                            <div className="text-rose-500">
                              {errors.cobrador}
                            </div>
                          )}
                        </div>
                        <div className="col-span-6 sm:col-span-3">
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
                        <div className="col-span-6 sm:col-span-3">
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
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                      <Link
                        to="/menu/pagos/lista"
                        className="inline-flex mr-3 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-300 hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400"
                      >
                        Cancelar
                      </Link>
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
        )}
      </Formik>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3x2">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Seleccionar {title}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    {loader && <LoaderTable />}
                    {error && <Message />}
                    {deudores && (
                      <div className="p-4">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Cedula
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Nombres y Apellidos
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                correo
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                telefono
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Acciones
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {deudores.length > 0 ? (
                              filtrarDeudores().map((deudor) => (
                                <FilaDeudores
                                  key={deudor._id}
                                  data={deudor}
                                  getDeudor={setDeudor}
                                  getStateModal={setShowModal}
                                />
                              ))
                            ) : (
                              <tr>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  No hay datos
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                        <nav
                          aria-label="Page navigation"
                          className="mt-7 flex flex-col items-center"
                        >
                          <div className="flex flex-col items-center">
                            <span className="text-sm text-gray-700">
                              Mostrando{" "}
                              <span className="font-semibold text-gray-900">
                                1
                              </span>{" "}
                              to{" "}
                              <span className="font-semibold text-gray-900">
                                5
                              </span>{" "}
                              de{" "}
                              <span className="font-semibold text-gray-900">
                                {deudores.length}
                              </span>{" "}
                              Entradas
                            </span>
                            <div className="inline-flex mt-2 xs:mt-0">
                              <button className="py-2 px-4 text-sm font-medium text-white bg-indigo-600 rounded-l hover:bg-indigo-700 focus:outline-none">
                                Anterior
                              </button>
                              <button className="py-2 px-4 text-sm font-medium text-white bg-indigo-600 rounded-r border-0 border-l border-gray-700 hover:bg-indigo-700">
                                Siguiente
                              </button>
                            </div>
                          </div>
                        </nav>
                      </div>
                    )}
                    {cobradores && (
                      <div className="p-4">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                RUC
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Entidad
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Servicio
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Direccion
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Acciones
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {cobradores.length > 0 ? (
                              filtrarcobradores().map((cobrador) => (
                                <FilaCobradores
                                  key={cobrador._id}
                                  data={cobrador}
                                  getCobrador={setCobrador}
                                  getStateModal={setShowModal}
                                />
                              ))
                            ) : (
                              <tr>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  No hay datos
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                        <nav
                          aria-label="Page navigation"
                          className="mt-7 flex flex-col items-center"
                        >
                          <div className="flex flex-col items-center">
                            <span className="text-sm text-gray-700">
                              Mostrando{" "}
                              <span className="font-semibold text-gray-900">
                                1
                              </span>{" "}
                              to{" "}
                              <span className="font-semibold text-gray-900">
                                5
                              </span>{" "}
                              de{" "}
                              <span className="font-semibold text-gray-900">
                                {cobradores.length}
                              </span>{" "}
                              Entradas
                            </span>
                            <div className="inline-flex mt-2 xs:mt-0">
                              <button className="py-2 px-4 text-sm font-medium text-white bg-indigo-600 rounded-l hover:bg-indigo-700 focus:outline-none">
                                Anterior
                              </button>
                              <button className="py-2 px-4 text-sm font-medium text-white bg-indigo-600 rounded-r border-0 border-l border-gray-700 hover:bg-indigo-700">
                                Siguiente
                              </button>
                            </div>
                          </div>
                        </nav>{" "}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Cerrar
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
}
