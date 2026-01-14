// imports
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import './index.css';
import App from './App.tsx';
import Dashboard from './assets/pages/Dashboard.tsx';
import AddBurger from './assets/pages/AddBurger.tsx';
import PageLayout from './assets/components/global/PageLayout.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route element={<App />}>
                    <Route element={<PageLayout />}>
                        <Route index element={<Dashboard />} />
                        <Route path="add-burger" element={<AddBurger />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    </StrictMode>,
);
