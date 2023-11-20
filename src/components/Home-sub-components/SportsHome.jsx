import React from 'react';
import Sidebar from './Sidebar';

export default function SportsHome() {
  const handleActiveItemChange = (activeItem) => {
    console.log('Active Item:', activeItem);
  };

  return (
    <div className=' flex gap-3'>
      <Sidebar activeItem="SportsHome" onActiveItemChange={handleActiveItemChange} />
      <div className=' flex flex-col gap-3 w-full'>
        <div className=' h-28 flex flex-col px-6 items-start justify-center w-full bg-cover all-sports rounded-xl' >
          <p className=' text-gray-700 font-bold text-xl'>ALL</p>
          <p className=' text-gray-950 font-bold text-6xl'>69</p>
        </div>
        <div className=' h-28 flex flex-col px-6 items-start justify-center w-full bg-cover all-sports rounded-xl' >
          <p className=' text-gray-700 font-bold text-xl'>Cricket</p>
          <p className=' text-gray-950 font-bold text-6xl'>69</p>
        </div>
        <div className=' h-28 flex flex-col px-6 items-start justify-center w-full bg-cover all-sports rounded-xl' >
          <p className=' text-gray-700 font-bold text-xl'>Soccer</p>
          <p className=' text-gray-950 font-bold text-6xl'>69</p>
        </div>
        <div className=' h-28 flex flex-col px-6 items-start justify-center w-full bg-cover all-sports rounded-xl' >
          <p className=' text-gray-700 font-bold text-xl'>Tennis</p>
          <p className=' text-gray-950 font-bold text-6xl'>69</p>
        </div>

      </div>
    </div>
  );
}
