// router.tsx
import { Route, Routes } from 'react-router-dom';
import routesData, { RouteData } from './routerData';
import Page404 from './Page404/Page404';
import { ReactElement } from 'react';
import MetaWrapper from './MetaWrapper'; // Import MetaWrapper

const RenderRoutes = (
  routes: RouteData[],
  parentPath: string = ''
): ReactElement[] => {
  return routes.map((route, index) => {
    const fullPath = `${parentPath}${route.path}`.replace('//', '/'); // Ensure paths are correctly formatted

    // Wrap the route's element with MetaWrapper to inject meta tags
    const routeElement = route.element ? (
      <MetaWrapper
        element={route.element}
        pageTitle={route.pageTitle}
        pageDescription={route.pageDescription}
        pageKeywords={route.pageKeyWords}
      />
    ) : (
      <Page404 />
    );

    // If the route has subRoutes, render them recursively
    return (
      <Route
        key={index}
        path={fullPath}
        element={route.subRoutes ? undefined : routeElement}
      >
        {route.subRoutes && (
          <>
            {/* Render the parent element only when the exact parent path matches */}
            <Route index element={routeElement} />
            {RenderRoutes(route.subRoutes, fullPath)}
          </>
        )}
      </Route>
    );
  });
};

const AppRoutes = () => {
  return (
    <Routes>
      {RenderRoutes(routesData)}
      <Route path="*" element={<Page404 />} /> {/* Fallback for any undefined route */}
    </Routes>
  );
};

export default AppRoutes;
