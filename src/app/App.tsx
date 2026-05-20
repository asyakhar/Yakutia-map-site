import { RouterProvider } from "react-router";
import { router } from "./routes";
import { AccessibilityProvider } from "./context/AccessibilityContext";
import { AccessibilityToggle } from "./components/AccessibilityToggle";

export default function App() {
  return (
    <AccessibilityProvider>
      <AccessibilityToggle />
      <RouterProvider router={router} />
    </AccessibilityProvider>
  );
}
