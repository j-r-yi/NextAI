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

### 1. Clone the repo

```bash
git clone https://github.com/your-username/pdf-chat-assistant.git
cd pdf-chat-assistant
```
