import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { OverlayProvider } from "./context/OverlayContext";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

// Add error boundary and logging
console.log("Starting React application...");

try {
  const rootElement = document.getElementById("root");
  console.log("Root element found:", rootElement);
  
  if (!rootElement) {
    throw new Error("Root element not found");
  }
  
  const root = ReactDOM.createRoot(rootElement);
  console.log("React root created successfully");
  
  root.render(
    <React.StrictMode>
      <OverlayProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </OverlayProvider>
    </React.StrictMode>
  );
  
  console.log("React app rendered successfully");
} catch (error) {
  console.error("Error starting React app:", error);
  document.getElementById("root").innerHTML = `
    <div style="padding: 20px; color: red; font-family: Arial, sans-serif;">
      <h2>Application Error</h2>
      <p>Failed to start the application: ${error.message}</p>
      <p>Please refresh the page or contact support.</p>
    </div>
  `;
}