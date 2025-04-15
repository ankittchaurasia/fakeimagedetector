import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function AnalysisContent({ result, file, resetAnalysis }: AnalysisContentProps) {
    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Analysis Results</h2>
                <Button variant="outline" onClick={resetAnalysis}>New Analysis</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Original Image */}
                <Card className="shadow-sm">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Original Image</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                        {file && (
                            <div className="rounded-md overflow-hidden bg-muted/20 aspect-auto">
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt="Original"
                                    className="w-full h-auto object-contain max-h-96"
                                />
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Results Summary */}
                <Card className="shadow-sm">
                    <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                            <CardTitle className="text-lg">Analysis Results</CardTitle>
                            <Badge
                                variant={result.isFake ? "destructive" : "default"}
                                className="text-sm px-3 py-1"
                            >
                                {result.isFake ? 'Manipulated' : 'Authentic'}
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-2 space-y-6">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h3 className="text-sm font-medium">Authenticity Score</h3>
                                <span
                                    className={`text-lg font-bold ${result.isFake ? 'text-destructive' : 'text-green-600'}`}
                                >
                                    {result.isFake
                                        ? `${Math.round(100 - result.confidence)}%`
                                        : `${Math.round(result.confidence)}%`
                                    }
                                </span>
                            </div>

                            <div>
                                <Progress
                                    value={parseInt(result.confidence as any)}
                                    className={cn("h-2", result.isFake ? "[&>*]:bg-destructive" : "[&>*]:bg-green-600")}
                                />
                            </div>

                            <div className="flex items-start mt-4 p-3 rounded-md bg-muted/20">
                                {result.isFake ? (
                                    <>
                                        <AlertCircle className="h-5 w-5 text-destructive mt-0.5 mr-2 flex-shrink-0" />
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium">Manipulation Detected</p>
                                            <p className="text-sm text-muted-foreground">
                                                Our analysis indicates this image has likely been altered
                                                with a confidence of {Math.round(result.confidence)}%.
                                                The highlighted areas in the ELA image below show
                                                potential manipulation regions.
                                            </p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium">No Manipulation Detected</p>
                                            <p className="text-sm text-muted-foreground">
                                                Our analysis indicates this image appears to be authentic
                                                with a confidence of {Math.round(result.confidence)}%.
                                                The ELA patterns show consistent compression artifacts
                                                typical of unaltered images.
                                            </p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* ELA Card */}
                <Card className="shadow-sm">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Error Level Analysis (ELA)</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <div className="rounded-md overflow-hidden bg-muted/20 aspect-auto">
                            <img
                                src={result.elaImageUrl}
                                alt="Error Level Analysis"
                                className="w-full h-auto object-contain max-h-96"
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="border-t pt-4 text-xs text-muted-foreground">
                        ELA works by resaving the image at a known quality level and
                        comparing it with the original to detect potential modifications.
                    </CardFooter>
                </Card>

                {/* Image Metadata Card */}
                <Card className="shadow-sm">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Image Metadata</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <div className="space-y-4 pt-2">
                            <div className="grid grid-cols-2 gap-2">
                                <div className="bg-muted/20 p-3 rounded-md">
                                    <h4 className="text-sm font-medium">Image Format</h4>
                                    <p className="text-sm text-muted-foreground">
                                        {file?.type || 'Unknown'}
                                    </p>
                                </div>
                                <div className="bg-muted/20 p-3 rounded-md">
                                    <h4 className="text-sm font-medium">File Size</h4>
                                    <p className="text-sm text-muted-foreground">
                                        {file ? `${(file.size / 1024).toFixed(2)} KB` : 'Unknown'}
                                    </p>
                                </div>
                                <div className="bg-muted/20 p-3 rounded-md">
                                    <h4 className="text-sm font-medium">Last Modified</h4>
                                    <p className="text-sm text-muted-foreground">
                                        {file ? new Date(file.lastModified).toLocaleString() : 'Unknown'}
                                    </p>
                                </div>
                                <div className="bg-muted/20 p-3 rounded-md">
                                    <h4 className="text-sm font-medium">Analysis Date</h4>
                                    <p className="text-sm text-muted-foreground">
                                        {new Date().toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}


interface AnalysisResult {
    isFake: boolean;
    confidence: number;
    elaImageUrl: string;
    success: boolean;
}


interface AnalysisContentProps {
    result: AnalysisResult;
    file: File | null;
    resetAnalysis: () => void;
}
