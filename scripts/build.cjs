const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const output = path.join(root, 'dist');
const publicFiles = ['index.html', 'app.js', 'style.css', '404.html'];

function build() {
  // Only recreate the known build directory inside this project.
  if (path.relative(root, output) !== 'dist') throw new Error('Unexpected output directory');
  for (const file of [...publicFiles, 'assets']) {
    if (!fs.existsSync(path.join(root, file))) throw new Error(`Missing deployment file: ${file}`);
  }
  fs.rmSync(output, { recursive: true, force: true });
  fs.mkdirSync(output, { recursive: true });
  for (const file of publicFiles) {
    fs.copyFileSync(path.join(root, file), path.join(output, file));
  }
  fs.cpSync(path.join(root, 'assets'), path.join(output, 'assets'), { recursive: true });
  console.log('Static site built in dist/');
  return output;
}

module.exports = { build };
if (require.main === module) build();
