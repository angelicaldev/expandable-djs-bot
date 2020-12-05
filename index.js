require('dotenv').config();
const fs = require('fs');
const { client } = require('./core/core.js');

fs.readdir('./events/', (err, files) => {
    if (err) return console.error(err);
    files.forEach((file) => {
        if (!file.endsWith('.js')) return;
        const event = require(`./events/${file}`);
        console.log(`⏳ Loading Event: ${file} @ ${new Date()}`);
        let eventName = file.split('.')[0];
        client.on(eventName, event.bind(null, client));
        delete require.cache[require.resolve(`./events/${file}`)];
    });
});

fs.readdir('./commands/', (err, files) => {
    if (err) return console.error(err);
    files.forEach((file) => {
        if (!file.endsWith('.js')) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split('.')[0];
        console.log(`⏳ Loading Command: ${commandName} @ ${new Date()}`);
        client.commands.set(commandName, props);
    });
});
