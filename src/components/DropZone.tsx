"use client";

import { useState, useRef, ChangeEvent, DragEvent, ReactNode } from 'react';
import { UploadIcon } from 'lucide-react';
import { Button } from './ui/button';

interface ImageDropzoneProps {
  file: File | null;
  setFile: (file: File | null) => void;
  bottomContent?: ReactNode;
}

const ImageDropzone = ({ file, setFile, bottomContent }: ImageDropzoneProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isInvalid, setIsInvalid] = useState<boolean>(false);
  const [dragValidation, setDragValidation] = useState<boolean | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes
  const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];

  // Validate file without setting state
  const validateFile = (file: File): { valid: boolean; error: string | null } => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return {
        valid: false,
        error: 'Please select a valid image file (JPEG, PNG, GIF, WebP, SVG)'
      };
    }
    
    if (file.size > MAX_FILE_SIZE) {
      return {
        valid: false,
        error: `File size exceeds the 5MB limit (${(file.size / (1024 * 1024)).toFixed(2)}MB)`
      };
    }

    return { valid: true, error: null };
  };

  const handleFileSelect = (selectedFile: File)  => {
    const validation = validateFile(selectedFile);
    setError(validation.error);
    setIsInvalid(!validation.valid);
    
    if (!validation.valid) return;

    // Revoke the previous object URL if it exists
    if (preview) URL.revokeObjectURL(preview);
    
    // Create preview
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    setFile(selectedFile);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragging(false);
    setDragValidation(null);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragging(true);
    
    // Check file validity while dragging
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      const item = e.dataTransfer.items[0];
      
      // Check if it's a file and if the type is an image
      if (item.kind === 'file') {
        const fileType = item.type;
        const isValidType = ACCEPTED_TYPES.includes(fileType);
        setDragValidation(isValidType);
        
      }
    }
  };

  const handleDragLeave = (): void => {
    setIsDragging(false);
    setDragValidation(null);
  };
  

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };
  
  const handleRemove = (): void => {
    setFile(null);
    setPreview(null);
    setError(null);
    setIsInvalid(false);
  };
  

  const openFileSelector = (): void => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const getBorderColor = (): string => {
    if (isDragging) {
      // If we're dragging and have validation info, use it
      if (dragValidation === false) return 'border-red-500 bg-red-50 dark:bg-red-900/20 dark:border-red-700';
      if (dragValidation === true) return 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-700';
      // Default dragging state when validation not yet determined
      return 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-700';
    }
    
    // Not dragging
    if (isInvalid) return 'border-gray-300 dark:border-gray-600 hover:border-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 dark:hover:border-red-700';
    return 'border-gray-300 dark:border-gray-600 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 dark:hover:border-blue-700';
  };

  const getIconColor = (): string => {
    if (isDragging) {
      if (dragValidation === false) return 'text-red-500 dark:text-red-400';
      if (dragValidation === true) return 'text-blue-500 dark:text-blue-400';
      return 'text-blue-500 dark:text-blue-400';
    }
    
    if (isInvalid) return 'text-gray-400 dark:text-gray-500';
    return 'text-gray-400 dark:text-gray-500';
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      {!file ? (
        <div
          className={`border-2 border-dashed rounded-lg p-6 transition-colors cursor-pointer flex flex-col items-center justify-center h-64 ${getBorderColor()}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={openFileSelector}
        >
          <UploadIcon 
            className={`w-12 h-12 mb-3 ${getIconColor()}`}
            size={48}
          />
          <p className="mb-2 text-sm text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Image only (Max: {MAX_FILE_SIZE / (1024 * 1024)}MB)
          </p>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleChange}
          />
        </div>
      ) : (
        <div className="border rounded-lg p-4 bg-white dark:bg-gray-800 dark:border-gray-700 shadow-sm">
          <div className="relative w-full h-64 overflow-hidden rounded-md bg-gray-100 dark:bg-gray-700 mb-4">
            <img
              src={preview || ''}
              alt="Preview"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{file.name} ({(file.size / (1024 * 1024)).toFixed(2)}MB)</span>
            </div>
            {bottomContent ? (
              bottomContent
            ) : (
              <div className="flex space-x-3 justify-between mt-2">
                <Button variant="outline" onClick={handleRemove} className='flex-1'>Remove Image</Button>
              </div>
            )}
          </div>
        </div>
      )}
      
      {error && (
        <div className="mt-3 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-3 rounded-md">
          <span className="font-medium">Error:</span> {error}
        </div>
      )}
    </div>
  );
};

export default ImageDropzone;