import React, { useEffect } from 'react';
import FileList from '../components/FileList';
import UploadFile from '../components/UploadFile';
import useFileStore from '../context/fileContext';

const HomePage = () => {
  const { files, fetchFiles } = useFileStore();

  useEffect(() => {
    fetchFiles(); // Fetch files on page load
  }, [fetchFiles]);

  return (
    <div>
      <h1>Your Files</h1>
      <UploadFile onUpload={fetchFiles} />
      <FileList files={files} />
    </div>
  );
};

export default HomePage;
