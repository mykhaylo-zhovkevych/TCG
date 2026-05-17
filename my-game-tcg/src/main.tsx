import { Provider } from 'react-redux'
import { store } from './store/store'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './utils/index.scss'

import Home from "@/pages/home/Home.tsx";
import PWABadge from "@/components/ui/pwa-badge/PWABadge.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <Home />
            <PWABadge />
        </Provider>
    </StrictMode>,
)
