import React from 'react';

export default function Dashboard() {
  return(
    <div>
      <h2 className='text-3xl font-normal mb-6'>Dahboard</h2>
      <div className='grid grid-cols-12 gap-5'>
        <div className='col-span-5 shadow-md h-36 bg-white rounded-lg'>
          Card1
        </div>
        <div className='col-span-7 shadow-md h-36 py-4 px-7 bg-gradient-to-r from-rose-400 to-pink-500 rounded-lg'>
          <h2 className='text-white text-xl'>Total cobrado</h2>
          <h2 className='text-white text-5xl font-semibold'>$2342.50</h2>
        </div>
      </div>
    </div>
  );
}