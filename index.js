import React from 'react';
import { createRoot } from "react-dom/client";
import App from './src/App'
import { AppWrapper, useAppContext } from './src/context/AppWrapper'

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
      <AppWrapper> 
            <React.StrictMode>
                  <App />
            </React.StrictMode>
      </AppWrapper>
);