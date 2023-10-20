import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Document, Page, pdfjs } from 'react-pdf';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { storage } from '../firebase';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import { CircularProgress } from '@mui/material';
import toast from 'react-hot-toast';
import { getDownloadURL } from 'firebase/storage';
import UploadDialog from './UploadDialog';
import { setDocument } from '../state';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const DocumentUploader = () => {
  const [documentName, setDocumentName] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [accusedName, setAccusedName] = useState('');
  const [caseNumberRecord, setCaseNumberRecord] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogPreviewURL, setDialogPreviewURL] = useState('');
  const currentCase = useSelector((state) => state.currentCase);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const [process, setProcess] = useState(false);
  const openDialog = (previewURL) => {
    setIsDialogOpen(true);
    setDialogPreviewURL(previewURL);
  };

  const handleSave = () => {
    console.log('Updated Selected Files:', selectedFiles);
    uploadSelectedFiles();
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setDialogPreviewURL('');
  };

  const handleDocumentUpload = (documentName) => {
    const lastSelectedFileIndex = selectedFiles.length - 1;

    if (lastSelectedFileIndex >= 0) {
      const updatedSelectedFiles = [...selectedFiles];
      updatedSelectedFiles[lastSelectedFileIndex].DocumentName = documentName;

      setSelectedFiles(updatedSelectedFiles);
      closeDialog();
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'documentName':
        setDocumentName(value);
        break;
      case 'departmentId':
        setDepartmentId(value);
        break;
      case 'accusedName':
        setAccusedName(value);
        break;
      case 'caseNumberRecord':
        setCaseNumberRecord(value);
        break;
      default:
        break;
    }
  };


  const uploadImages = () => {
    setProcess(true);

    console.log(selectedFiles);
    console.log(currentCase);
    const promises = [];
    const uploadedDocuments = [];

    for (const file of selectedFiles) {
      if (file) {
        const imageRef = ref(storage, `images/${file.name + v4()}`);
        const uploadTask = uploadBytes(imageRef, file);

        promises.push(
          uploadTask
            .then(() => getDownloadURL(imageRef))
            .then(async (url) => {
              console.log(`Uploaded file: ${file.name}`);
              const documentData = {
                documentName: file.DocumentName, // Use the documentName from selectedFiles
                documentURL: url,
                caseNumberRecord: currentCase.caseNumberRecord, // Set the case number as needed
              };
              dispatch(setDocument({ document: documentData }));

              uploadedDocuments.push(documentData);
              try {
                const response = await fetch(`http://localhost:5001/api/document`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify(documentData),
                });

                const newDocument = await response.json();

                setProcess(false);
                toast.success('Document has been created successfully!')

                console.log(newDocument);



              } catch (error) {
                console.log(error);
                setProcess(false);

              }

            })
            .catch((error) => {
              console.error(`Error uploading file ${file.name}:`, error);
              setProcess(false);
              return null;

            })
        );
      }
    }

    Promise.all(promises)
      .then((urls) => {
        console.log('All files uploaded successfully:', uploadedDocuments);
        toast.success('Upload complete');
      })
      .catch((error) => {
        console.error('Error uploading files:', error);
        toast.error('Upload unsuccessfull!');

      });
  };


  const handleFileSelect = (event) => {
    const files = event.target.files;
    const newPreviews = [];
    const newPageNumbers = [];

    for (let i = 0; i < files.length; i++) {
      newPreviews.push(URL.createObjectURL(files[i]));

      if (files[i].type === 'application/pdf') {
        pdfjs.getDocument(URL.createObjectURL(files[i]))
          .promise.then((pdf) => {
            newPageNumbers.push(pdf.numPages);
          })
          .catch((error) => {
            console.error('Error getting PDF page count:', error);
          });
      } else {
        newPageNumbers.push(1);
      }
    }

    setSelectedFiles([...selectedFiles, ...files]);
    setPreviews([...previews, ...newPreviews]);
    setPageNumbers([...pageNumbers, ...newPageNumbers]);

    openDialog(newPreviews[newPreviews.length - 1]);
  };

  const uploadSelectedFiles = () => {
    selectedFiles.forEach((file) => {
      const formData = new FormData();
      formData.append('documentName', file.DocumentName);
      formData.append('departmentId', departmentId);
      formData.append('accusedName', accusedName);
      formData.append('caseNumberRecord', caseNumberRecord);
      formData.append('documentFile', file);

      axios
        .post('/upload', formData)
        .then((response) => {
          console.log('Document uploaded:', response.data);
        })
        .catch((error) => {
          console.error('Error uploading document:', error);
        });

      formData.delete('documentFile');
    });
  };

  return (
    !process ? (

      <div className='my-2 relative flex flex-wrap gap-4'>

        {previews.map((preview, index) => (
          <div key={index}>
            {selectedFiles[index].type === 'application/pdf' ? (
              <Document file={preview} className='border border-slate-500 rounded-lg'>
                <Page pageNumber={1} width={200} height={200} className='h-[250px] object-cover overflow-hidden border-slate-500 rounded-lg' />
              </Document>
            ) : (
              <img
                src={preview}
                alt={`Document Preview ${index}`}
                width='200'
                height='200'
                style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                className='border border-slate-500 rounded-lg'
              />
            )}
          </div>
        ))}
        <label className='flex fixed bottom-10 right-0 rounded-2xl shadow-md items-center space-x-2 bg-white text-blue-500 border p-2 cursor-pointer'>
          <NoteAddIcon />
          <span>add File</span>
          <input type='file' onChange={handleFileSelect} multiple name='document' id='document' className='hidden' />
        </label>
        <button className='text-green-500 p-2 fixed bg-white bottom-24 right-0 rounded-2xl shadow-md cursor-pointer z-0 gap-2' onClick={uploadImages}>
          Save All   <CheckCircleIcon />
        </button>
        {isDialogOpen && (
          <UploadDialog previewURL={dialogPreviewURL} onUpload={handleDocumentUpload} onClose={closeDialog} />
        )}
      </div>
    ) : (
      <div className=' h-full w-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50'>
        <CircularProgress color="success" />

      </div>
    )

  );
};

export default DocumentUploader;
