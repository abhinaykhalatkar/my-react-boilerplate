import { useContext, useEffect } from 'react';
import { AccessibilityContext } from './Context/accessibilityContext';
import './App.scss';
import AccessibilityMenu from './Components/AccessibilityMenu/AccessibilityMenu';
import AppRoutes from './Pages/router';
import ScrollToTopFunction from "./Components/TopButton/ScrollToTopButton"
// import EditorMain from './Components/Editor/EditorMain';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import CookieConsentForm from './Components/CookieConsent/CookieConsent';
// import { usePageTracking } from './Components/GoogleTagManager/usePageTracking';

function App() {
  const { fontSizeMag } = useContext(AccessibilityContext);
  // usePageTracking()
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSizeMag}px`;
  }, [fontSizeMag]);
  return (
    <div className="App">
      {/* <EditorMain/> */}
      <CookieConsentForm />
      {/* git test */}
      <ScrollToTopFunction />
      <AccessibilityMenu />
      <Header />
      <div className='pageBody'>
        <AppRoutes />
      </div>
      <Footer />
    </div>
  );
}

export default App;
