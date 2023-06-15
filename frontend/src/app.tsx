import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthPage, ProfilePage, RootPage } from "./modules";
import { Provider } from "react-redux";
import { store } from "./app/store/store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
]);

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};
