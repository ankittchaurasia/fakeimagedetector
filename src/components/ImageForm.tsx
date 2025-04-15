'use client';

import { useState, useRef } from 'react';
import { Turnstile } from "next-turnstile";

export default function ImageForm() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ isFake: string; confidence: string } | null>(null);
  const [elaImage, setElaImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileStatus, setTurnstileStatus] = useState<'required' | 'success' | 'error' | 'expired'>('required');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
      setResult(null);
      setElaImage(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      setError("Please select an image file.");
      return;
    }
    
    if (!turnstileToken) {
      setError("Please complete the security check.");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("token", turnstileToken);
      
      const response = await fetch('/api/predict', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      
      const isFake = response.headers.get("x-is-fake");
      const confidence = response.headers.get("x-confidence");
      
      setResult({
        isFake: isFake || "unknown",
        confidence: confidence || "0",
      });
      
      // Convert the response (ELA image) to a data URL
      const imageBlob = await response.blob();
      const imageUrl = URL.createObjectURL(imageBlob);
      setElaImage(imageUrl);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Upload Image
          </label>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/jpeg,image/png,image/webp"
            className="block w-full text-sm border rounded-md"
          />
          {file && (
            <div className="mt-2">
              <p>Selected: {file.name}</p>
            </div>
          )}
        </div>
        
        <div className="flex justify-center">
          <Turnstile
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
            retry="auto"
            refreshExpired="auto"
            sandbox={process.env.NODE_ENV === "development"}
            onError={() => {
              setTurnstileStatus("error");
              setError("Security check failed. Please try again.");
            }}
            onExpire={() => {
              setTurnstileStatus("expired");
              setError("Security check expired. Please verify again.");
            }}
            onLoad={() => {
              setTurnstileStatus("required");
              setError(null);
            }}
            onVerify={(token) => {
              setTurnstileStatus("success");
              setTurnstileToken(token);
              setError(null);
            }}
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading || !file || turnstileStatus !== 'success'}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md disabled:bg-blue-300"
        >
          {isLoading ? "Analyzing..." : "Analyze Image"}
        </button>
        
        {error && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
      </form>
      
      {result && (
        <div className="mt-6 p-4 border rounded-md">
          <h3 className="font-bold text-lg mb-2">Analysis Results</h3>
          <p>Is Fake: {result.isFake === "true" ? "Yes" : "No"}</p>
          <p>Confidence: {result.confidence}%</p>
          
          {elaImage && (
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Error Level Analysis</h4>
              <img src={elaImage} alt="ELA Analysis" className="w-full" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
