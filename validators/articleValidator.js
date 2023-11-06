const Validator = require("fastest-validator")
const { isValidisObjectId } = require("mongoose")

const v = new Validator()

v.add("isObjectId", (value) => {
    return isValidisObjectId(value) || "objectId is not valid"
})

const schema = {
    title : {type: "string"},
    desciption : {type: "string"},
    body : {type: "string"},
    href : {type: "string"},
    categoryID : {type: "custom", rule: "isObjectId"},
    publish : {type: "string"}, // 0-1
    $$strict : true
}

const check = v.compile(schema)

module.exports = check