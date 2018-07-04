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

const read = (path) => {
    return yaml.safeLoad(fs.readFileSync(path, 'utf8'), { json: true })
}

const command = async (file, cmd) => {
    console.log(cmd.rules)
    const rules = read(cmd.rules)
    const spec = read(file)
    const results = validator.run(spec, rules)

    if(results.length){
        console.log(`${results.length} errors`)
        process.exit(1)
    } else {
        console.log("No errors")
        process.exit(0)
    }
}

module.exports = { command }
