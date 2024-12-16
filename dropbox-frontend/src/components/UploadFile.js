import React, { useState } from 'react';
import axios from 'axios';

const UploadFile = ({ onUpload }) => {
  const [file, setFile] = useState(null);

  const handleUpload = async (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile); // Set file in state

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      await axios.post('http://localhost:4000/upload', formData); // Ensure correct backend endpoint
      onUpload(); // Refresh after upload
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleUpload} />
      {file && <p>{file.name} is ready to upload.</p>}
    </div>
  );
};

export default UploadFile;
