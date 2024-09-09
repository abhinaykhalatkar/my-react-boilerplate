import { Route, Routes } from "react-router-dom";
import routesData, { RouteData } from "./routerData";
import Page404 from "./Page404/Page404";
import { ReactElement } from "react";

// to add routes and its component add the route and its flags in routerData file


const RenderRoutes = (routes: RouteData[], parentPath: string = ""): ReactElement[] => {
  return routes.map((route, index) => {
    const fullPath = `${parentPath}${route.path}`.replace("//", "/"); // Ensure paths are correctly formatted

    // If the route has subRoutes, we will render its element for the exact match and its subRoutes as nested routes.
    return (
      <Route
        key={index}
        path={fullPath}
        element={route.subRoutes ? undefined : (route.element || <Page404 />)} // Only render element if there are no subRoutes
      >
        {route.subRoutes && (
          <>
            {/* Render the parent element only when the exact parent path matches */}
            <Route index element={route.element || <Page404 />} />
            {RenderRoutes(route.subRoutes, fullPath)}
          </>
        )}
      </Route>
    );
  });
};

const AppRoutes = () => {
  return (
    <div className="container">
      <Routes>
        {RenderRoutes(routesData)}
        <Route path="*" element={<Page404 />} /> {/* Fallback for any undefined route */}
      </Routes>
    </div>
  );
};

export default AppRoutes;
