import fs from 'fs';
import path from 'path';
import { domainLink } from '../Global-Info';

const robotsContent: string = `
# https://www.robotstxt.org/robotstxt.html
User-agent: *
Sitemap: ${domainLink}/sitemap.xml
`;

// Define the path to the build folder
const buildPath: string = path.join(__dirname, '..', '..', 'public');
const robotsPath: string = path.join(buildPath, 'robots.txt');

// Ensure the build directory exists
try {
  fs.mkdirSync(buildPath, { recursive: true });
} catch (err) {
  console.error('Error ensuring build directory exists:', err);
}

// Write the robots.txt file to the build folder
fs.writeFile(robotsPath, robotsContent, (err: NodeJS.ErrnoException | null) => {
  if (err) {
    console.error('Error writing robots.txt file:', err);
    return;
  }
  console.log('robots.txt file has been created successfully.');
});
