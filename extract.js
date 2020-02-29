const fs = require('fs');

const urlRegex = /https:[^"]+((invoice)|(generate_o2_receipt))[^"]+/g;
const replaceMap = {
    '3D': '',
    '=\r\n': '',
    'https': 'http',
    '&amp;': '&'
};
const files = fs.readdirSync('mails');
const urls = files.map(o => {
    let matchedUrls = fs.readFileSync('mails/' + o, 'utf-8').match(urlRegex);
    if (!Array.isArray(matchedUrls)) {
        console.log(`No URL found in ${o}.`)
        return null;
    }
    url = matchedUrls[0];
    for (let key in replaceMap) {
        url = url.replace(key, replaceMap[key]);
    }
    return `<a href="${url}" target="_blank"></a>`;
}).filter(o => o).join('\n');
fs.writeFileSync('download.html', fs.readFileSync('download-copy.html', 'utf-8').replace('{{urls}}', urls));