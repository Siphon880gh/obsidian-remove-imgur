// Renames imgur export of images
// which are in the format of "<numbers> - <filename>.<extension>" (Eg. 1 - MuuRftO.jpg)
// to "<filename>.<extension>"

// It will output as:
// ...
// Renamed: 635 - 0H4LNb1.png -> 0H4LNb1.png
// Renamed: 637 - RR7KQ7C.png -> RR7KQ7C.png
// Renamed: 636 - DxGbuuL.png -> DxGbuuL.png
// Renamed: 639 - 3VWnRVg.png -> 3VWnRVg.png

const fs = require('fs');
const path = require('path');
const {sourceDir} = require('./config.json');

// Read all files in the directory
fs.readdir(sourceDir, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }

    files.forEach(file => {
        // Check if file matches the pattern "<numbers> - " and is a png or jpg
        // \d+ matches one or more digits
        if (/^\d+ - /.test(file) && (file.endsWith('.png') || file.endsWith('.jpg'))) {
            const oldPath = path.join(sourceDir, file);
            // Remove "<numbers> - " from the filename using regex
            const newFileName = file.replace(/^\d+ - /, '');
            const newPath = path.join(sourceDir, newFileName);

            // Rename the file
            fs.rename(oldPath, newPath, (err) => {
                if (err) {
                    console.error(`Error renaming ${file}:`, err);
                } else {
                    console.log(`Renamed: ${file} -> ${newFileName}`);
                }
            });
        }
    });
}); 