const UserModel = require("./models/UserModel")
const PermissionUserModel = require("./models/PermissionUserModel")



const getMasterEmail = async (context) => {
    let masterEmail
    const userExists = await UserModel.findOne({ email: context.user.email.toLowerCase() })

    if (userExists) {
        masterEmail = context.user.email
    } else {
        const permissionUserExists = await PermissionUserModel.findOne({ email: context.user.email })

        masterEmail = permissionUserExists.masterEmail
    }

    return masterEmail
}

module.exports = getMasterEmail