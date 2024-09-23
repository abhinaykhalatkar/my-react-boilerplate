import fs from 'fs';
import path from 'path';
import { domainLink } from '../Global-Info';

// Define the content of the roboto.txt file
const robotsContent = `
# https://www.robotstxt.org/robotstxt.html
User-agent: *
Sitemap: ${domainLink}/sitemap.xml
`;

// Define the path to the build folder
const buildPath = path.join(__dirname, '..', '..', 'build');
const robotsPath = path.join(buildPath, 'robots.txt');

// Ensure the build directory exists
fs.mkdirSync(buildPath, { recursive: true });

// Write the roboto.txt file to the build folder
fs.writeFile(robotsPath , robotsContent, (err: NodeJS.ErrnoException | null)=> {
  if (err) {
    return console.log('Error writing roboto.txt file:', err);
  }
  console.log('roboto.txt file has been created successfully.');
});
export {};