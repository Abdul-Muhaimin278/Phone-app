import { createBrowserRouter, Navigate } from "react-router-dom";
import CallScreen from "../pages/CallScreen";
import DialPad from "../pages/DialPad";
import RecentLog from "../pages/RecentLog";
import { PhoneLayout } from "../layout/PhoneLayout";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <PhoneLayout />,
    children: [
      { path: "/dial", element: <DialPad /> },
      { path: "/recent", element: <RecentLog /> },
      { path: "*", element: <Navigate to="/dial" replace /> },
    ],
  },
  { path: "/call", element: <CallScreen /> },
]);
