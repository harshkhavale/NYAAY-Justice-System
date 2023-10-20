import React, { useState } from 'react';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import EditIcon from '@mui/icons-material/Edit';
import FileUpload from '@mui/icons-material/FileUpload';
import Info from '../components/Info';
import FindCase from '../components/FindCase';
import CreateCase from '../components/CreateCase';
import Result from '../components/Result';
import UploadDoc from '../components/UploadDoc';
import { useDispatch, useSelector } from 'react-redux';
import state, { setDocuments } from '../state';

const PoliceDashboard = () => {
    const policeStationName = useSelector((state) => state.user.policeStationName);
    const [activeItem, setActiveItem] = useState('find'); // Initial active item is 'find'
    const dispatch = useDispatch();
    const handleItemClick = (item) => {
        setActiveItem(item);
    };

    // Define components for each sidebar item
    const sidebarItems = [
        { id: 'find', label: 'Find', icon: <ContentPasteSearchIcon />, component: <FindCase /> },
        { id: 'create', label: 'Create', icon: <EditIcon />, component: <CreateCase /> },
        { id: 'edit', label: 'Edit', icon: <SaveAsIcon />, component: <Result /> },
        { id: 'upload', label: 'Upload Documents', icon: <FileUpload />, component: <UploadDoc /> /* Add your upload component here */ },
    ];

    const refresh = () =>{
        dispatch(setDocuments(""));
        console.log("refresh");
    }

    return (
        <>
            <div className="header bg-white text-xs p-2 shadow-md flex justify-between">
                <p className=' text-2xl font-semibold'>Police Department</p>
                <Info />

            </div>
            <div className="policeDashboard grid grid-cols-8 gap-2">
                <div className="sidebar col-span-2 bg-slate-200 h-screen p-2">
                    <ul className=' flex-col'>
                        {sidebarItems.map((item) => (
                            <li
                                key={item.id}
                                className={`flex hover:bg-blue-200  items-center cursor-pointer justify-start gap-4 my-1 bg-white rounded-md p-1 ${activeItem === item.id ? 'bg-blue-200' : ''}`}
                                onClick={() => handleItemClick(item.id)}
                            >
                                {item.icon}
                                <p className='ps-4'>{item.label}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="mainbar col-span-6 flex-col justify-center">
                    {sidebarItems.map((item) => (
                        activeItem === item.id && (
                            <div key={item.id} className="main-content px-4 cursor-pointer" onClick={refresh()}>
                                {item.component} 
                            </div>
                        )
                    ))}
                </div>

            </div>
        </>
    );
};

export default PoliceDashboard;
