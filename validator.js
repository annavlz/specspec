
const R = require('ramda')

const RULES = ['type', 'minLength', 'match', 'any', 'all']

const checkWordsLength = (minLength, phrase) => {
    const words = phrase.split(" ")
    return words.length >= minLength
}

const checkString = (target, minLength, match) => {
    return typeof(target) == 'string' ? "OK" : "The value has to be a string"
    const correctLength = minLength ? checkWordsLength(minLength, target) : true
    const correctMatch = match ? R.test(new RegExp(match), target) : true
    const result = correctLength && correctMatch
    const correctLengthError = correctLength ? "" : "Not enough words.  "
    const matchError = correctMatch ? "" : "  Doesn't match RegExp."
    const error = `${correctLengthError}    ${matchError}`
    return result ? "OK" : error
}

const checkNumber = (target, match) => {
    const correctMatch = match ? R.test(new RegExp(match), target) : true
    const correctLengthError = correctLength ? "" : "Not enough ????.  "
    const matchError = correctMatch ? "" : "  Doesn't match RegExp."
    const error = `${correctLengthError}    ${matchError}`
    return result ? "OK" : error
}

const checkArray = (target, minLength, match) => {
    const correctLength = minLength ? target.length >= minLength : true
    const allMatches = match ? R.any(R.test(new RegExp(match)), target) : true
    const result = correctLength && allMatches
    const correctLengthError = correctLength ? "" : "Not enough items in the list.  "
    const matchError = allMatches ? "" : "  One or more elements do not match RegExp."
    const error = `${correctLengthError}${matchError}`
    return result ? "OK" : error
}

const checkUrl = (target) => {
    const result = R.test('//')
    return result ? "OK" : "Not valid URL"
}

const applyRule = (spec, key, val) => {
    const {type, minLength, match } = val
    const target = spec[key]

    if(!target) return "Missing param"

    if(R.isEmpty(val)) return "OK"
    
    if(typeof(type) == 'string'){
        return checkString(target, minLength, match)
    }

    if(typeof(type) == 'number'){
        return typeof(target) == 'number' ? "OK" : "The value has to be a number"
    }

    if(Array.isArray(type)){
        return checkArray(target, minLength, match)
    }

    if(type === 'url'){
        return checkUrl(target)
    }

    return "Unknown error"
}

const validate = (spec, rules) => {
    return R.mapObjIndexed((val, key, obj) => {
        const isLeaf = R.isEmpty(val) || R.isEmpty(R.without(RULES, R.keys(val))) 
        if(isLeaf) {
            return applyRule(spec, key, val)
        } 
        return validate(spec[key], val)
    })(rules)
}

const run = (spec, rules) => {
    const result = validate(spec, rules)
    console.log(result)
    return result
}

module.exports = { run }

// R.mapObjIndexed (num, key, obj) =>

// R.propOr('Ramda', 'favoriteLibrary');
// var pred = R.where({
//     a: R.equals('foo'),
//     b: R.complement(R.equals('bar')),
//     x: R.gt(R.__, 10),
//     y: R.lt(R.__, 20)
//   });


