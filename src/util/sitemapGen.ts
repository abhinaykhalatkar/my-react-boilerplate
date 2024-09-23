import fs from "fs";
import path from "path";
import routesData, { RouteData } from "../Pages/routerData"; // Adjust the path accordingly
import { domainLink } from "../Global-Info";

// Helper function to recursively collect routes that should be added to the sitemap
function collectSitemapRoutes(
  routes: RouteData[]
): { url: string; changefreq: string; priority: number }[] {
  let sitemapRoutes: { url: string; changefreq: string; priority: number }[] =
    [];

  routes.forEach((route) => {
    // If addToSiteMap is true or undefined, include it in the sitemap
    if (route.addToSiteMap !== false) {
      sitemapRoutes.push({
        url: route.path,
        changefreq: "monthly",
        priority: route.path === "/" ? 1 : 0.8, // You can customize the priority if needed
      });
    }

    // If the route has subRoutes, recursively collect them
    if (route.subRoutes) {
      sitemapRoutes = sitemapRoutes.concat(
        collectSitemapRoutes(route.subRoutes)
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
