const Validator = require("fastest-validator")

const v = new Validator()

const schema = {
    name : {type: "string"},
    email : {type: "email", min: 3, max: 256},
    phone : {type: "string"},
    body : {type: "string", min: 3},

    $$strict : true
}

const check = v.compile(schema)

module.exports = check