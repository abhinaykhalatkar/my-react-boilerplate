import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@Store/store';
import './App.scss';
import AccessibilityMenu from './Components/UI/AccessibilityMenu/AccessibilityMenu';
import AppRoutes from './Pages/router';
import ScrollToTopFunction from "./Components/UI/TopButton/ScrollToTopButton"
// import EditorMain from './Components/Editor/EditorMain';
import Header from './Components/UI/Header/Header';
import Footer from './Components/UI/Footer/Footer';
import CookieConsentForm from './Components/UI/CookieConsent/CookieConsent';
import ResponsiveUpdaterOnResize from '@Util/ResponsiveUpdaterOnResize/ResponsiveUpdaterOnResize';
// import { usePageTracking } from './Components/GoogleTagManager/usePageTracking';

const App: React.FC = () => {
  const fontSizeMag = useSelector((state: RootState) => state.accessibility.fontSizeMag);

  // usePageTracking()
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSizeMag}px`;
  }, [fontSizeMag]);
  return (
    <div className="App min-h-screen flex flex-col dark:bg-bg-dark dark:text-text-darkContentText overflow-y-hidden" id='AppContent'>

      <ResponsiveUpdaterOnResize />
      {/* <EditorMain/> */}
      <CookieConsentForm />
      {/* git test */}
      <ScrollToTopFunction />
      <AccessibilityMenu />
      <Header />
      <div className='flex-grow '>
        <AppRoutes />
      </div>
      <Footer />
    </div>
  );
}

export default App;
