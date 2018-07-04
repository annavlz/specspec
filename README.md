# specspec
Swagger validator

The validator takes a yaml file and checks it against a json file with rules. 
Requirements: 
- ramda 0.25.0
- js-yaml 3.11.0
- commander 2.15.1

To run

```
node spec.js lint *.yaml -r rules.json
```

Example:

```
{
  "info": {
    "version": {},
    "title": {},
    "description": { "type": "", "minWords": 4 }
  },
  "produces": { "type": [ ], "minLength": 1 },
  "consumes": { "type": [ ], "minLength": 1 },
  "schemes": { "type": [ ], "match": "https" },
  "basePath": { "type": "", "match": "^\/.*[^\/]?"},
  "numberCheck": {"type": 1 }
}
```

It can validate: 
- existence of the key `{}`
- type of the value `type: "" | 111 | [] | {} `
- minimum number of words in a phrase `minWords`
- minimum length of a list `minLength`
- match to a RegEx `match: <RegEx>`

