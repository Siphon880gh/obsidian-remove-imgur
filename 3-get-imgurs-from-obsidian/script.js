const fs = require('fs');
const path = require('path');
const config = require('./config.sample.json');

// Array of regex patterns to match
const regexArr = [
    /!\[\]\(https:\/\/i\.imgur\.com\/([A-Za-z0-9]+)\.(png|jpg|gif|jpeg)\)/g,  // Imgur specific
    /!\[\]\((.+?)\.(png|jpg|gif|jpeg)\)/g,  // Matches ![](***.png) if you had manually typed it
    /!\[\[(.+?)\.(png|jpg|gif|jpeg)\]\]/g  // Matches ![[***.png]] if you had pasted it
];

const chosenRegex = 0; // Index of the regex pattern to use

// Function to write output
function writeOutput(text) {
    if (!config.silent) {
        console.log(text);
    }
    if (config.outputFile) {
        fs.appendFileSync(config.outputFile, text + '\n');
    }
}

// Output the chosen regex pattern
writeOutput(`Using regex pattern: ${regexArr[chosenRegex]}`);

// Function to find all Imgur links recursively in a directory
function findImgurLinks(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const matches = [...content.matchAll(regexArr[chosenRegex])];
        
        matches.forEach(match => {
            const outputText = `${match[1]}.${match[2]}`;
            writeOutput(outputText);
        });
    } catch (error) {
        console.error(`Error reading file ${filePath}:`, error.message);
    }
}

// Function to recursively walk through directories
function walkDirectory(dir) {
    try {
        const files = fs.readdirSync(dir);
        
        files.forEach(file => {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);
            
            if (stat.isDirectory()) {
                walkDirectory(filePath);
            } else if (stat.isFile() && (file.endsWith('.md') || file.endsWith('.txt'))) {
                findImgurLinks(filePath);
            }
        });
    } catch (error) {
        console.error(`Error accessing directory ${dir}:`, error.message);
    }
}

// Clear output file if it exists
if (config.outputFile) {
    fs.writeFileSync(config.outputFile, '');
}

// writeOutput('Starting search for Imgur links...');
walkDirectory(config.startDir); 