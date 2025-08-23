import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Home from './pages/Home.jsx';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './store/store .js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthLayout, Login, SignUp } from './components/indes.js';

import AllPosts from "./pages/AllPosts";
import AddPost from "./pages/AddPost";
import EditPost from "./pages/EditPost";
import Post from "./pages/Post.jsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children:[
      {
        path:'/',
        element:<Home/>,
      },
      {
        path:'/login',
        element:(
          <AuthLayout authentication={false}>
            <Login/>
          </AuthLayout>
        )
      },
      {
        path:'/signup',
        element:(
          <AuthLayout authentication={false}>
            <SignUp/>
          </AuthLayout>
        )
      },

      {
        path:'/all-posts',
        element:(
          <AuthLayout authentication>
            {" "}
            <AllPosts/>
          </AuthLayout>
        )
      },
      {
        path:'/add-post',
        element:(
          <AuthLayout authentication>
            {" "}
            <AddPost/>
          </AuthLayout>
        )
      },
      {
        path: "/edit-post/:slug",
        element:(
          <AuthLayout authentication>
            {" "}
            <EditPost />
          </AuthLayout>
        )
      },
      {
            path: "/post/:slug",
            element: <Post />,
        },

    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
