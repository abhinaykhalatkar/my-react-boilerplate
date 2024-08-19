
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { AccessibilityProvider } from "./Context/accessibilityContext";
import { HelmetProvider } from "react-helmet-async";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const helmetContext = {};
root.render(
  <HelmetProvider context={helmetContext}>
    <AccessibilityProvider>
    <BrowserRouter>
      <App />
      </BrowserRouter>
    </AccessibilityProvider>
  </HelmetProvider>
);

