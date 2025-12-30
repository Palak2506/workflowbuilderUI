import Node from "./Node";

function Canvas({ workflow, addNode, deleteNode, updateLabel }) {
  const { rootId, nodes } = workflow;

  const renderNode = (nodeId) => {
    const node = nodes[nodeId];

    return (
      <Node
  node={node}
  addNode={addNode}
  deleteNode={deleteNode}
  updateLabel={updateLabel}
>

        {node.children.map((child, index) => (
          <div key={index} style={{ textAlign: "center" }}>
           {child.branch !== "default" && <strong>{child.branch}</strong>}


            {child.nodeId ? (
              renderNode(child.nodeId)
            ) : (
              <div style={{ marginTop: 10, fontSize: 12, color: "#777" }}>
                (empty)
              </div>
            )}
          </div>
        ))}
      </Node>
    );
  };

  return <div style={{ padding: 20 }}>{renderNode(rootId)}</div>;
}

export default Canvas;
