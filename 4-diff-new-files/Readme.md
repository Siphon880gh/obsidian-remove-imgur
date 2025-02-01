# 4-diff-new-files

config.js:
```
{
    "aFilename": "sources/a.txt", // listed filenames of exported imgur's that have been normalized from "1 - hash.png" to "hash.png"
    "bFilename": "sources/b.txt", // listed imgur filenames matched from recursively walking Document Vault
    "oFilename": "results.txt", // differences saved here, assumed to be files that hadn't been exported from imgur on a previous date but are referenced in Obsidian
    "flagNewLinesFrom": 2 // Refer to below
}
```

flagNewLinesFrom variable:
Determines the type of comparison:
- 0 - Find lines that are unique to each file (symmetric difference)
- 1 - Find lines that are in a.txt but not in b.txt
- 2 - Find lines that are in b.txt but not in a.txt

Configure the config.json and place the two list files here before running the script.js. Then look for the output file for the list of diff imgur files.