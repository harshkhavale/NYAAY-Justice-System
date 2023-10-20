import React from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DocumentGallery from './DocumentList';

const Result = ({ caseData,docData }) => {
  return (
    <>{
    caseData && (
      <div className="result text-sm shadow-md flex items-center justify-between rounded-md px-2">

        <div className="cnr">
          <p className='text-xs'>CNR : </p>
          <p className=' text-blue-500 text-xl'>{caseData.caseNumberRecord}</p>
        </div>
        <div className="date">
          <p className='text-xs'>Date : </p>
          <p>{caseData.createdAt}</p>
        </div>
        <div className="status">
          <p className='text-xs'>Status : </p>
          <p>{caseData.status == "pending"?(<p className='text-red-500'>{caseData.status}</p>):(<p className='text-green-500'>{caseData.status}</p>)}</p>
        </div>
        <div className="accused">
          <p className='text-xs'>Accused : </p>
          <p>{caseData.name}</p>
        </div>

        <div className="edit">
          <button className=' bg-slate-400 border rounded-md my-4  border-slate-500 text-white p-1'>Edit <EditIcon /> </button>
        </div>
      </div>
    )
   
    }{
      docData && (
        <>
        <DocumentGallery data={docData} />
        </>
        )
    }

    </>

  )
}

export default Result
