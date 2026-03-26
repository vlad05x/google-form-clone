# Google Forms Clone

A modern, minimalist full-stack clone of Google Forms. Built with a focus on performance, robust state management, and strict typings.

## ✨ Tech Stack

### Client
- **Framework:** React 19 + TypeScript (Vite)
- **State Management:** Redux Toolkit + RTK Query
- **Data Fetching:** GraphQL Request + GraphQL Codegen
- **Styling:** Sass
- **Routing:** React Router v7

### Server
- **Runtime:** Node.js + tsx
- **API:** Apollo Server (GraphQL)
- **Language:** TypeScript

---

## 🚀 Getting Started

This project is set up as a monorepo using npm workspaces, making it incredibly simple to get up and running.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- npm

### 1. Installation

From the root directory, install the dependencies for both the client and server:

```bash
npm install
```

### 2. Running Locally

You can launch both the frontend and backend development servers concurrently with a single command from the root folder:

```bash
npm run dev
```

- 🎨 **Client (Vite):** typically runs on [http://localhost:5173](http://localhost:5173)
- ⚙️ **Server (GraphQL):** check your console output, generally [http://localhost:4000](http://localhost:4000)

---

## 🛠️ Manual Operation (Optional)

If you prefer to run the workspaces in separate terminal windows, you can do so by navigating into the respective directories:

**Start the Server:**
```bash
cd server
npm run dev
```

**Start the Client:**
```bash
cd client
npm run dev
```
