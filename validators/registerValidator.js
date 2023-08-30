const Validator = require("fastest-validator")

const v = new Validator()

const schema = {
    username : {type: "string", min: 3, max: 100},
    name : {type: "string", min: 3, max: 256},
    email : {type: "email", min: 3},
    password : {type: "string", min: 3},
    phone : {type: "number", max : 12},
    $$strict : true
}

const check = v.compile(schema)

module.exports = check