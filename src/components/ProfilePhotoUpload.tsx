import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Image as ImageIcon } from 'lucide-react';
import { uploadProfilePhoto } from '@/lib/firebase/firebase';

interface ProfilePhotoUploadProps {
  currentPhotoUrl: string | undefined;
  onPhotoUpload: (url: string) => void;
}

export default function ProfilePhotoUpload({ currentPhotoUrl, onPhotoUpload }: ProfilePhotoUploadProps) {
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      try {
        const url = await uploadProfilePhoto(file);
        onPhotoUpload(url);
      } catch (error) {
        console.error('Error uploading profile photo:', error);
      }
    }
  }, [onPhotoUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.svg', '.png', '.jpg', '.gif']
    },
    maxSize: 5242880, // 5MB
    multiple: false
  });

  return (
    <div className="flex items-center space-x-6">
      <div>
        <h4 className="font-medium mb-1">Profile Photo</h4>
        <p className="text-sm text-gray-500 mb-2">This image will be shown publicly as your profile picture.</p>
        <Avatar className="w-24 h-24">
          <AvatarImage src={currentPhotoUrl || "/placeholder.svg?height=96&width=96"} alt="Profile" />
          <AvatarFallback>
            {currentPhotoUrl ? currentPhotoUrl.charAt(0).toUpperCase() : 'U'}
          </AvatarFallback>
        </Avatar>
      </div>
      <div
        {...getRootProps()}
        className={`flex-1 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer ${
          isDragActive ? 'border-blue-500 bg-blue-50' : ''
        }`}
      >
        <input {...getInputProps()} />
        <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-blue-600 font-medium">Click to replace</p>
        <p className="text-xs text-gray-500">or drag and drop</p>
        <p className="text-xs text-gray-500 mt-1">SVG, PNG, JPG or GIF (max. 400 x 400px)</p>
      </div>
    </div>
  );
}