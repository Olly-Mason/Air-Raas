import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { Label } from "@/components/ui/label";

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
}

export default function FileUpload({ onFileSelect }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFile = event.target.files[0];
      if (selectedFile.size <= 10 * 1024 * 1024) { // 10MB limit
        setFile(selectedFile);
        onFileSelect(selectedFile);
      } else {
        alert('File size exceeds 10MB limit');
      }
    }
  };

  return (
    <div>
      <Label htmlFor="jobSpec">Upload Job Specification (Optional)</Label>
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
        <div className="space-y-1 text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <div className="flex text-sm text-gray-600">
            <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
              <span>Upload a file</span>
              <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 10MB</p>
        </div>
      </div>
      {file && (
        <p className="mt-2 text-sm text-gray-600">
          File selected: {file.name}
        </p>
      )}
    </div>
  );
}