# Getting Started with My React Boilerplate

### Why I Built This Boilerplate?

**I created this React boilerplate to make it easier for myself (and others) to start new projects without having to set everything up from scratch. My goal was to build something that offers good performance and SEO optimizations, even though I’m continually working to improve it. By incorporating static implementations, this setup aims to provide a solid starting point for building production-ready applications that can scale as needed.**


## Installation

- [x] run npm install in root
- [x] cd to src directory
- [x] rename components to Components
- [x] cd back to root directory

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run prodBuild`
(build process uses ts-node for running util ts files. they are not part of build script except for output files such as .htaccess, sitemap.xml and robots.txt)
for building production ready build files containes the .htaccess file (for apache server) , sitemap.xml and robots.txt file from util. any changes to make to this files can be made from util directory in there respective ts files. 

## Broken Documentation 😅
#### routing

all routing is done recursivly for navbar, react-router-dom,sitemap.xml, sidebar component.
so the routes must be set in **routerData.tsx** file in the Pages directory. router.tsx is responsible for creating routes based on routesData in routerData.tsx.

flags and optional flags from creating routes in given route file .

**Allows recursive nesting**

```
type RouteData {
    path: string;
    element?: ReactElement;
    navName?: string;
    addToNav?: boolean;
    addToSideBar?: boolean;
    addToSiteMap?:boolean;
    subRoutes?: RouteData[]; 
}
```
#### Header component 
 custom component can be added with other router links in Header.tsx

 inside Header there is a Nav component which is resposible for rendering nav from routeData

 NavBar has a flag to set Underline animation to nav element .by default its turned on and can be turned off with showNavUnderline=false on Nav component


