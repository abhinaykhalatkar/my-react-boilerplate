# Getting Started with My React Boilerplate

# Table of Contents

1. [Installation](#installation)
2. [Available Scripts](#available-scripts)
   - [npm start](#npm-start)
   - [npm run build](#npm-run-build)
   - [npm run prodBuild](#npm-run-prodbuild)
3. [Broken Documentation 😅](#broken-documentation-)
   - [Routing](#routing)
   - [Header Component](#header-component)
   - [Cookie Consent](#cookie-consent)

---

## Installation
- [x] rename .env.example file in root directory to .env 
- [x] run npm install in root

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`
to make build folder for live test server (dosent contain robot.txt and sitemap.xml)

### `npm run prodBuild`
(build process uses ts-node for running util ts files. they are not part of build script except for output files such as .htaccess, sitemap.xml and robots.txt)
for building production ready build files contains the .htaccess file (for apache server) , sitemap.xml and robots.txt file from util. any changes to make to this files can be made from util directory in there respective ts files. 

## Broken Documentation 😅
#### routing

all routing is done recursively for navbar, react-router-dom,sitemap.xml, sidebar component.
so the routes must be set in **routerData.tsx** file in the Pages directory. router.tsx is responsible for creating routes based on routesData in routerData.tsx.

flags and optional flags from creating routes in given route file.

**Allows recursive nesting**

```
RouteData {
    path: string;
    element?: ReactElement;
    navName?: string;
    addToNav?: boolean;
    addToSideBar?: boolean;
    addToSiteMap?: boolean;
    pageTitle?: string;
    pageDescription?: string;
    pageKeyWords?: string;
    subRoutes?: RouteData[];
}
```
#### Header component 
 custom component can be added with other router links in Header.tsx

 inside Header there is a Nav component which is responsible for rendering nav from routeData

 NavBar has a flag to set Underline animation to nav element .by default its turned on and can be turned off with showNavUnderline=false on Nav component

#### Cookie Consent

you can remove the cookie consent form which is enable by default. its part of app.tsx .

```
export enum Consents {
  Analytics = "consent_analytics",
  Marketing = "consent_marketing",
  Functional = "consent_functional"
}
```
if more cookie needs to be added they must be added as a part of enum type given in cookieConsent.tsx component .in the same file more selection checkbox can be added .should follow the format of previously given consent checkbox.

consent_analytics flag is responsible to switch on Google tag manager. if GTM needed you need to create .env file and pass the gtm id to variable REACT_APP_GTM_ID in env file.

consent are save as cookie in local storage .
also for conversion pixel of gtm usePageTracking hook can be used which need to be uncommented in app.tsx to use. this passes the conversion pixel data to data layer and then passed on to GTM

#### Copy file
use copyToBuild.ts in util to add path of file or directory to copy them to build folder after react build is done.
example structure 
```
copyList= [
//starts from project root
    {
        source: path.join(rootDir, 'mailer-api'),
        destination: path.join(buildDir, 'mailer-api')
    },
    {
        source: path.join(rootDir, '.env'),
        destination: path.join(buildDir, 'mailer-api/.env')
    }
];
```
#### global-info.ts for global variables
global-info.ts contains companyPhoneNumber, companyEmail, companyName etc along with **domainLink** which is used to build roboto.txt file and sitemap.xml file 