const yaml = require('js-yaml');
const fs = require('fs');
const R = require('ramda')

const validator = require ('./validator')

const spec = yaml.safeLoad(fs.readFileSync("./transactions.yaml", 'utf8'), { json: true })

const rules = [
    { rule: { info: {version: {},title: {},description: { "type": "", "minLength": 4 }}},message: '{"info":{"version":"OK","title":"OK","description":"OK"}}'},
    { rule: { ddd : {} }, message: '{"ddd":"Missing param"}'},
    { rule: { info: {ddd: {}}}, message: '{"info":{"ddd":"Missing param"}}'},
    { rule: { info: { description: {type: 1}}}, message: '{"info":{"description":"The value has to be a number"}}'},
    { rule: { info: { description: { type: "", minLength: 100 }}}, message: '{"info":{"description":"Not enough words.      "}}'},
    { rule: { produces: { type: [], minLength: 1}}, message: '{"produces":"OK"}'},
    { rule: { produces: { type: "" }}, message: '{"produces":"The value has to be a string"}'},
    { rule: { produces: {type: [], minLength: 1 }}, message: '{"produces":"OK"}'},
    { rule: { produces: {type: [], minLength: 2 }}, message: '{"produces":"Not enough items in the list.  "}'},
    { rule: { schemes: { type: [ ], match: "https" }}, message: '{"schemes":"OK"}'},
    { rule: { schemes: { type: [ ], match: "test" }}, message: '{"schemes":"  One or more elements do not match RegExp."}'},
    { rule: { basePath: { type: "", match: "^\/.*[^\/]?"}}, message: '{"basePath":"OK"}'},
]

rules.map(({rule, message}) => {
    const result = validator.run(spec, rule)
    console.log(JSON.stringify(result))
    console.log(JSON.stringify(result) == message ? "All good" : "Fail")
})


//   "paths": {
//     "type": "multi",
//     "regex": "\/.*",
//     "each": {
  //     "match": "one of [get, post, put, delete]",
  //     "get": {
  //       "description": { "type": "", "minLength": 4 },   
  //       "responses": {
  //         "200": {
  //           "description": {"type": "" },
  //           "schema": {}
  //         }
  //       }
  //     }
//     } 
//   }
// }