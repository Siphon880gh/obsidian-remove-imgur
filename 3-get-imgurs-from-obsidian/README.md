# 3-get-imgurs-from-obsidian

config.json:
```
// Configuration
{
    "silent": false,              // Set to true to suppress console output
    "outputFile": "list.txt",     // Save a list of imgurs from Obsidian documents
    "startDir": "./Document Vaults" // Document Vault folder to look into recursively
}
```

1. Copy script.js and config.json to the folder containing `Document Vaults/`, then run the script to generate list.txt of all imgur filenames matched from your md files.
2. Or you may test this script first by copying some folders/files from your actual Document Vaults into the local "Document Vaults" folder here.