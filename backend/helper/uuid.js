const { v4: uuid } = require("uuid")
const { version: uuidVersion } = require('uuid')
const { validate: uuidValidate } = require('uuid')

module.exports.randomId = async () => {
    return uuid()
}

module.exports.verifyUUID = async (uuid) => {
    return uuidValidate(uuid) && uuidVersion(uuid) === 4;
}