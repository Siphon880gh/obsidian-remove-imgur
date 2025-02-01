const fs = require('fs');
const path = require('path');

const folderPath = './Document Vaults/';

function stripImgurLinks(directory) {
    fs.readdir(directory, (err, files) => {
        if (err) {
            console.error(`Error reading directory: ${err}`);
            return;
        }

        files.forEach(file => {
            const fullPath = path.join(directory, file);
            fs.stat(fullPath, (err, stats) => {
                if (err) {
                    console.error(`Error stating file: ${err}`);
                    return;
                }

                if (stats.isDirectory()) {
                    // Recursively search in subdirectory
                    stripImgurLinks(fullPath);
                } else if (stats.isFile() && (file.endsWith('.md') || file.endsWith('.txt'))) {
                    // Read and process the file
                    fs.readFile(fullPath, 'utf8', (err, data) => {
                        if (err) {
                            console.error(`Error reading file: ${err}`);
                            return;
                        }

                        const updatedData = data.replace(/https:\/\/i\.imgur\.com\//g, '').replace(/�/g, ' ');
                        // Write to file only if it's been modified
                        if (data !== updatedData) {
                            fs.writeFile(fullPath, updatedData, 'utf8', (err) => {
                                if (err) {
                                    console.error(`Error writing file: ${err}`);
                                } else {
                                    console.log(`Processed file: ${fullPath}`);
                                }
                            });
                        }
                    });
                }
            });
        });
    });
}

// Start the process from the folderPath directory
stripImgurLinks(folderPath);
