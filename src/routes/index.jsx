import { createBrowserRouter } from "react-router-dom";
import CallScreen from "../pages/CallScreen";
import DialPad from "../pages/DialPad";
import RecentLog from "../pages/RecentLog";
import { PhoneLayout } from "../layout/PhoneLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PhoneLayout />,
    children: [
      { path: "/dial", element: <DialPad /> },
      { path: "/recent", element: <RecentLog /> },
    ],
  },
  { path: "/call", element: <CallScreen /> },
]);
