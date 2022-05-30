python3 -m http.server 8000 &
python3 -m http.server 8001 &

/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary --enable-features=MediaStreamTrackTransfer --enable-blink-features=MediaStreamTrackTransfer http://localhost:8000 http://localhost:8001/cross-origin-index.html
