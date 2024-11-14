import fs from "fs";
import path from "path";
import routesData, { RouteData } from "../Pages/routerData";
import { domainLink } from "../Global-Info";

function collectSitemapRoutes(
  routes: RouteData[],
  parentPath: string = ""
): { url: string; changefreq: string; priority: number }[] {
  let sitemapRoutes: { url: string; changefreq: string; priority: number }[] =
  [];


  routes.forEach((route) => {
    let routePath = route.path;

    // Handle the root path "/"
    if (routePath === "/") {
      routePath = "";
    } else if (routePath.startsWith("/")) {
      // Remove leading '/'
      routePath = routePath.slice(1);
    }

    // Construct the full path
    let fullPath = path.posix.join(parentPath, routePath);

    // If fullPath is "." or empty, set it to "/"
    if (fullPath === "." || fullPath === "") {
      fullPath = "/";
    } else {
      // Ensure the path starts with '/'
      fullPath = fullPath.startsWith("/") ? fullPath : `/${fullPath}`;
    }

    // Include in sitemap if 'addToSiteMap' is not false
    if (route.addToSiteMap !== false) {
      sitemapRoutes.push({
        url: fullPath,
        changefreq: fullPath === "/" ? "daily" : "monthly",
        priority: fullPath === "/" ? 1 : 0.8,
      });
    }

    // Recursively collect sub-routes
    const newParentPath = fullPath === "/" ? "" : fullPath;
    if (route.subRoutes) {
      sitemapRoutes = sitemapRoutes.concat(
        collectSitemapRoutes(route.subRoutes, newParentPath)
      );
    }
  });

  return sitemapRoutes;
}

// Collect the routes for the sitemap
const urls = collectSitemapRoutes(routesData);

// Generate the sitemap XML content
const sitemap: string = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) =>
      `<url><loc>${domainLink}${url.url}</loc><changefreq>${url.changefreq}</changefreq><priority>${url.priority}</priority></url>`
  )
  .join("\n")}
</urlset>`;

// Define the output directory and the file path for the sitemap
const buildPath: string = path.join(__dirname, "..", "..", "public"); // Adjust the build path if necessary
const sitemapPath: string = path.join(buildPath, "sitemap.xml");

// Ensure the build directory exists
fs.mkdirSync(buildPath, { recursive: true });

// Write the sitemap.xml file to the build folder
fs.writeFileSync(sitemapPath, sitemap);

console.log("Sitemap generated successfully!");
export {};