# RoastMyResume AI

RoastMyResume AI is the brutally honest, AI-powered resume critique tool you never knew you needed — delivering feedback so savage, it hurts (but in a good way).

## 🔥 Features

- AI-Driven Insults: Forget sugarcoating — our AI will roast your resume like it’s open mic night.
- Hilarious Feedback: Packed with Gen Z slang, meme references, and dark humor.
- Smart Suggestions: Beneath the burns, there’s solid advice on how to improve your resume.
- Upload & Roast: Upload your PDF resume and let the AI unleash its unfiltered feedback.


## 🛠️ Tech Stack

- **Frontend:** React.js, TailwindCSS, shadcn
- **Backend:** Node.js, Express, Multer, pdf-parse
- **AI:**  Google Gemini API for dynamic roasting
- **Deployment:** Vercel (Frontend), Render (Backend)

## 🚀 How It Works

1. **Upload:** Drop your resume (PDF format).
2. **Roast:** Click “Generate Roast” — brace yourself.
3. **Results:** Get a brutally honest critique with hidden gems of advice.

## 🛠️ Installation Guide

- ### Backend

  1. Clone the repository:

  ```
    git clone https://github.com/your-username/resume-roaster.git
    cd resume-roaster/backend
  ```

  2. Install dependencies:

  ```
    npm install
  ```

  3. Add your Google Gemini API key to .env:

  ```
    GEMINI_API_KEY=your-api-key-here
  ```

  4. Start the server:

  ```
    node index.js
  ```

- ### Frontend

  1. Navigate to the frontend folder:

  ```
    cd ../frontend
  ```

  2. Install dependencies:

  ```
    npm install
  ```

  3. Update the BACKEND_URL in your .env file:

  ```
    VITE_BACKEND_URL=your-backend-url-here
  ```

  4. Start the development server:

  ```
    npm run dev
  ```
