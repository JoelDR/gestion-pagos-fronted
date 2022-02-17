import React, {useState, useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import {useAuth0} from '@auth0/auth0-react';
import axios from 'axios';
import './Dashboard.css'

const tableHead = [
  {
    id: 1,
    name: 'Deudor'
  },
  {
    id: 2,
    name: 'Cobrador'
  }, 
  {
    id: 3,
    name: 'Fecha'
  }, 
  {
    id: 4,
    name: 'Total'
  }
];

const getDateNow = ()=> {
  let date = new Date();
  return date.getFullYear() + '-0' + (date.getMonth()+1) + '-' + date.getDate()
}

export default function Dashboard() {

  const APIULR= 'https://paguaygo.herokuapp.com/api/pagosfull';
  const [todayPayments, setTodayPayments] = useState(null);
  const { user } = useAuth0();

  const filterPayments = () => {
    return todayPayments.slice(0,5);
  }
  useEffect(() => {
      axios.get(APIULR).then(response => {
        let filterPayment = response.data.pagosfull.filter(
          payment => payment.fecha.substr(0,10) === getDateNow()
        );
        setTodayPayments(filterPayment);
      });
  }, [APIULR]);

  return(
    <div className=' content rounded-lg'>
      <section className='px-2 py-2 grid grid-cols-4 gap-4 grid-rows-3'>
        <NavLink  to="/menu/deudores/nuevo" className='col-span-1 w-full bg-gradient-to-r from-indigo-700 to-indigo-400 h-36 text-white rounded-lg flex flex-col text-center justify-center shadow-md transition delay-75 duration-75 ease-in-out hover:-translate-y-1 hover:scale-105 h-full'>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 inline mx-auto" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          <p className='text-white font-semibold text-xl'>Deudor</p>
        </NavLink>
        <NavLink to="/menu/cobradores/nuevo" className='col-span-1 w-full bg-gradient-to-r from-rose-500 via-rose-400 to-pink-500 h-36 text-white rounded-lg flex flex-col text-center justify-center shadow-md transition delay-75 duration-75 ease-in-out hover:-translate-y-1 hover:scale-105 h-full'>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 inline mx-auto" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          <p className='text-white font-semibold text-xl'>Cobrador</p>
        </NavLink>
        <NavLink  to="/menu/pagos/nuevo" className='col-span-1 w-full bg-gradient-to-r from-cyan-500 to-blue-500 h-36 text-white rounded-lg flex flex-col text-center justify-center shadow-md transition delay-75 duration-75 ease-in-out hover:-translate-y-1 hover:scale-105 h-full'>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 inline mx-auto" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          <p className='text-white font-semibold text-xl m-0 p-0'>Pagos</p>
        </NavLink>
        <div className='col-span-1 row-span-3 flex flex-col bg-white w-full rounded-lg shadow-md p-5'>
          <h3 className='font-bold text-center text-xl text-indigo-600'>Perfil</h3>
          <img 
            src={user.picture} 
            alt={user.name} 
            className='rounded-full mx-auto my-4 h-40'
          />
          <p className='text-center font-semibold'>{user.name}</p>
          <label className='font-semibold text-center text-base text-indigo-600 my-2'>Información</label>
          <label className='font-semibold'>Nickname:</label>          
          <label className='mb-2'>{user.nickname}</label>          
          <label className='mt-2 font-semibold'>Correo:</label>      
          <label className=''>{user.email}</label>      
        </div>
        {
          todayPayments && 
          <section className='col-span-3 shadow-md bg-white row-span-2'>
            <h3 className='text-center font-bold text-indigo-600 text-2xl my-4'>Pagos recientes</h3>
            <table className='bg-white w-full'>
              <thead className='bg-gray-50'>
                <tr>{tableHead.map(head => 
                  <th 
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider' key={head.id}
                  >{head.name}</th>
                )}
                </tr>
              </thead>
              <tbody>
              {
                todayPayments.length > 0 ? filterPayments().map(payment => (
                  <tr key={payment._id}>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      {payment.deudors[0].nombre}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      {payment.cobradors[0].nombre}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      {payment.fecha.substr(0,10)}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      {payment.total}
                    </td>
                  </tr>
                ))
                : (<tr>
                    <td colSpan="4" className='px-6 py-4 whitespace-nowrap text-center'>No hay pagos recientes</td>
                  </tr>)
              }
              </tbody>
            </table>
          </section>
        }
      </section>
    </div>
  );
}