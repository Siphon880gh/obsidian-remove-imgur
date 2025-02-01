const fs = require('fs');
const {aFilename, bFilename, oFilename, flagNewLinesFrom} = require('./config.json');

// Function to compare files based on the flagNewLinesFrom setting
async function compareFiles() {
    try {
        // Read the contents of both files asynchronously
        const aContent = await fs.promises.readFile(aFilename, 'utf8');
        const bContent = await fs.promises.readFile(bFilename, 'utf8');

        // Split file contents into lines and remove any empty lines
        const aLines = new Set(aContent.split(/\r?\n/).filter(line => line.trim()));
        const bLines = new Set(bContent.split(/\r?\n/).filter(line => line.trim()));

        let differences;

        if (flagNewLinesFrom === 0) {
            // Symmetric difference: lines that are in either a.txt or b.txt but not both
            differences = new Set([...aLines, ...bLines]);
            for (const line of aLines) {
                if (bLines.has(line)) {
                    differences.delete(line);
                }
            }
        } else if (flagNewLinesFrom === 1) {
            // Lines that are in a.txt but not in b.txt
            differences = new Set([...aLines].filter(line => !bLines.has(line)));
        } else if (flagNewLinesFrom === 2) {
            // Lines that are in b.txt but not in a.txt
            differences = new Set([...bLines].filter(line => !aLines.has(line)));
        }

        // Write the resulting lines to the output file
        const outputLines = [...differences];
        await fs.promises.writeFile(oFilename, outputLines.join('\n') + '\n');
        
        console.log(`Comparison complete! Check ${oFilename} for results.`);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Execute the file comparison
compareFiles(); 