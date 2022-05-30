# Kill child processes on SIGINT and exit
trap "exit" INT TERM ERR
trap "kill 0" EXIT

# Quit on error
set -e

# Run 2 webservers on ports 8000 and 8001 serving this directory
python3 -m http.server 8000 &
python3 -m http.server 8001 &

# Run Chrome Canary with the necessary features enabled
/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary --enable-features=MediaStreamTrackTransfer --enable-blink-features=MediaStreamTrackTransfer http://localhost:8000 http://localhost:8001/cross-origin-index.html
