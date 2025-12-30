# Workflow Builder UI

A visual, interactive workflow builder built with **React** that allows users to create, edit, and manage workflows consisting of sequential steps and conditional branches.

This project was developed as a **Frontend Intern Take-Home Assignment** and focuses on data modeling, state management, and clean component architecture without using external UI or diagramming libraries.



Live Demo
https://workflowbuilder-ui.vercel.app/

 GitHub Repository
https://github.com/Palak2506/workflowbuilderUI

---

## 🧩 Features

### Core Functionality
- **Visual Workflow Canvas** with a root `Start` node
- **Three Node Types**:
  - **Action** – single sequential step
  - **Branch** – conditional node with `True` / `False` paths
  - **End** – terminal node with no outgoing connections
- **Add Nodes** dynamically at any valid position
- **Delete Nodes** with automatic flow reconnection
- **Edit Node Labels** inline
- **Save Workflow** (logs full workflow structure to console)

### Bonus Features
- Branch-safe deletion logic
- Immutable state updates
- Clean, readable UI without third-party UI libraries

---

## 🛠️ Tech Stack

- **React** (Functional Components + Hooks)
- **JavaScript (ES6+)**
- **CSS** (no UI frameworks)
- **Vite** for development and build

❌ No workflow/diagram libraries (React Flow, GoJS, etc.)  
❌ No UI libraries (MUI, Chakra, Shadcn, etc.)

---

## 🧠 Data Modeling Approach

The workflow is modeled as a **tree-like structure** stored in React state:

```js
{
  rootId: "start",
  nodes: {
    start: {
      id: "start",
      type: "START",
      label: "Start",
      children: [{ nodeId: "node-1", branch: "default" }]
    },
    "node-1": {
      id: "node-1",
      type: "BRANCH",
      label: "Branch",
      children: [
        { branch: "True", nodeId: null },
        { branch: "False", nodeId: null }
      ]
    }
  }
}
