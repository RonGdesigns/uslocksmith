const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
let count = 0;
for (const f of files) {
    let content = fs.readFileSync(f, 'utf8');
    if (content.includes('\\n')) {
        content = content.replace(/\\n/g, '\n');
        fs.writeFileSync(f, content);
        count++;
    }
}
console.log(`Fixed ${count} files.`);
