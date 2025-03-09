import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import axios from "axios";
import { uploadedFileState, roastResultState } from "@/state/atoms/resumeAtoms";
import { Upload, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const BACKEND_URL = "https://resume-roast-psi.vercel.app";

const LandingPage: React.FC = () => {
    const setUploadedFile = useSetRecoilState(uploadedFileState);
    const setRoastResult = useSetRecoilState(roastResultState);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file && file.type === "application/pdf") {
            setSelectedFile(file);
            setUploadedFile(file);
        } else {
            alert("Please upload a PDF file");
        }
    };

    const generateRoast = async () => {
        if (!selectedFile) return;

        setIsLoading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append("resume", selectedFile);

            const response = await axios.post(
                `${BACKEND_URL}/roast`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    timeout: 30000,
                }
            );

            setRoastResult(response.data.roast);
            navigate("/roast");
        } catch (err) {
            setError(
                axios.isAxiosError(err)
                    ? err.response?.data?.error || "Failed to generate roast"
                    : "An unexpected error occurred"
            );
            setIsLoading(false);
        }
    };

    const initialRequest = async () => {
        await axios("https://resume-roaster.onrender.com/");
    };

    useEffect(() => {
        initialRequest();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] via-[#1c1c1c] to-[#2a2a2a] flex items-center justify-center p-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none"></div>

            <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-gray-900/50 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-black/50 rounded-full blur-3xl animate-pulse delay-500"></div>

            <Card className="w-full max-w-4xl bg-white/5 backdrop-blur-lg border-gray-800 text-white relative z-10 shadow-2xl shadow-black/50 p-8">
                <CardHeader className="text-center space-y-6">
                    {error && (
                        <div className="text-red-500 font-medium">
                            <strong>Note:</strong> If request fails, reload after 30 seconds & try again 😃
                        </div>
                    )}

                    <CardTitle className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600 animate-text">
                        Dark Roast Resume <span className="text-white">☕</span>
                    </CardTitle>

                    <p className="text-gray-400 mt-2 font-medium text-lg">
                        <span className="text-yellow-300">Covert Mode:</span> Brew Your Resume's Doom! ⚡
                    </p>
                </CardHeader>

                <CardContent>
                    <div className="space-y-8">
                        <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center group transition-all duration-300 hover:border-gray-500">
                            <input
                                type="file"
                                accept=".pdf"
                                className="hidden"
                                id="resume-upload"
                                onChange={handleFileUpload}
                            />
                            <label
                                htmlFor="resume-upload"
                                className="cursor-pointer flex flex-col items-center space-y-4"
                            >
                                <Upload className="w-16 h-16 text-gray-400 group-hover:text-white transition-colors" />
                                <span className="text-gray-300 group-hover:text-white transition-colors font-semibold text-lg">
                                    {selectedFile
                                        ? `${selectedFile.name} (Ready to Brew ☕)`
                                        : "Upload Your Resume (PDF Only)"}
                                </span>
                            </label>
                        </div>

                        {error && (
                            <div className="text-red-400 text-center bg-red-900/30 p-3 rounded-lg">
                                <p>{error}</p>
                            </div>
                        )}

                        {selectedFile && (
                            <Button
                                onClick={generateRoast}
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-gray-700 to-black hover:from-gray-600 hover:to-gray-800 text-white flex items-center justify-center space-x-2 transition-all duration-300 transform hover:scale-105 text-lg py-3"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 animate-spin" />
                                        Brewing Your Roast...
                                    </>
                                ) : (
                                    <>
                                        <span className="mr-2">🔥</span>
                                        Serve Me the Dark Roast
                                    </>
                                )}
                            </Button>
                        )}

                        <div className="flex items-center text-red-400 text-lg bg-gray-800 p-3 rounded-lg">
                            <AlertCircle className="mr-3 w-6 h-6 text-red-500 font-medium" />
                            Warning: Expect a Bold, Bitter Roast! ☠️
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default LandingPage;
