const fs = require('fs');
const path = require('path');

// Define the content of the .htaccess file
const htaccessContent = `
RewriteEngine On
RewriteCond %{SERVER_PORT} !=443
RewriteRule ^(.*)$ https://www.ipa-pflegedienst.de/$1 [R=301,L]
RewriteRule ^sitemap\\.xml$ sitemap.xml [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /index.html?path=$1 [NC,L,QSA]

`;

// Define the path to the build folder
const buildPath = path.join(__dirname, '..', '..', 'build');
const htaccessPath = path.join(buildPath, '.htaccess');

// Ensure the build directory exists
fs.mkdirSync(buildPath, { recursive: true });

// Write the .htaccess file to the build folder
fs.writeFile(htaccessPath, htaccessContent, (err) => {
  if (err) {
    return console.log('Error writing .htaccess file:', err);
  }
  console.log('.htaccess file has been created successfully.');
});
