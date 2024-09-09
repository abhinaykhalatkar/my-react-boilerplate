import { ReactElement } from "react";
import Page404 from "./Page404/Page404";
import Home from "./Home/Home";
import SiteMapPage from "./SiteMapPage/SiteMapPage";
import Datenschutz from "./Datenschutz/Datenschutz";
import Impressum from "./Impressum/Impressum";


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
        navName: "Start",
    },

    {
        path: "/Site-Navigation",
        element: <SiteMapPage />,
        addToNav: true,
        addToSiteMap:false,
        navName: "Site-Map",
    },
    //example for subRoutes
    // {
    //     path: "/check-up",
    //     // element: <CheckUpMain />,
    //     navName: "Check-ups",
    //     subRoutes: [
    //         { path: "/bronze", element: <Bronze />, navName: "Bronze", },
    //         { path: "/silber", element: <Silber />, navName: "Silber" },
    //         { path: "/gold",addToNav: true, element: <Gold />, navName: "Gold" },
    //         { path: "/platin", addToNav: true,element: <Platin />, navName: "Platin" },
    //     ],
    // },
    {
        path: "/datenschutz",
        element: <Datenschutz />,
        addToNav: true,
        navName: "Datenschutz",
    },
    {
        path: "/impressum",
        element: <Impressum />,
        addToNav: true,
        navName: "Impressum",
    },
    {
        path: "*",
        element: <Page404 />,
        addToNav: false,
        addToSiteMap:false,
    },

];

export default routesData;