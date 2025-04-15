"use client"

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Turnstile } from "next-turnstile"
import { toast } from "sonner"
import ImageDropzone from './DropZone'
import { Loader2 } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import AnalysisContent from './AnalysisContent'

export default function Detector() {
    const [file, setFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showTurnstile, setShowTurnstile] = useState(false);
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [progress, setProgress] = useState(0);
    const [activeTab, setActiveTab] = useState('upload');
    const [error, setError] = useState<string | null>(null);

    // Clean progress bar animation
    useEffect(() => {
        let progressInterval: NodeJS.Timeout | null = null;

        if (isLoading) {
            // Set initial progress immediately
            setProgress(10);

            progressInterval = setInterval(() => {
                setProgress(prev => {
                    const increment = Math.random() * 10 + 2;
                    return Math.min(prev + increment, 95);
                });
            }, 800);
        }

        return () => {
            if (progressInterval) clearInterval(progressInterval);
            if (!isLoading) setProgress(0);
        };
    }, [isLoading]);

    // Handle tab switching cleanup
    useEffect(() => {
        // When switching back to upload tab after analysis
        if (activeTab === 'upload' && result) {
            setShowTurnstile(false);
        }
    }, [activeTab, result]);

    // Complete reset for new analysis
    const resetAnalysis = () => {
        setFile(null);
        setShowTurnstile(false);
        setResult(null);
        setIsLoading(false);
        setProgress(0);
        setActiveTab('upload');
        setError(null);
    };

    const handleScan = () => {
        if (!file) {
            toast.error("Please select an image first");
            return;
        }
        setShowTurnstile(true);
        setError(null);
    };

    // Clean implementation of analysis process
    const startAnalysis = async (token: string) => {
        if (!file) {
            toast.error("Please select an image first");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("cf-turnstile-response", token);

            const response = await fetch('/api/predict', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData?.error || `Server error: ${response.status}`);
            }

            const data = await response.json();

            if (!data.success) {
                throw new Error(data.error || "Failed to analyze image");
            }

            // Set full progress before showing results
            setProgress(100);

            // Short delay to show 100% before completing
            setTimeout(() => {
                setResult({
                    isFake: data.isFake,
                    confidence: data.confidence,
                    elaImageUrl: data.elaImageUrl,
                    success: true
                });

                setActiveTab('result');
                setIsLoading(false);
                toast.success("Analysis complete");
            }, 300);

        } catch (error) {
            console.error("Analysis error:", error);
            setError(error instanceof Error ? error.message : "Unknown error occurred");
            toast.error(error instanceof Error ? error.message : "An error occurred");
            setIsLoading(false);
            setShowTurnstile(false);
        }
    };

    // Simplified bottom content renderer
    const renderBottomContent = () => {
        // During analysis
        if (isLoading) {
            return (
                <div className="w-full">
                    <div className="p-4 bg-muted/20 rounded-lg text-center">
                        <Loader2 className="h-6 w-6 animate-spin mx-auto mb-3" />
                        <p className="text-sm font-medium mb-2">Analyzing Image...</p>
                        <Progress value={progress} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-2">{Math.round(progress)}% complete</p>
                    </div>
                </div>
            );
        }

        // Error state
        if (error) {
            return (
                <div className="w-full">
                    <div className="p-4 bg-destructive/10 rounded-lg text-center">
                        <p className="text-sm font-medium text-destructive mb-2">Analysis Error</p>
                        <p className="text-xs text-destructive/80">{error}</p>
                        <Button 
                            variant="outline" 
                            className="mt-3" 
                            onClick={() => setError(null)}
                            size="sm"
                        >
                            Try Again
                        </Button>
                    </div>
                </div>
            );
        }

        // Default state - show action buttons
        return (
            <>
                <div className="flex space-x-3 justify-between mt-2">
                    <Button onClick={handleScan} className="flex-1">
                        {showTurnstile ? <> <Loader2 className="animate-spin mr-2" /> Verifying... </> : "Scan Image"}
                    </Button>
                    <Button variant="outline" onClick={() => setFile(null)} className="flex-1">Remove Image</Button>
                </div>
                
                {/* Turnstile verification */}
                {showTurnstile && (
                    <div className="w-full mt-3">
                        <div className="p-4 bg-muted/20 rounded-lg">
                            <h3 className="text-sm font-medium mb-3 text-center">Security Verification Required</h3>
                            <div className="flex justify-center">
                                <Turnstile
                                    siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                                    retry="auto"
                                    refreshExpired="auto"
                                    theme="light"
                                    responseFieldName="cf-turnstile-response"
                                    onError={() => {
                                        setError("Security verification failed. Please try again.");
                                        toast.error("Security check failed. Please try again.");
                                        setShowTurnstile(false);
                                    }}
                                    onExpire={() => {
                                        setError("Security verification expired. Please verify again.");
                                        toast.error("Security check expired. Please verify again.");
                                        setShowTurnstile(false);
                                    }}
                                    onVerify={(token) => {
                                        // Start analysis directly with the token
                                        startAnalysis(token);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                    <TabsTrigger value="upload" disabled={!!result}>Upload Image</TabsTrigger>
                    <TabsTrigger value="result" disabled={!result}>Analysis Results</TabsTrigger>
                </TabsList>

                <TabsContent value="upload" className="space-y-6">
                    <ImageDropzone
                        file={file}
                        setFile={setFile}
                        bottomContent={renderBottomContent()}
                    />
                </TabsContent>

                <TabsContent value="result" className="space-y-8">
                    {result && (
                        <AnalysisContent 
                            result={result}
                            file={file}
                            resetAnalysis={resetAnalysis}
                        />
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}


interface AnalysisResult {
    isFake: boolean;
    confidence: number;
    elaImageUrl: string;
    success: boolean;
}
