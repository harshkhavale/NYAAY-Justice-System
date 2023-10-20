import React from 'react'
import { sangliPolice } from '../assets';
import { useSelector } from 'react-redux';
const Info = () => {
  const policeStationName = useSelector((state)=>state.user.policeStationName);
  const state = useSelector((state)=>state.user.state);
  const pincode = useSelector((state)=>state.user.pincode);
  const district = useSelector((state)=>state.user.district);
  const departmentId = useSelector((state)=>state.user.departmentId);

  return (
    <div className="depainfo  bg-slate-200 rounded-3xl px-4 text-xs flex justify-center items-center gap-2 ">


    <p className='text-xl font-semibold '>{policeStationName} ,</p>
    <hr className=' bg-black' />

    <p className='text-xl font-semibold text-center bg-gray-50 rounded-md p-1 '>{departmentId} ,</p>

    <p className='text-md font-bold text-xl items-center'>{state} ,</p>
    <br />
    <div className='flex items-center'>
    <div className=''>
        <p>District : </p>

        <p className=' font-semibold px-2'>{district}</p></div>
        <div className=''>

            <p>Pincode :</p>
            <p className=' font-semibold px-2'>{pincode}</p>
        </div>
    </div>
    
    

</div>
  )
}

export default Info
