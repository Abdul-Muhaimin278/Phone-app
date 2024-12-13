import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

// Routing and app logic mixed up. App logic must be placed in a separate component for better structure and  code clarity.

function App() {
  return <RouterProvider router={router} />;
}

export default App;
