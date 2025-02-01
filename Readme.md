# **Remove Imgur from Obsidian – Script Collection**  

![Last Commit](https://img.shields.io/github/last-commit/Siphon880gh/obsidian-remove-imgur/main)
<a target="_blank" href="https://github.com/Siphon880gh" rel="nofollow"><img src="https://img.shields.io/badge/GitHub--blue?style=social&logo=GitHub" alt="Github" data-canonical-src="https://img.shields.io/badge/GitHub--blue?style=social&logo=GitHub" style="max-width:8.5ch;"></a>
<a target="_blank" href="https://www.linkedin.com/in/weng-fung/" rel="nofollow"><img src="https://img.shields.io/badge/LinkedIn-blue?style=flat&logo=linkedin&labelColor=blue" alt="Linked-In" data-canonical-src="https://img.shields.io/badge/LinkedIn-blue?style=flat&amp;logo=linkedin&amp;labelColor=blue" style="max-width:10ch;"></a>
<a target="_blank" href="https://www.youtube.com/@WayneTeachesCode/" rel="nofollow"><img src="https://img.shields.io/badge/Youtube-red?style=flat&logo=youtube&labelColor=red" alt="Youtube" data-canonical-src="https://img.shields.io/badge/Youtube-red?style=flat&amp;logo=youtube&amp;labelColor=red" style="max-width:10ch;"></a>

These scripts provide a structured workflow for **migrating away from Imgur** to local and self-hosted options in your Obsidian Document Vaults.

## **Overview**  
Obsidian offers a community plugin that allows users to easily paste images into their notes, automatically uploading them to Imgur. This plugin has several advantages:  
- Images are stored externally, keeping the Obsidian vault lightweight.  
- Image links remain valid when publishing notes online.  
- Imgur has historically offered free, private image hosting.  

However, in **January 2025**, I encountered a critical issue—losing access to my Imgur account. Since deleted images on Imgur are not immediately removed, I quickly wrote scripts to **scrape, rename, compare, download, and replace** all Imgur-hosted images in my vault.  

This repository contains the scripts I used, rewritten from scratch and introduced into git history in the order they were used. This makes it easier to follow the workflow for anyone facing a similar issue.  

## **Workflow & Scripts**  

### **1. Rename Exported Imgur Files**  
- Script: `1-rename-imgur-exports`  
- SKIP this step if you had never exprted from imgur.
- If you had previously exported images from Imgur, they will have filenames prefixed with numbers (e.g., `"1 - hashed.png"`, `"2 - hashed.png"`).  
- This script renames all files to their original hash-based names (e.g., `"hashed.png"`) for consistency.  

### **2. Generate File List of Exported Images**  
- Script: `2-ls-into-list`  
- SKIP this step if you had never exprted from imgur.
- Creates a list of filenames from the exported images.  

### **3. Extract Imgur References from Obsidian Vault**  
- Script: `3-get-imgurs-from-obsidian`  
- Scans the entire Obsidian vault and generates a list of all **Imgur image URLs** referenced in Markdown files.  

### **4. Identify Newer Images Not in Exported Backup**  
- Script: `4-diff-new-files`  
- SKIP this step if you had never exprted from imgur.
- Compares the exported Imgur file list (Step 2) with the list of images currently referenced in Obsidian (Step 3).  
- Generates a list of **missing** images that must be scraped from Imgur.  

### **5. Scrape Missing Images from Imgur**  
- Script: `5-dl-imgur`  
- Downloads missing images from Imgur using either the generated diff list from Step 4 (if you had exported imgur) or Step 3 (If you had never exported from imgur)
- To avoid detection, the script:  
  - **Rotates IP** (via VPN) every **200 images**.  
  - **Introduces a delay** of **2250ms - 2500ms** between downloads.  

### **6. Upload Images to a Private FTP Server**  
- Script: `6-upload-diff-images`  
- Compares images on a private SFTP server with the locally stored images.  
- Uploads only the **new** images to the server.  
- This is ALSO designed for **publishing** purposes—when updating online notes, new images are automatically uploaded alongside new documents. You'd setup a Git Hook that after pushing documents online, it'll compare and upload the images to your private SFTP server. 

### **7. Replace Imgur URLs in Obsidian & Move Images to Attachments Folder**  
- Script: `7-strip-away-imgur-from-obsidian`  
- Replaces all Imgur URLs in Markdown files with **local filenames**.  
- Move your images into **Obsidian’s Attachments folder** (Configurable in `Settings -> Files and Links -> Default location for new attachments`).  

## **Publishing Notes Online**  
If you are publishing notes online:  
1. Modify `6-upload-diff-images` to integrate with your **git push** hook.  
2. Ensure your frontend has a configuration layer (e.g., a JSON file) that sets the **domain with base URL** where uploaded images reside.  

## **Final Thoughts**  
This repository provides a structured workflow for **migrating away from Imgur** to local and self-hosted options, while preserving image references in your Obsidian vault. It allows you to **retain control** over your images and avoid potential issues with external hosting services.  

If you have any improvements or optimizations, feel free to contribute! 🚀