const yaml = require('js-yaml');
const fs = require('fs');
const validator = require('./validator')

function readFileAsync(filename, encoding) {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, encoding, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
}

const readRules = (path) => {
    return yaml.safeLoad(fs.readFileSync(path, 'utf8'), { json: true })
}

const command = async (file, cmd) => {
    const rules = readRules(cmd.rules)
    const spec = yaml.safeLoad(fs.readFileSync(file, 'utf8'), { json: true })
    const results = validator.run(spec, rules)

    if(results.length){
        console.log("errors")
        process.exit(1)
    } else {
        console.log("No errors")
        process.exit(0)
    }
}

module.exports = { command }
// start with a / not end with / and have something after the /

