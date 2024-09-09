import { useContext, useEffect } from 'react';
import { AccessibilityContext } from './Context/accessibilityContext';
import './App.scss';
import AccessibilityMenu from './Components/AccessibilityMenu/AccessibilityMenu';
import AppRoutes from './Pages/router';
import ScrollToTopFunction from "./Components/TopButton/ScrollToTopButton"
// import EditorMain from './Components/Editor/EditorMain';
import Header from './Components/Header/Header';
function App() {
  const {fontSizeMag} = useContext(AccessibilityContext);

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSizeMag}px`;
  }, [fontSizeMag]);
  return (
    <div className="App">
      {/* <EditorMain/> */}
      <ScrollToTopFunction />
      <AccessibilityMenu />
      <Header/>
      <AppRoutes />
    </div>
  );
}

export default App;
