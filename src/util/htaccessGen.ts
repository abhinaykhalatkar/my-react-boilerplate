import fs from 'fs';
import path from 'path';
import { domainLink } from '../Global-Info';


// Define the content of the .htaccess file
const htaccessContent: string = `
RewriteEngine On
RewriteCond %{SERVER_PORT} !=443
RewriteRule ^(.*)$ ${domainLink}/$1 [R=301,L]
RewriteRule ^sitemap\\.xml$ sitemap.xml [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /index.html?path=$1 [NC,L,QSA]

`;

// Define the path to the build folder
let buildPath: string = path.join(__dirname, '..', '..', 'build');
const htaccessPath: string = path.join(buildPath, '.htaccess');

// Ensure the build directory exists
fs.mkdirSync(buildPath, { recursive: true });

// Write the .htaccess file to the build folder
fs.writeFile(htaccessPath, htaccessContent, (err: NodeJS.ErrnoException | null) => {
  if (err) {
    return console.error('Error writing .htaccess file:', err);
  }
  console.log('.htaccess file has been created successfully.');
});
export {};
