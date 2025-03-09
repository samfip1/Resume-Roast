import React from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { uploadedFileState, roastResultState } from "@/state/atoms/resumeAtoms";


const RoastPage: React.FC = () => {
    const uploadedFile = useRecoilValue(uploadedFileState);
    const roastResult = useRecoilValue(roastResultState);
    const resetUploadedFile = useResetRecoilState(uploadedFileState);
    const resetRoastResult = useResetRecoilState(roastResultState);
    const navigate = useNavigate();

    if (!uploadedFile || !roastResult) {
        return <Navigate to="/" replace />;
    }

    const handleReset = () => {
        resetUploadedFile();
        resetRoastResult();
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#080808] via-[#121212] to-[#1a1a1a] flex items-center justify-center p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none"></div>

            <div className="absolute top-0 left-0 w-96 h-96 bg-gray-800/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-gray-900/30 rounded-full blur-3xl animate-pulse delay-500"></div>

            <Card className="w-full max-w-4xl min-h-[80vh] bg-black/10 backdrop-blur-lg border-gray-700/50 text-gray-100 relative z-10 shadow-2xl shadow-black/50 p-8 flex flex-col justify-center">
                <CardHeader className="text-center mb-8">
                    <CardTitle className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600 animate-text">
                        Dark Roast Results <span className="text-white">☕💀</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between space-y-8">
                    <div className="bg-gray-800/30 rounded-lg p-8 border border-gray-700/50 text-lg leading-relaxed">
                        <p className="text-gray-300 whitespace-pre-wrap bg-gray-950/30 p-6 rounded-lg">
                            {roastResult}
                        </p>

                        <div className="mt-6 text-sm italic text-gray-500">
                            <strong>Uploaded File:</strong> {uploadedFile.name}
                        </div>
                    </div>
                    <Button
                        onClick={handleReset}
                        className="w-full py-4 text-lg bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-black text-white flex items-center justify-center space-x-2 transition-all duration-300 transform hover:scale-105"
                    >
                        <span className="mr-2 text-2xl">☕</span>
                        Roast Another Resume
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default RoastPage;