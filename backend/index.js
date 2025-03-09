const express = require("express");
const multer = require("multer");
const pdf = require("pdf-parse");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 },
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

if (!process.env.GEMINI_API_KEY) {
    console.error(
        "GEMINI API key is missing. Please add it to your .env file."
    );
    process.exit(1);
} else {
    console.log("GEMINI API key loaded successfully.");
}

const roastPrompt = (resumeText) => `
You are an unforgiving resume critic. Your task is to roast the resume below with no mercy.

Resume Content:
${resumeText}

Instructions:
- Identify every weak point, cliché, or vague statement
- Use biting humor but stay concise
- Keep the roast under 300 words
- Include sarcastic but sharp career advice
`;

const generateRoast = async (resumeText) => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(roastPrompt(resumeText));
    return result.response.text();
};

app.get("/", (req, res) => {
    res.json({ message: "Welcome to the Resume Roaster Backend!" });
});

app.post("/roast", upload.single("resume"), async (req, res) => {
    try {
        if (!req.file) {
            return res
                .status(400)
                .json({ error: "No resume file uploaded. Please try again." });
        }

        const { text: resumeText } = await pdf(req.file.buffer);

        if (!resumeText || !resumeText.trim()) {
            return res
                .status(400)
                .json({
                    error: "Failed to extract text from resume. Ensure the file contains text.",
                });
        }

        const roast = await generateRoast(resumeText);

        res.status(200).json({
            roast,
            fileName: req.file.originalname,
            wordCount: resumeText.split(/\s+/).length,
            characterCount: resumeText.length,
        });
    } catch (error) {
        console.error("Error generating roast:", error);
        res.status(500).json({
            error: "An error occurred while generating the roast.",
            details: error.message || "Unexpected error",
        });
    }
});

app.use((req, res) => {
    res.status(404).json({ error: "Route not found." });
});

app.listen(port, () => {
    console.log(`Server is running and listening on port ${port}`);
});
