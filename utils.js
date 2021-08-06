const { Paste } = require("./Pasta");
const path = require("path");
const { promisify } = require("util");
const glob = promisify(require("glob"));

function getDir() {
    return `${path.dirname(require.main.filename)}${path.sep}`;
}

function load(storage) {
    return glob(`${getDir()}/txt/*.js`).then(pastes => {
        for (const pasteFile of pastes) {                      
            try {                                                                      
                let i = 1;                                     
                //const { name } = path.parse(pasteFile);
                const File = require(pasteFile);
                const paste = new File(File.name);
                if (!(paste instanceof Paste)) throw new TypeError("Paste ${name} doesn't importing class Pasta.js");
                const final = JSON.stringify(`[{ "id:" "${i}", "name": "${paste.name}", "desc:" "${paste.desc}", "text:" "${paste.text}", "image": "${paste.image}"}, ]`)
                storage.push(final);
                i++;
            } catch(err) {
                console.log(err);
            }
        }
    });
}

module.exports = { load }
