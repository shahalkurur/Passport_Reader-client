

import React, { useState } from 'react';
import { Upload } from 'lucide-react';

function DocumentUploader() {
  const [file, setFile] = useState(null);
  const [extractdata, setExtractdata] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('document', file);

    try {
      const response = await fetch('http://localhost:8000/api/extract-info', {
        method: 'POST',
        body: formData,
      });

      if (!response) {
        throw new Error('Failed to Extract information');
      }
      const data = await response.json();
      setExtractdata(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      {/* File Upload Section */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
          id="file-upload"
        />
        <label 
          htmlFor="file-upload" 
          className="cursor-pointer flex flex-col items-center space-y-2"
        >
          <Upload className="w-12 h-12 text-gray-400" />
          <span className="text-sm text-gray-500">
            Click to upload or drag and drop
          </span>
          
        </label>
      </div>

      {/* Preview Section */}
      {file && (
        <div className="mt-4">
          <img 
            src={URL.createObjectURL(file)} 
            alt="Preview" 
            className="max-w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      )}

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
      >
        Extract Information
      </button>

      {/* Extracted Data Display */}
      {extractdata && (
        <div className="bg-white rounded-lg shadow-lg p-6 space-y-4 mt-6">
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
            Extracted Information
          </h2>
          <div className="space-y-3">
            <div className="flex items-center">
              <span className="text-gray-600 font-medium w-32">Name:</span>
              <span className="text-gray-800">{extractdata.name}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600 font-medium w-32">Passport No:</span>
              <span className="text-gray-800">{extractdata.passport_number}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600 font-medium w-32">Expiry Date:</span>
              <span className="text-gray-800">{extractdata.expiry_date}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DocumentUploader;