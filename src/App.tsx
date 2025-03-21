import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import './App.scss';
import AccessibilityMenu from './Components/AccessibilityMenu/AccessibilityMenu';
import AppRoutes from './Pages/router';
import ScrollToTopFunction from "./Components/TopButton/ScrollToTopButton"
// import EditorMain from './Components/Editor/EditorMain';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import CookieConsentForm from './Components/CookieConsent/CookieConsent';
// import { usePageTracking } from './Components/GoogleTagManager/usePageTracking';

const App: React.FC = () => {
  const fontSizeMag = useSelector((state: RootState) => state.accessibility.fontSizeMag);

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
