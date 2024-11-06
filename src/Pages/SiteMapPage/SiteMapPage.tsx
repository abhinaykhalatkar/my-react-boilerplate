

import styles from "./SiteMapPage.module.scss";
import { Link } from "react-router-dom";
import routesData, { RouteData } from "../routerData";

const generateSiteMap = (routes: RouteData[], parentPath = ''): React.ReactNode => {
  return routes.map((route) => {

    if (route.addToSiteMap === false) return null;

    const fullPath = `${parentPath}${route.path}`; // Concatenate the parent path with the route's path


    if (route.subRoutes && route.subRoutes.length > 0) {
      return (
        <li key={fullPath} className={styles.item}>
          {route.navName ? <Link to="#">{route.navName}</Link> : null}
          <ul>
            {generateSiteMap(route.subRoutes, fullPath)}
          </ul>
        </li>
      );
    }

    return (
      <li key={fullPath} className={styles.item}>
        {route.navName && <Link to={fullPath}>{route.navName}</Link>}
      </li>
    );
  });
};

const generateSubRoutes = (subRoutes: RouteData[], parentPath: string): React.ReactNode => {
  return subRoutes.map((subRoute) => {
    if (subRoute.addToSiteMap === false) return null;

    const fullPath = `${parentPath}${subRoute.path}`;
    
    return (
      <li key={fullPath} className={styles.subItem}>
        <Link to={fullPath}>{subRoute.navName}</Link>
      </li>
    );
  });
};

export default function SiteMapPage() {
  return (
    <>
      <section className={"d-flex flex-column " + styles.siteMap}>
        <h1>Sitemap</h1>
        <nav className={styles.sitemap}>
          <ul className={routesData.length>10? styles.setColumn:""}>
            {routesData.map((route) => {
              if (route.addToSiteMap === false) return null;

              const fullPath = route.path;

              if (route.subRoutes && route.subRoutes.length > 0) {
                return (
                  <li key={fullPath} className={styles.item}>
                    {route.navName ? <Link to="#">{route.navName}</Link> : null}
                    <ul>
                      {generateSubRoutes(route.subRoutes, fullPath)}
                    </ul>
                  </li>
                );
              }

              return (
                <li key={fullPath} className={styles.item}>
                  <Link to={fullPath}>{route.navName}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </section>
    </>
  );
}
