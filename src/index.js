import '@fontsource/rubik/400.css'
import '@fontsource/rubik/500.css'
import '@fontsource/rubik/600.css'
import '@fontsource/rubik/700.css'
import '@fontsource/rubik/800.css'
import '@fontsource/rubik/900.css'

import { ChakraProvider } from '@chakra-ui/react';
import WebSocketProvider from "./components/WebSocketProvider";
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { GoogleOAuthProvider } from '@react-oauth/google'
import { theme } from './theme';
import './theme/index.css'
import "swiper/css";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={"1084793601660-rfg75p41qos2mi57huibssr91qoai1pg.apps.googleusercontent.com"}>
    <PayPalScriptProvider options={{ clientId: 1, intent: "capture", currency: "ILS" }}>
    <WebSocketProvider>
    <ChakraProvider theme={theme}>
    <App />
    </ChakraProvider>
    </WebSocketProvider>
    </PayPalScriptProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

reportWebVitals();