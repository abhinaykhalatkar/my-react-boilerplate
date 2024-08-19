import { useContext, useEffect } from 'react';
import { AccessibilityContext } from './Context/accessibilityContext';
import './App.scss';

import AccessibilityMenu from './Components/AccessibilityMenu/AccessibilityMenu';
import RenderRoutes from './Pages/router';

function App() {
  const {fontSizeMag} = useContext(AccessibilityContext);

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSizeMag}px`;
  }, [fontSizeMag]);
  return (
    <div className="App">
      {/* <EditorMain/> */}

      <AccessibilityMenu />
      <RenderRoutes />
    </div>
  );
}

export default App;
