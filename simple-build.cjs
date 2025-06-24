const fs = require('fs');
const path = require('path');

// Build for Vercel - clean and copy assets
try {
  console.log('Preparing Vercel deployment...');
  
  // Clean up old Netlify artifacts
  const netlifyFiles = ['public/_redirects', 'public/netlify.toml', 'public/index-build.html'];
  netlifyFiles.forEach(file => {
    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
      console.log(`Removed ${file}`);
    }
  });
  
  // Ensure public directory exists
  if (!fs.existsSync('public')) {
    fs.mkdirSync('public', { recursive: true });
  }
  
  // Make sure assets directory exists
  if (!fs.existsSync('public/assets')) {
    fs.mkdirSync('public/assets', { recursive: true });
  }
  
  // Check if we have a built version from dist/public
  if (fs.existsSync('dist/public')) {
    console.log('Copying from dist/public...');
    const copyDir = (src, dest) => {
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
      }
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
  
  // Ensure index.html exists and is properly configured for Vercel
  const indexPath = 'public/index.html';
  if (!fs.existsSync(indexPath)) {
    console.log('Creating index.html...');
    fs.writeFileSync(indexPath, `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Lagchan - Anonymous Imageboard</title>
    <script type="module" crossorigin src="/assets/index-B18QPRFz.js"></script>
    <link rel="stylesheet" crossorigin href="/assets/index-CtQI-dh7.css">
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`);
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