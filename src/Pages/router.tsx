import { Route, Routes } from "react-router-dom";
import { useMemo } from "react";
import Home from "./Home/Home";



const RenderRoutes = () => {
  const routesData = useMemo(
    () => [
      {
        path: "/",
        element: <Home />,
      }
    ],
    []
  );

  return (
    <Routes>
       
      {routesData.map((el, ind) => {
        return (
          <Route key={`route${ind}`} path={el.path} element={el.element} />
        );
      })}
    </Routes>
  );
};

export default RenderRoutes;
