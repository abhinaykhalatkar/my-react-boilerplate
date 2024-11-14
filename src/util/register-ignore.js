const Module = require('module'); // Node.js Module system

// Mock function for ignored extensions
const mock = () => {};

// List of extensions to ignore
const extensionsToIgnore = [
  '.scss',
  '.css',
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.svg',
  '.webp',
  '.mp4',
];

// Ignore the specified extensions
extensionsToIgnore.forEach((ext) => {
  Module._extensions[ext] = mock;
});
