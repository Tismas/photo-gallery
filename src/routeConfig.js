import App from './components/App';
import Home from './components/Home';
import User from './components/User';

const routeConfig = [
    {
        path: '/',
        Component: App,
        children: [
            {
                path: '/',
                Component: Home,
            },
            {
                path: '/user/:id',
                Component: User,
            }
        ]
    },
];

export { routeConfig };