// App.jsx
import { useState } from "react";
import { usePyodide } from "./usePyodide";

export default function App() {
  const { ready, runPython } = usePyodide();
  const [output, setOutput] = useState("");
   const [inputValue, setInputValue] = useState(5);


  const handleRun = async () => {

    // On How to handle variables See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
    
    const result = await runPython(`
      import json
      import random
      data = random.sample(range(1, 50), ${inputValue})
      json.dumps(data)
    `);
    setOutput(result);
  };

  return (
    <div>
      <div>
    This is a project app to mostly see how piodide runs in react. 
      A javascript version of this apps already exists and inspired this app. 
      See https://github.com/mikkerlo/silksong-flea.
      Currently only a button that runs a simple array in python 


      </div>
      <label>
        Text input:{" "}
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(Number(e.target.value))}
        />
      </label>

      <button onClick={handleRun} disabled={!ready}>
        {ready ? "Run Python" : "Loading Pyodide..."}
      </button>
      <pre>{output}</pre>
    </div>
  );
}