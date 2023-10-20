import React, { Component } from 'react';
import { Document, Page } from 'react-pdf';

class UploadDialog extends Component {
  state = {
    documentName: '',
    numPages: null,
    pageNumber: 1,
    isDocument: false,
  };

  handleDocumentNameChange = (event) => {
    this.setState({ documentName: event.target.value });
  };

  handleUpload = () => {
    if (this.state.isDocument) {
      // Handle document upload
      this.props.onUpload(this.state.documentName);
    } else {
      // Handle image upload (assuming it's an image)
      // You can modify this part accordingly
      this.props.onUpload(this.state.documentName);
    }
  };

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages, isDocument: true });
  };

  render() {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          {this.state.isDocument ? (
            <Document
              file={this.props.documentFile} // Provide the PDF file
              onLoadSuccess={this.onDocumentLoadSuccess}
            >
              <Page pageNumber={this.state.pageNumber} />
            </Document>
          ) : (
            <img
              src={this.props.previewURL}
              alt="Selected Document Preview"
              className="h-[500px]"
            />
          )}
          {this.state.isDocument && (
            <p>
              Page {this.state.pageNumber} of {this.state.numPages}
            </p>
          )}
          <input
            type="text"
            placeholder="Document Name"
            value={this.state.documentName}
            onChange={this.handleDocumentNameChange}
            className="border rounded p-2 w-full"
          />
          <div className="flex justify-end mt-4">
            <button
              onClick={this.handleUpload}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded"
            >
              Upload
            </button>
            <button
              onClick={this.props.onClose}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default UploadDialog;
