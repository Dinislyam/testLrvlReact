import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Button from '@mui/material/Button'; // Импортируем компонент Button
import AbsenceForm from './Pages/AbsenceForm.jsx';
const routes = [
    {
        path: '/',
        element: (
            <div>
                <AbsenceForm/>
            </div>
        ),
    }
];

createRoot(document.getElementById('root')).render(
    <RouterProvider router={createBrowserRouter(routes)} />
);
