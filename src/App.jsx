import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";

// Routing and app logic mixed up. App logic must be placed in a separate component for better structure and  code clarity.

function App() {
  return <RouterProvider router={routes} />;
}

export default App;
