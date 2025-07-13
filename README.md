# PDF Chat Assistant

This project is a full-stack application that enables users to upload a PDF, ask questions about its content via text or voice, and get concise, AI-generated answers using OpenAI's language models and LangChain's RetrievalQA system. Built with **React**, **Express**, **LangChain**, and **OpenAI**, this app provides an interactive and intelligent experience for document-based querying.

---

## Features

- Upload and parse PDF documents
- Automatic text chunking and vector embedding via OpenAI
- Semantic search for relevant information using `langchain.vectorstores`
- Ask questions via text or voice (using speech-to-text)
- Hear answers read aloud (text-to-speech)
- Fast and local vector retrieval using `MemoryVectorStore`

---

## Tech Stack

### Backend

- Node.js with Express
- LangChain (PDFLoader, OpenAIEmbeddings, RetrievalQAChain)
- OpenAI API (`gpt-3.5-turbo`)
- Multer (for file uploads)
- dotenv (for environment variables)

### Frontend

- React
- Axios (API requests)
- Ant Design (`Upload`, `Input`, `Button`, `Spin`)
- `react-speech-recognition` (speech-to-text)
- `speak-tts` (text-to-speech)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/nextai.git
cd nextai
```

### 2. Install Dependencies

Install dependencies for both frontend and backend:

```bash
npm install
cd server && npm install
cd ..
```

### 3. Start Development Mode

Start both the React frontend and backend server concurrently:

```bash
npm run dev
```

- Frontend runs on: http://localhost:3000
- Backend should be set to run from the `server` directory

---

## Available Scripts

From the root of the project:

| Command           | Description                                  |
|------------------|----------------------------------------------|
| `npm start`       | Runs only the React frontend                 |
| `npm run server`  | Runs only the backend server                 |
| `npm run dev`     | Runs both frontend and backend concurrently |
| `npm run build`   | Builds the React app for production          |
| `npm test`        | Runs tests using Jest                        |
| `npm run eject`   | Ejects from CRA (not reversible)             |

From the `server/` directory:

| Command       | Description                   |
|---------------|-------------------------------|
| `npm start`   | Starts the backend server      |
