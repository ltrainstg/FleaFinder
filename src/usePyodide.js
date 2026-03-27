import { useState, useEffect } from "react";

// ✅ Module-level singleton — shared across ALL components
let pyodideInstance = null;
let pyodideLoadingPromise = null;

async function getPyodide() {
  // If already loaded, return immediately
  if (pyodideInstance) return pyodideInstance;

  // If currently loading, wait for the same promise (don't load twice)
  if (pyodideLoadingPromise) return pyodideLoadingPromise;

  pyodideLoadingPromise = (async () => {
    if (!window.loadPyodide) {
      await new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/pyodide/v0.25.1/full/pyodide.js";
        script.onload = resolve;
        script.onerror = () => reject(new Error("Failed to load Pyodide script"));
        document.head.appendChild(script);
      });
    }

    const pyodide = await window.loadPyodide();
    await pyodide.loadPackage("micropip");
    const micropip = pyodide.pyimport("micropip");
    await micropip.install("pycryptodome");

    pyodideInstance = pyodide;
    return pyodide;
  })();

  return pyodideLoadingPromise;
}

export function usePyodide() {
  const [ready, setReady] = useState(!!pyodideInstance);  // true immediately if already loaded
  const [loading, setLoading] = useState(!pyodideInstance);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (pyodideInstance) return;  // already loaded, skip

    getPyodide()
      .then(() => {
        setReady(true);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const runPython = async (code) => {
    const pyodide = await getPyodide();
    return await pyodide.runPythonAsync(code);
  };

  const setGlobal = (name, value) => {
    if (!pyodideInstance) throw new Error("Pyodide is not ready yet");
    pyodideInstance.globals.set(name, value);
  };

  const getGlobal = (name) => {
    if (!pyodideInstance) throw new Error("Pyodide is not ready yet");
    return pyodideInstance.globals.get(name);
  };

  const loadPackage = async (packageName) => {
    const pyodide = await getPyodide();
    await pyodide.loadPackage(packageName);
  };

  return { ready, loading, error, runPython, setGlobal, getGlobal, loadPackage };
}