import Canvas from "./Components/Canvas";
import { useWorkflow } from "./hooks/useWorkflow";

function App() {
  const { workflow, addNode, deleteNode, updateLabel } = useWorkflow();


  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Workflow Builder</h1>
      <button
  onClick={() => console.log(workflow)}
  style={{ margin: "10px auto", display: "block" }}
>
  Save Workflow
</button>

      <Canvas
  workflow={workflow}
  addNode={addNode}
  deleteNode={deleteNode}
  updateLabel={updateLabel}
/>

    </div>
  );
}

export default App;
