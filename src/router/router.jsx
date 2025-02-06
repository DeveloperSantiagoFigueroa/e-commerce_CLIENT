import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layout/Layout';
import Navbar from '../components/Navbar';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <></>,
            },
        ],
    },
]);
