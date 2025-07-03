import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toast } from 'react-frontier';
import 'frontier-css/css/frontier.css'

const Router = createBrowserRouter([

])

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<Toast.Provider defaultOptions={{ duration: 8000 }}>
		<RouterProvider router={Router} />
	</Toast.Provider>
);