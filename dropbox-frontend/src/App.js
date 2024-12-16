import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';  // Make sure you have axios installed for API calls

// Define a simple FileList component
const FileList = ({ files }) => {
  return (
    <div>
      <h2>Your Files</h2>
      <ul>
        {files.map((file, index) => (
          <li key={index}>
            <a href={`http://localhost:4000/files/${file.name}`} target="_blank" rel="noopener noreferrer">
              {file.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const App = () => {
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    // Fetch list of files from backend on component mount
    axios.get('http://localhost:4000/files')
      .then((response) => {
        setFiles(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching files:', error);
      });
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = () => {
    const formData = new FormData();
    formData.append('file', file);

    axios.post('http://localhost:4000/upload', formData)
      .then((response) => {
        setFiles([...files, response.data]); // Assuming backend returns new file data
        setFile(null); // Reset file input
      })
      .catch((error) => {
        console.error('There was an error uploading the file:', error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Dropbox Clone</h1>

        {/* File upload form */}
        <div>
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleFileUpload}>Upload File</button>
        </div>

        {/* Display the list of files */}
        <FileList files={files} />
      </header>
    </div>
  );
}

export default App;
