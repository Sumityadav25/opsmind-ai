# OpsMind AI – Context-Aware Corporate Knowledge Brain

OpsMind AI is an enterprise-grade Retrieval-Augmented Generation (RAG) system
that enables employees to instantly query large SOP documents with
**zero hallucination** and **strict source citation**.

---

## 🚀 Features

- Ask questions over 500+ page SOP PDFs
- Context-aware answers (RAG-based)
- Strict source citations (document + chunk)
- Clickable SOP snippet preview
- Chat history persistence (MongoDB)
- Manual chat reset
- Performance logging (latency metrics)
- Backend stable & production-ready

---

## 🧠 Architecture Overview

Frontend (React)
→ API Gateway (Express.js)
→ Semantic Search (Local cosine similarity)
→ SOP Context Injection
→ OpenAI LLM
→ Answer + Sources

---

## 🛠️ Tech Stack

### Backend
- Node.js (ES Modules)
- Express.js
- MongoDB Atlas (M0)
- pdfjs-dist
- Multer
- OpenAI API
- Local cosine similarity (no vector DB)

### Frontend
- React (Vite)
- Fetch API
- Plain CSS

---


