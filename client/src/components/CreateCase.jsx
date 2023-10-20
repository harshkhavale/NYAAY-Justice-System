import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { CircularProgress } from '@mui/material';
const CreateCase = () => {
    const [cnr, setCnr] = useState('');
    const [accused, setAccused] = useState('');
    const [date, setDate] = useState();
    const [aadhar, setAadhar] = useState('');
    const [contact, setContact] = useState('');
    const [process, setProcess] = useState(false);
    const token = useSelector((state) => state.token);
    const state = useSelector((state) => state.user.state);
    const district = useSelector((state) => state.user.district);

    const addCase = async () => {
        const msgBody = {
            name: accused,
            date: date,

            status: "Pending",
            aadhar: aadhar,
            contact: contact,
            state: state,
            district: district,
            caseNumberRecord: cnr,
        }
        try {
            setProcess(true);
            const response = await fetch(`http://localhost:5001/api/case`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(msgBody),
            });

            const newcase = await response.json();

            setProcess(false);
            toast.success('Case has been created successfully!')

            console.log(newcase);



        } catch (error) {

        }
    }

    return (
        !process ? (<div className="createcase flex justify-center items-center">

            <div className="form flex flex-col space-y-2 shadow-md p-8 rounded-md">
                <p className='py-4 text-xl font-semibold'>Create New Case</p>
                <div className="caseid grid grid-cols-8 gap-10">
                    <label htmlFor="caseid " className="col-span-2 ">CNR Number</label>
                    <input type="text" placeholder='CNR Number' value={cnr} onChange={(e) => setCnr(e.target.value)} className=' col-span-4 border border-gray-300 rounded-md p-1' />
                </div>
                <div className="name grid grid-cols-8 gap-10">
                    <label htmlFor="name" className="col-span-2 ">Accused Name</label>
                    <input type="text" placeholder='Enter accused name here' value={accused} onChange={(e) => setAccused(e.target.value)} className='col-span-4 border border-gray-300 rounded-md p-1' />
                </div>
                <div className="date grid grid-cols-8 gap-10">
                    <label htmlFor="date" className="col-span-2 ">Date & Time</label>
                    <input type="datetime-local" placeholder='date here' value={date} onChange={(e) => setDate(e.target.value)} className='col-span-4 border border-gray-300 rounded-md p-1' name="" id="" />
                </div>

                <div className="aadhar grid grid-cols-8 gap-10">
                    <label htmlFor="caseid" className="col-span-2 ">Aadhar</label>
                    <input type="text" placeholder='0000-0000-0000' value={aadhar} onChange={(e) => setAadhar(e.target.value)} className='col-span-4 border border-gray-300 rounded-md p-1' />

                </div>
                <div className="contact grid grid-cols-8 gap-10">
                    <label htmlFor="contact" className="col-span-2 ">Contact</label>
                    <input type="text" placeholder='+91 0000000000' value={contact} onChange={(e) => setContact(e.target.value)} className='col-span-4 border border-gray-300 rounded-md p-1' />
                </div>

                <div className="btn">
                    <button className=' bg-slate-400 border rounded-md my-4 py-2 border-slate-500 text-white px-2' onClick={addCase}>
                        <AddIcon />
                        Create Case
                    </button>
                </div>

            </div>
        </div>) : (<CircularProgress color="success" />
        )

    )
}

export default CreateCase
