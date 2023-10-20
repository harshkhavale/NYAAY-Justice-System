import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DoneIcon from '@mui/icons-material/Done';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { storage } from '../firebase';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { CircularProgress } from '@mui/material';
import toast from 'react-hot-toast';
import { getDownloadURL } from "firebase/storage";

// Configure react-pdf to use the worker from the public folder
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const FileUpload = () => {
  const [documentName, setDocumentName] = useState('');
  const [documentURL, setDocumentURL] = useState('');
  const [isUploaded, setIsUploaded] = useState(false);
  const [previewURL, setPreviewURL] = useState('');
  const [process, setProcess] = useState(false);
  const uploadImage = () => {
    console.log("upload started");
    setProcess(true);
    if (documentURL == null)
        return;
    const imageRef = ref(storage, `images/${documentName + v4()}`);
    uploadBytes(imageRef, documentURL)
        .then(() => {
            return getDownloadURL(imageRef); // Get the download URL after upload
        })
        .then((url) => {
            setDocumentURL(url); // Save the download URL to state
            setProcess(false);
            toast.success('Upload complete');
        })
        .catch((error) => {
            console.error('Error getting download URL:', error);
        });
}


  // Now you can use Firebase features like storage


  const handleFileChange = (e) => {
    console.log('handleFileChange called'); // Add this line

    const file = e.target.files[0];
    console.log("file" + file)
    setDocumentName(file.name);

    // Create a URL for previewing the selected file (PDF or other docs).
    const previewURL = URL.createObjectURL(file);
    setPreviewURL(previewURL);


  };

  return (
    !process ? (<div className="fileupload shadow-md mx-2 my-2">
      <div className=' flex items-center gap-2'>
        <div>
          <p className="text-xs">Document name :</p>
          <input
            type="text"
            placeholder="Enter document name"
            className="border border-slate-500 text-md rounded-md p-1"
            value={documentName}
            onChange={(e) => setDocumentName(e.target.value)}
          />
        </div>
        <div>
          <label className="flex items-center space-x-2 bg-white text-blue-500 border rounded-md p-2 cursor-pointer">
            <CloudUploadIcon />
            <span>Upload File</span>
            <input
              type="file"
              name="document"
              id="document"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>
        <div className="btn">
          <button
            className='text-green-500 border border-slate-200 p-1 rounded-md '
            onClick={uploadImage} // Add this onClick handler
          >
            save <CheckCircleIcon className='text-green-500' />
          </button>
        </div>
      </div>

      {previewURL && (
        <div >
          {documentName.endsWith('.pdf') ? (
            <Document file={previewURL} className={' shadow-lg  m-4 w-min border rounded-sm border-slate-400'}>
              <Page pageNumber={1} width={200} height={200} className={" h-[250px] overflow-hidden"} />
            </Document>
          ) : (
            <img
              src={previewURL}
              alt="Document Preview"
              style={{ width: '200px', height: '200px', objectFit: 'contain' }}
            />
          )}
        </div>
      )}

{documentURL && (
    <div>
        <p>Uploaded Document:</p>
        {documentName.endsWith('.pdf') ? (
            <iframe
                src={documentURL}
                title="Uploaded Document"
                style={{ width: '100%', height: '500px' }} // Adjust the dimensions as needed
            />
        ) : (
            <img
                src={documentURL}
                alt="Uploaded Document Preview"
                style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
            />
        )}
    </div>
)}

    </div>) : (<CircularProgress color="success" />)

  );
};

export default FileUpload;
