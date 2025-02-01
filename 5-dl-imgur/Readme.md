# 5-dl-imgur

This script will download pictures off imgur.

## Preliminary Setup
Run `npm install` to make sure `axios` is installed.

## Batch Process

1. Refer to your list of files to download (from previous scripts).

Note: If you had exported imgur in the past, you may have a diff list between exported imgur filenames and obsidian matched imgur filenames, therefore having a list of files you do not have locally on the computer and need to download now so that your Obsidian documents can load images locally rather than from imgur. 

Your list may look like:
```
asaX9823.png
bsaX2821.png
```

2. Copy no more than 200 lines of imgur jpg/png filenames into `config.js` (Notice it's not a .json file)
3. Join a new IP address on your VPN app. Visit https://www.whatsmyip.org/ to check a.) you can load a webpage, and b.) your ip address changed.
4. Run script.js. It will download every 2250-2500 seconds which will download 24 pics a minute.
5. While it autodownloads, check downloaded/ folder sorted by last modified and see if they are successfully downloading.

What worked without imgur servers throttling the batch downloader:
- Download 200 pics waiting after each pic 2250ms-2500ms
- Then rotate the IP address with your VPN server.
- 2000ms will hit at capacity message when visiting their homepage (when in fact they throttled your IP).

VPN app:
For example, with VPN Unlimited, switch to another state (California, Utah, etc) after each 200 pics download (or when the script finishes)
Then add your next batch to `imageListString` at config.json.

How it works: The downloading script works on the basis of curl
```
curl -o downloaded/6tbAP5p.png "https://i.imgur.com/6tbAP5p.png"
```