import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      setUploadStatus('Please select a file');
      return;
    }

    // You may want to add additional validation for the file format here

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://localhost:8080/products/bulk-create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUploadStatus(`File uploaded successfully. Response: ${JSON.stringify(response.data)}`);
    } catch (error) {
      console.error('File upload failed', error);
      setUploadStatus('File upload failed. Please try again.');
    }
  };

  return (
    <div style={{marginLeft:'20px'}}>
      <h2>Upload Products from File</h2>
      <input type="file" accept=".json" onChange={handleFileChange} />
      <button type="button" onClick={handleFileUpload}>
        Upload
      </button>
      <p>{uploadStatus}</p>
    </div>
  );
};

export default FileUpload;
