import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home';
import UserForm from './pages/form';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/create",
      element: <UserForm />,
    },
    {
      path: "/edit/:id",
      element: <UserForm />,
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
