import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import'../node_modules/bootstrap/dist/css/bootstrap.min.css'
import'../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import'../node_modules/@fortawesome/fontawesome-free/css/all.min.css'
import './index.css';
import UserContxetProvider from './userContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from "react-query/devtools";
import CodeContextProvider from './Code';
import WishListContextProvider from './WishContext';


let queryClient=new QueryClient()
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <QueryClientProvider client={queryClient}>
<CodeContextProvider>


    <UserContxetProvider >
    <WishListContextProvider>

    <App />
    <ReactQueryDevtools position='bottom-right' />
    </WishListContextProvider>


    </UserContxetProvider>
    </CodeContextProvider>
    </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
