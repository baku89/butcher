// Copies the built browser app (../dist) into ./app, which the desktop app serves.
const fs = require('node:fs'), path = require('node:path');
const src = path.join(__dirname, '..', 'dist'), dst = path.join(__dirname, 'app');
if (!fs.existsSync(path.join(src, 'index.html'))) { console.error('../dist がありません。先にルートで npm run build を実行してください。'); process.exit(1); }
fs.rmSync(dst, { recursive: true, force: true });
fs.cpSync(src, dst, { recursive: true });
