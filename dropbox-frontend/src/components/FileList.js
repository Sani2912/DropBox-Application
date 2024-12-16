import React from 'react';

const FileList = ({ files }) => {
  return (
    <div>
      {files.map((file) => (
        <div key={file.id}>
          <a
            href={`http://localhost:4000/files/${file.id}`} // Use ID to generate download link
            target="_blank"
            rel="noopener noreferrer"
          >
            {file.name}
          </a>
        </div>
      ))}
    </div>
  );
};

export default FileList;
