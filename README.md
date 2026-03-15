# VectorShift FlowGraph Frontend

A sophisticated, low-code interface for building AI-powered workflows using a node-based flow graph. Built with React and React Flow, featuring a scalable hybrid node architecture.

## 🚀 Key Features

- **Hybrid Node Architecture**: Combines the speed of schema-driven components with the flexibility of custom-rendered nodes.
- **Dynamic Variable Suggestion**: Intelligent auto-completion for variables using `{{` triggers, with automatic edge creation between connected nodes.
- **Auto-resizing Textareas**: Seamless UX for long-form prompts and text inputs.
- **Node Catalog**: Categorized toolbar for easy discovery and drag-and-drop workflow creation.
- **Sub-flow Validation**: Direct integration with backend to validate Directed Acyclic Graph (DAG) structures.
- **Theme Support**: Integrated dark/light mode toggle.

## 🏗 Architecture Overview

The frontend is designed for extensibility and performance, utilizing a three-layer abstraction for the flow components:

1.  **[BaseNode](src/nodes/shared/BaseNode.js)**: The core visual shell for all nodes, handling consistent styling, headers, and universal handle (port) behavior.
2.  **[Node Factory (`createNodeComponent`)](src/nodes/factory/createNodeComponent.js)**: A powerful utility that generates functional React Flow nodes from simple JSON-like configurations. Most nodes in the system (LLM, API, Input, etc.) are built using this factory, reducing boilerplate by ~80%.
3.  **[Node Registry](src/nodes/nodeRegistry.js)**: The single source of truth that orchestrates toolbar appearance, React Flow node types, and initial state generation.

### Design Principles

- **Configuration over Code**: New node types can be added by simply creating a new definition in `src/nodes/definitions/`.
- **Component-Based CSS**: Styles are co-located with their components (e.g., `BaseNode.css`, `canvas.css`) for high maintainability.
- **Centralized State**: Powered by [Zustand](https://github.com/pmndrs/zustand) for predictable state management across the canvas and toolbar.

## 📂 Project Structure

```text
src/
├── components/       # UI Components (Canvas, Toolbar, Shared UI)
├── hooks/            # Custom React Hooks (Store, Variable Suggestions)
└── nodes/
    ├── definitions/  # Individual Node logic & schema
    ├── factory/      # The createNodeComponent engine
    ├── shared/       # BaseNode and shared assets
    ├── nodeRegistry.js # Central registration point
    └── nodeSchema.js # Type definitions and validation logic
```

## 🛠 Setup & Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v16.x or higher)
- [npm](https://www.npmjs.com/)

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd vectorshift-ai-flowgraph-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The application will be available at [http://localhost:3000](http://localhost:3000).

## 🧪 Submission & Validation

When the "Submit Pipeline" button is clicked:
1. The current graph is serialized (minimalist nodes and edges).
2. The data is sent to the backend (`http://localhost:8000/pipelines/parse`).
3. The response displays the number of nodes, edges, and confirms if the structure is a valid **Directed Acyclic Graph (DAG)**.

## 📖 Learn More

- [React Flow Documentation](https://reactflow.dev/)
- [Zustand State Management](https://zustand-demo.pmndrs.org/)
- [Create React App](https://facebook.github.io/create-react-app/docs/getting-started)

