import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import './index.css'
import App from './App.tsx'

const customTheme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        bg: '#121212',
        color: '#E0E0E0',
        fontFamily: 'Arial, sans-serif',
      },
      a: {
        color: '#BB86FC',
        _hover: {
          textDecoration: 'underline',
        },
      },
    },
  },
  colors: {
    brand: {
      50: '#E0E0E0',
      100: '#C7C7C7',
      200: '#AFAFAF',
      300: '#979797',
      400: '#7F7F7F',
      500: '#666666',
      600: '#4D4D4D',
      700: '#353535',
      800: '#1C1C1C',
      900: '#121212',
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider theme={customTheme}>
      <App />
    </ChakraProvider>
  </StrictMode>,
)
