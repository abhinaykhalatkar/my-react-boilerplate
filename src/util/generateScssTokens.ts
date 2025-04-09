import fs from 'fs';
import path from 'path';
// Import your Tailwind config; adjust the path as needed.
import tailwindConfig from '../../tailwind.config';

// Our design tokens are defined in tailwind.config.js under theme.extend.
// We assume your tokens are the entire object defined in your config's extend.
const Variables = tailwindConfig.theme.extend;

// A function to recursively process tokens.
// If tokenObj is a primitive, output that variable with the given keyPrefix.
// If tokenObj is an object, loop through its keys and build hyphenated names.
function processTokens(tokenObj: any, keyPrefix: string = ''): string[] {
  let lines: string[] = [];

  // If it's a primitive, output directly.
  if (typeof tokenObj !== 'object' || tokenObj === null) {
    if (keyPrefix) {
      lines.push(`$${keyPrefix}: ${tokenObj};`);
    }
    return lines;
  }

  // For an object, iterate over each key.
  for (const key in tokenObj) {
    const value = tokenObj[key];
    const newKey = keyPrefix ? `${keyPrefix}-${key}` : key;
    if (typeof value === 'object' && value !== null) {
      // Recursively process nested objects.
      lines = lines.concat(processTokens(value, newKey));
    } else {
      lines.push(`$${newKey}: ${value};`);
    }
  }
  return lines;
}

// We'll output tokens for every top-level category defined in Variables.
const sections = Object.entries(Variables);
let outputLines: string[] = [];

sections.forEach(([sectionName, tokenObj]) => {
  // Add a comment for the section.
  outputLines.push(`/* ${sectionName} tokens */`);
  // For the colors section, don't prepend the section name; otherwise, use it as a prefix.
  const sectionLines =
    sectionName === 'colors'
      ? processTokens(tokenObj, '')
      : processTokens(tokenObj, sectionName);
  outputLines = outputLines.concat(sectionLines, ['']); // Blank line for separation.
});

// Define output file path (adjust directory if needed)
const outputPath = path.resolve(__dirname, '../styles/_variables.scss');

// Write the SCSS tokens file.
fs.writeFileSync(outputPath, outputLines.join('\n'), 'utf8');
console.log('✅ SCSS tokens generated at:', outputPath);
