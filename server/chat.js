import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'; // text to vector
import { MemoryVectorStore } from 'langchain/vectorstores/memory'; // DB for vectors, stored locally
import { RetrievalQAChain } from 'langchain/chains'; // retrieves relevant
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { PromptTemplate } from 'langchain/prompts';

import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { text } from 'express';

// specifies default pdf is user doesn't provide one
const chat = async (filePath = './uploads/hbs-lean-startup.pdf', query) => {
  // Can check if PDF Loaded already

  // Step 1: Load PDF
  const loader = new PDFLoader(filePath);
  const data = await loader.load();

  // Step 2: Text Splitting
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    // No overlap, but risk splitting a sentence apart (loses context)
    chunkOverlap: 0,
  });

  const splitDocs = await textSplitter.splitDocuments(data);

  // Step 3: Embedding
  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });

  const vectorStore = await MemoryVectorStore.fromDocuments(
    splitDocs,
    embeddings
  );

  // Step 4: Check Retrieved Relevant Docs
  //   const relevantDocs = await vectorStore.similaritySearch(
  //     "what's lean startup?"
  //   );

  // Step 5: Question Answer
  const model = new ChatOpenAI({
    modelName: 'gpt-3.5-turbo',
    // modelName: 'gpt-4o-mini',
    openAIApiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });

  const template = `Use the following pieces of context to answer the question at the end.
If you don't know the answer, just say that you don't know, don't try to make up an answer.
Use three sentences maximum and keep the answer as concise as possible.

{context}
Question: {question}
Helpful Answer:`;

  const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever(), {
    prompt: PromptTemplate.fromTemplate(template),
  });

  const response = await chain.call({
    query,
  });

  return response;
};

export default chat;
