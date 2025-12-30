import { useState } from "react";

export function useWorkflow() {
  const [workflow, setWorkflow] = useState({
    rootId: "start",
    nodes: {
      start: {
        id: "start",
        type: "START",
        label: "Start",
        children: []
      }
    }
  });

  const addNode = (parentId, type, branch = "default") => {
  setWorkflow((prev) => {
    const newId = crypto.randomUUID();

    let newNode;

    // ✅ SPECIAL CASE: BRANCH node
    if (type === "BRANCH") {
      newNode = {
        id: newId,
        type: "BRANCH",
        label: "Branch",
        children: [
          { branch: "True", nodeId: null },
          { branch: "False", nodeId: null }
        ]
      };
    } else {
      newNode = {
        id: newId,
        type,
        label: type,
        children: []
      };
    }

    const parent = prev.nodes[parentId];

    // ✅ If parent itself is a BRANCH → fill correct slot
    if (parent.type === "BRANCH") {
      const updatedChildren = parent.children.map((c) =>
        c.branch === branch && c.nodeId === null
          ? { ...c, nodeId: newId }
          : c
      );

      return {
        ...prev,
        nodes: {
          ...prev.nodes,
          [newId]: newNode,
          [parentId]: {
            ...parent,
            children: updatedChildren
          }
        }
      };
    }

    // ✅ Normal node behavior
    return {
      ...prev,
      nodes: {
        ...prev.nodes,
        [newId]: newNode,
        [parentId]: {
          ...parent,
          children: [{ nodeId: newId, branch }]
        }
      }
    };
  });
};

   const deleteNode = (nodeId) => {
  setWorkflow((prev) => {
    if (nodeId === prev.rootId) return prev;

    const nodes = { ...prev.nodes };

    let parentId = null;
    let parentBranch = null;

    // 1️⃣ Find parent and branch
    for (const id in nodes) {
      for (const child of nodes[id].children) {
        if (child.nodeId === nodeId) {
          parentId = id;
          parentBranch = child.branch;
        }
      }
    }

    if (!parentId) return prev;

    const parent = nodes[parentId];
    const deletedNode = nodes[nodeId];

    let newParentChildren;

    // 2️⃣ Branch parent → reset branch slot
    if (parent.type === "BRANCH") {
      newParentChildren = parent.children.map((child) =>
        child.branch === parentBranch
          ? { ...child, nodeId: null }
          : child
      );
    } 
    // 3️⃣ Sequential parent → reconnect children
    else {
      newParentChildren = deletedNode.children;
    }

    // 4️⃣ Build new nodes object IMMUTABLY
    const newNodes = {
      ...nodes,
      [parentId]: {
        ...parent,
        children: newParentChildren
      }
    };

    delete newNodes[nodeId];

    return {
      ...prev,
      nodes: newNodes
    };
  });
};

const updateLabel = (nodeId, newLabel) => {
  setWorkflow((prev) => ({
    ...prev,
    nodes: {
      ...prev.nodes,
      [nodeId]: {
        ...prev.nodes[nodeId],
        label: newLabel
      }
    }
  }));
};


  return { workflow, addNode, deleteNode, updateLabel };

}
