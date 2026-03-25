import { useState, useEffect, useRef } from "react";
 
export function usePyodide() {
  const pyodideRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    let cancelled = false;
 
    async function load() {
      try {
        // Avoid loading twice if already present
        if (!window.loadPyodide) {
          await new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src =
              "https://cdn.jsdelivr.net/pyodide/v0.25.1/full/pyodide.js";
            script.onload = resolve;
            script.onerror = () => reject(new Error("Failed to load Pyodide script"));
            document.head.appendChild(script);
          });
        }
 
        const pyodide = await window.loadPyodide();
 
        if (!cancelled) {
          pyodideRef.current = pyodide;
          setReady(true);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      }
    }
 
    load();
    return () => { cancelled = true; };
  }, []);
 
  const runPython = async (code) => {
    if (!pyodideRef.current) throw new Error("Pyodide is not ready yet");
    return await pyodideRef.current.runPythonAsync(code);
  };
 
  const loadPackage = async (packageName) => {
    if (!pyodideRef.current) throw new Error("Pyodide is not ready yet");
    await pyodideRef.current.loadPackage(packageName);
  };
 
  return { ready, loading, error, runPython, loadPackage };
}