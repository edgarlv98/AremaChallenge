import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toast } from 'react-frontier';
import 'frontier-css/css/frontier.css';
import ButtonTestPage from './pages/ButtonTestPage.tsx';
import RegexJsPage from './pages/RegexJsPage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import SignUpPage from './pages/SignUpPage.tsx';
import WelcomePage from './pages/WelcomePage.tsx';

const Router = createBrowserRouter([
	{
		path: '/',
		element: <WelcomePage />
	},
	{
		path: 'buttonTestPage',
		element: <ButtonTestPage />
	},
	{
		path: 'regexJS',
		element: <RegexJsPage />
	},
	{
		path: 'login',
		element: <LoginPage />
	},
	{
		path: 'signup',
		element: <SignUpPage />
	}
]);

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<Toast.Provider defaultOptions={{ duration: 8000 }}>
		<RouterProvider router={Router} />
	</Toast.Provider>
);