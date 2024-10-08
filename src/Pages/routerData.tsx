import { ReactElement } from "react";
import Page404 from "./Page404/Page404";
import Home from "./Home/Home";
import SiteMapPage from "./SiteMapPage/SiteMapPage";
import Datenschutz from "./Datenschutz/Datenschutz";
import Impressum from "./Impressum/Impressum";
import Gallery from "./Gallery/Gallery";
import Contact from "./Contact/Contact";


export interface RouteData {
    path: string;
    element?: ReactElement;
    navName?: string;
    addToNav?: boolean;
    addToSideBar?: boolean;
    addToSiteMap?:boolean;
    subRoutes?: RouteData[];
    // Allow recursive nesting
}


//parent routes having sub routes dosent have to have component , if such routes are accessed 404 page will be shown. but adding component is also possible
//addToNav: true, set in order to make it part of nav, dont add the flag to sub routes as styling NOT done yet
const routesData: RouteData[] = [
    {
        path: "/",
        element: <Home />,
        navName: "Home",
    },

    {
        path: "/Site-Navigation",
        element: <SiteMapPage />,
        addToNav: true,
        addToSiteMap:false,
        addToSideBar:false,
        navName: "Site-Map",
    },
    //example for subRoutes
    {
        path: "/Test-Link",
        // element: <CheckUpMain />,
        navName: "Drop Down",
        subRoutes: [
            { path: "/subLink1", element: <SiteMapPage />, navName: "Link 1", },
            { path: "/subLink2", element: <SiteMapPage />, navName: "Link 2" },
            { path: "/subLink3",addToNav: true, element: <SiteMapPage />, navName: "Link 3" },
            { path: "/subLink4", addToNav: true,element: <SiteMapPage />, navName: "Link 4" },
        ],
    },
    {
        path: "/gallery",
        element: <Gallery />,
        navName: "Gallery",
    },
    {
        path: "/contact",
        element: <Contact />,
        navName: "Contact",
    },
    {
        path: "/datenschutz",
        element: <Datenschutz />,
        navName: "Datenschutz",
    },
    {
        path: "/impressum",
        element: <Impressum />,
        addToNav: false,
        addToSideBar:false,
        navName: "Impressum",
    },
    {
        path: "*",
        element: <Page404 />,
        addToNav: false,
        addToSideBar:false,
        addToSiteMap:false,
    },

];

export default routesData;