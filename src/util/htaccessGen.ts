import * as fs from 'fs';
import * as path from 'path';

// Define the content of the .htaccess file
const htaccessContent: string = `
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteCond %{HTTP_HOST} !^www\. [NC]
RewriteCond %{HTTP_HOST} !^cms\. [NC]
RewriteRule ^ %{REQUEST_SCHEME}://www.%{HTTP_HOST}%{REQUEST_URI} [R=301,L]
RewriteBase /
RewriteRule ^sitemap\.xml$ sitemap.xml [L]

# Rewrite rule for mailer-api to point to contactmail.php
RewriteCond %{REQUEST_URI} ^/mailer-api/?$ [NC]
RewriteRule ^ mailer-api/contactmail.php [L]

# Allow files in the mailer-api folder to be accessed directly
RewriteCond %{REQUEST_URI} ^/mailer-api/.*$ [NC]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ mailer-api/%{REQUEST_URI} [L]

# React app routing
RewriteRule ^index.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-l
RewriteRule . /index.html [L]

</IfModule>
`;


// Define the path to the build folder
const buildPath: string = path.join(__dirname, '..', '..', 'public');
const htaccessPath: string = path.join(buildPath, '.htaccess');

// Ensure the build directory exists
try {
  fs.mkdirSync(buildPath, { recursive: true });
} catch (err) {
  console.error('Error ensuring build directory exists:', err);
}

// Write the .htaccess file to the build folder
fs.writeFile(htaccessPath, htaccessContent, (err: NodeJS.ErrnoException | null) => {
  if (err) {
    console.error('Error writing .htaccess file:', err);
    return;
  }
  console.log('.htaccess file has been created successfully.');
});




//const htaccessContent = `
//RewriteEngine On
//RewriteCond %{SERVER_PORT} !=443
//RewriteRule ^(.*)$ https://www.ipa-pflegedienst.de/$1 [R=301,L]
//RewriteRule ^sitemap\\.xml$ sitemap.xml [L]
//RewriteCond %{REQUEST_FILENAME} !-f
//RewriteCond %{REQUEST_FILENAME} !-d
//RewriteRule ^(.*)$ /index.html?path=$1 [NC,L,QSA]

//`;

// import fs from 'fs';
// import path from 'path';
// import { domainLink } from '../Global-Info';


// // Define the content of the .htaccess file
// const htaccessContent: string = `
// RewriteEngine On
// RewriteCond %{SERVER_PORT} !=443
// RewriteRule ^(.*)$ ${domainLink}/$1 [R=301,L]
// RewriteRule ^sitemap\\.xml$ sitemap.xml [L]
// RewriteCond %{REQUEST_FILENAME} !-f
// RewriteCond %{REQUEST_FILENAME} !-d
// RewriteRule ^(.*)$ /index.html?path=$1 [NC,L,QSA]

// `;

// // Define the path to the build folder
// let buildPath: string = path.join(__dirname, '..', '..', 'build');
// const htaccessPath: string = path.join(buildPath, '.htaccess');

// // Ensure the build directory exists
// fs.mkdirSync(buildPath, { recursive: true });

// // Write the .htaccess file to the build folder
// fs.writeFile(htaccessPath, htaccessContent, (err: NodeJS.ErrnoException | null) => {
//   if (err) {
//     return console.error('Error writing .htaccess file:', err);
//   }
//   console.log('.htaccess file has been created successfully.');
// });
// export {};
