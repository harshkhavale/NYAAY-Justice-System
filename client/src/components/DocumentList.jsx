import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import PdfPreview from './pdfPreview';
import { useSelector } from 'react-redux';

const DocumentGallery = ({ data }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [allDocuments,setAllDocuments] = useState();
  const documents = useSelector((state) => state.documents);
  const getFileExtension = (documentURL) => {
    const parts = documentURL.split('.');
    return parts[parts.length - 1].toLowerCase();
  };
  useEffect(() => {
    setAllDocuments(documents);
  }, [documents]);
  return (

    documents && (<div className="document-gallery">
      <p className=' p-2'>Available Documents</p>

      <ul className="flex gap-2 flex-wrap">
        {allDocuments?.map((document, docIndex) => {
          const fileExtension = getFileExtension(document.documentURL);

          return (
            <li key={docIndex} className="shadow-lg rounded-md p-1">
              {fileExtension.includes('pdf') ? (
                <div>
                  <PdfPreview pdfUrl={document.documentURL} />

                  <p className="text-center p-1">{document.documentName}</p>
                </div>
              ) : (
                <div>
                  <img
                    src={document.documentURL}
                    alt={document.documentName}
                    className="image-preview rounded-md"
                    width="200"
                    height="200"
                    style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                  />
                  <p className="text-center p-1">{document.documentName}</p>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>)


  );

};
export default DocumentGallery;
