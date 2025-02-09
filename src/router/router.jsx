import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layout/Layout';
import Home from '../pages/Home';
import Error from '../pages/Error';
import ForgotPassword from '../layout/ForgotPassword';
export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <Error />,
        children: [
            {
                path: '/',
                element: <Home />,
            },

            {
                path: '/reestablecer-contraseña',
                element: <ForgotPassword />
            },

            {
                path: '*',
                element: <Error />,
            }
        ],
    },
]);
