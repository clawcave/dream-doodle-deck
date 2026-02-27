import React from 'react'
import ReactDOM from 'react-dom/client'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './App'
import CapturePage from './pages/CapturePage'
import GalleryPage from './pages/GalleryPage'
import RemixPage from './pages/RemixPage'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Navigate to="/capture" replace /> },
      { path: 'capture', element: <CapturePage /> },
      { path: 'gallery', element: <GalleryPage /> },
      { path: 'remix', element: <RemixPage /> },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
