const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

  const assetsDir = path.join(__dirname, 'assets');
  const compressedDir = path.join(__dirname, 'compressed');

  if (!fs.existsSync(compressedDir)) {
    fs.mkdirSync(compressedDir);
  }

  fs.readdir(assetsDir, (err, files) => {
    if (err) {
      console.error('Error reading assets directory:', err);
      return;
    }

    files.forEach(file => {
      const filePath = path.join(assetsDir, file);
      const compressedFilePath = path.join(compressedDir, file);


      if (file.match(/\.(jpg|jpeg|png|gif|tif|tiff)$/i)) {
        const originalSize = fs.statSync(filePath).size;
        let command = '';


      // ToDo: TIFF files compression

        exec(command, (error, stdout, stderr) => {
          if (error) {
            console.error(`Error compressing ${filePath}:`, error);
            fs.copyFileSync(filePath, compressedFilePath);
            console.log(`Copied original file ${filePath} to ${compressedFilePath} due to compression error`);
          } else {
            const compressedSize = fs.statSync(compressedFilePath).size;
            if (compressedSize < originalSize) {
              console.log(`Compressed ${filePath} saved to ${compressedFilePath}`);
              console.log(`Original size: ${originalSize} bytes, Compressed size: ${compressedSize} bytes`);
            } else {
              fs.copyFileSync(filePath, compressedFilePath);
              console.log(`Copied original file ${filePath} to ${compressedFilePath} (compression did not reduce file size)`);
            }
          }
        });
      }
    });
  });
