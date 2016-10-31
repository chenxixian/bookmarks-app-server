const webshot = require('webshot');
webshot('https://github.com/brenden/node-webshot', 'node-webshot.png', 'node-webshot', err => {
    if (err) {throw err;}
    console.log('Website Captured!');
})
