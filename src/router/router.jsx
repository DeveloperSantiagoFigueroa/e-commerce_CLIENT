import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layout/Layout';
import Home from '../pages/Home';
import Error from '../pages/Error';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import Product from '../pages/Product';
import Favorites from '../pages/Favorites';
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
                path: '/favoritos',
                element: <Favorites />
            },

            {
                path: '/reestablecer-contraseña',
                element: <ForgotPassword />,
            },

            {
                path: '/reset-password/:token',
                element: <ResetPassword />,
            },

            {
                path: '/products/:id',
                element: <Product />,
            },

            {
                path: '*',
                element: <Error />,
            },
        ],
    },
]);
