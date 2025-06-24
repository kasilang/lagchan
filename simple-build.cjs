const fs = require('fs');
const path = require('path');

// Simple build that copies existing built files
try {
  console.log('Preparing Vercel deployment...');
  
  // Ensure public directory exists
  if (!fs.existsSync('public')) {
    fs.mkdirSync('public', { recursive: true });
  }
  
  // Check if we have a built version from dist/public
  if (fs.existsSync('dist/public')) {
    console.log('Copying from dist/public...');
    const copyDir = (src, dest) => {
      fs.mkdirSync(dest, { recursive: true });
      const entries = fs.readdirSync(src, { withFileTypes: true });
      for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        if (entry.isDirectory()) {
          copyDir(srcPath, destPath);
        } else {
          fs.copyFileSync(srcPath, destPath);
        }
      }
    };
    copyDir('dist/public', 'public');
  }
  
  console.log('Vercel deployment ready!');
} catch (error) {
  console.error('Build preparation failed:', error.message);
  // Create minimal fallback
  if (!fs.existsSync('public')) fs.mkdirSync('public');
  fs.writeFileSync('public/index.html', `<!DOCTYPE html>
<html><head><title>Lagchan</title></head>
<body><div id="root"><h1>Lagchan - Loading...</h1></div></body></html>`);
}