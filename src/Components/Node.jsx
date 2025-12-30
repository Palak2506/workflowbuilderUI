import "../styles/node.css";

function Node({ node, children, addNode, deleteNode, updateLabel }) {
  return (
    <div className="node">
      <div className="node-box">
        <input
  value={node.label}
  onChange={(e) => updateLabel(node.id, e.target.value)}
  style={{
    fontWeight: "bold",
    border: "none",
    textAlign: "center",
    background: "transparent"
  }}
/>

        <div className="node-type">{node.type}</div>

        {/* ADD BUTTONS */}
        {node.type === "BRANCH" && (
          <div style={{ marginTop: 8 }}>
            {node.children.map((child, index) => (
              <div key={index}>
                <button
                  onClick={() =>
                    addNode(node.id, "ACTION", child.branch)
                  }
                >
                  + Action to {child.branch}
                </button>

                <button
                  onClick={() =>
                    addNode(node.id, "END", child.branch)
                  }
                >
                  + End to {child.branch}
                </button>
              </div>
            ))}
          </div>
        )}

        {node.type !== "END" && node.type !== "BRANCH" && (
          <div style={{ marginTop: 8 }}>
            <button onClick={() => addNode(node.id, "ACTION")}>
              + Action
            </button>
            <button onClick={() => addNode(node.id, "BRANCH")}>
              + Branch
            </button>
            <button onClick={() => addNode(node.id, "END")}>
              + End
            </button>
          </div>
        )}

        {/* DELETE BUTTON */}
        {node.type !== "START" && (
          <div style={{ marginTop: 6 }}>
            <button
              style={{ color: "red" }}
              onClick={() => deleteNode(node.id)}
            >
              Delete
            </button>
          </div>
        )}
      </div>

      <div className="node-children">{children}</div>
    </div>
  );
}

export default Node;
