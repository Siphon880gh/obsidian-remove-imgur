const axios = require('axios');
const fs = require('fs');
const path = require('path');
const {imageListString} = require('./config.js');

const timeBetweenDownload = 2250;
const timeAppendMinRange = 0;
const timeAppendMaxRange = 250;

let i = 0;
const total = imageListString.trim().split('\n').length;

// Function to download an image
async function downloadImage(imageName) {
  const url = `https://i.imgur.com/${imageName}`;
  const filePath = path.resolve(__dirname, 'downloaded', imageName);

  try {
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream'
    });

    response.data.pipe(fs.createWriteStream(filePath));
    i++;
    console.log(`Downloaded ${i}/${total}: ${imageName}`);
    return true; // Indicate success
  } catch (error) {
    console.error(`Error downloading ${imageName}:`, error.message);
    return false; // Indicate failure
  }
}

// Function to count files in a directory
function countFilesInDirectory(directory) {
  return fs.readdirSync(directory).length;
}

// Main function to process the images
async function processImages(imageList) {
  const downloadedDir = path.resolve(__dirname, 'downloaded');
  
  // Count files before downloading
  const initialFileCount = countFilesInDirectory(downloadedDir);
  console.log(`Initial file count: ${initialFileCount}`);

  let successfulDownloads = 0;

  for (const imageName of imageList) {
    const success = await downloadImage(imageName);
    if (success) {
      successfulDownloads++;
    }
    const finalTimeBetweenDownload = timeBetweenDownload + Math.floor(Math.random() * timeAppendMaxRange) + timeAppendMinRange;
    await new Promise(resolve => setTimeout(resolve, finalTimeBetweenDownload)); // Wait for 3 seconds
  }

  // Count files after downloading
  const finalFileCount = countFilesInDirectory(downloadedDir);
  console.log(`Final file count: ${finalFileCount}`);
  console.log(`Files successfully downloaded: ${successfulDownloads}`);
}

// Convert the multiline string to an array of image names
const imageList = imageListString.trim().split('\n');

// Ensure the 'downloaded' directory exists
if (!fs.existsSync(path.resolve(__dirname, 'downloaded'))) {
  fs.mkdirSync(path.resolve(__dirname, 'downloaded'));
}

// Start processing the images
processImages(imageList); 