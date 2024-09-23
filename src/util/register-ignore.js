
const Module = require('module');  // Node.js Module system

// Override how Node.js handles certain extensions (like .scss, .css, etc.)
const originalRequire = Module._extensions['.js'];

// Mock for non-JS files
const mock = () => {};

// Ignore .scss, .css, .png, and other non-JS files
Module._extensions['.scss'] = mock;
Module._extensions['.css'] = mock;
Module._extensions['.png'] = mock;
Module._extensions['.jpg'] = mock;
Module._extensions['.jpeg'] = mock;
Module._extensions['.gif'] = mock;
Module._extensions['.svg'] = mock;

// Continue using default behavior for other JS/TS files
Module._extensions['.js'] = originalRequire;