const fs = require('fs');
const path = require('path');
const glob = require('glob');

const scriptTag = '<script src="/dashboard-console-capture.js"></script>';

function injectScript(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (content.includes('dashboard-console-capture.js')) {
    console.log(`Already injected: ${filePath}`);
    return;
  }
  
  if (content.includes('</head>')) {
    content = content.replace('</head>', `  ${scriptTag}\n</head>`);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Injected script into: ${filePath}`);
  }
}

const htmlFiles = glob.sync('.next/**/*.html');
htmlFiles.forEach(injectScript);

console.log('Console capture script injection complete!');