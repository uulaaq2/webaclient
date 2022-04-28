import React from 'react';
import { createRoot } from "react-dom/client";
import App from './src/App'
import { AppWrapper, useAppContext } from './src/context/AppWrapper'
import { createTheme, ThemeProvider, styled } from '@mui/material/styles'

const theme = createTheme({
      shape: {
            borderRadius: 10,
      },
      typography: {
            //htmlFontSize: 16,            
            overline: {
                  textTransform: "lowercase"
            }
      }

});

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
      <AppWrapper> 
            <ThemeProvider theme={theme}>
                  <React.StrictMode>
                        <App />
                  </React.StrictMode>
            </ThemeProvider>            
      </AppWrapper>      
);