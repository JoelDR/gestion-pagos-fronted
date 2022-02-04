import React from 'react';
import './Dashboard.css'
import icono from '../../assets/logo.jpeg'

export default function Dashboard() {
  return(
    <div className='shadow-md bg-white content'>
      <img className='image' src={icono} alt="logo"/>
    </div>
  );
}