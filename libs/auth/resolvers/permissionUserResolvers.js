const { getToken, encryptPassword, comparePassword, isResetPasswordTokenExpired } = require("../utils")
const { AuthenticationError } = require('apollo-server-express');
const PermissionUserModel = require('../models/PermissionUserModel')
const UserModel = require('../models/UserModel')

const sgMail = require('@sendgrid/mail');
const constants = require("../constants");
const { addPermissionUser, editPermissionUser, deletePermissionUser, getPermissionUsers } = require("../../../handlers/permission-handler");


module.exports = {
    Query: {
        permissionCanEdit: async (_, __, context) => {
            const userExists = await UserModel.findOne({ email: context.user.email })
            if (userExists) {
                return true
            } else {
                const permissionUser = await PermissionUserModel.findOne({ email: context.user.email })
                return !permissionUser.viewOnly
            }
        },
        permissionUsers: async (_, __, context) => {
            return getPermissionUsers({masterEmail: context.user.email})
        },

        isPermissionUserValid: async (_, { token }) => {
            const user = await PermissionUserModel.findOne({ signupToken: token })
            let response

            if (user) {
                response = true
            } else {
                response = false
            }

            return response
        },
        isPermissionPasswordResetValid: async (_, { token }) => {
            const user = await PermissionUserModel.findOne({ resetPasswordToken: token })
            let response

            if (user) {
                response = !isResetPasswordTokenExpired(user.resetPasswordExpires)
                //check if the token has expired
            } else {
                response = false
            }

            return response
        },

    },
    Mutation: {
        addPermissionUser: async (_, { user }, context) => {
            return addPermissionUser(user, context.user.email)
        },
        editPermissionUser: async (_, { user }, context) => {
           return editPermissionUser(user, context.user.email)
        },
        deletePermissionUser: async (_, { _id }, context) => {
           return deletePermissionUser(_id, context.user.email)
        },
        permissionUserRegister: async (parent, args, context, info) => {
            const user = await PermissionUserModel.findOne({ signupToken: args.token })

            const newPassword = await encryptPassword(args.password)
            const token = getToken({ email: user.email, password: newPassword })
            const updateFields = {
                password: newPassword,
                signupToken: null,
                emailSent: false
            }

            await PermissionUserModel.findOneAndUpdate({ signupToken: args.token }, updateFields)

            return { email: user.email, password: newPassword, token }

        },


        permissionLogin: async (parent, args, context, info) => {
        },
        //hard change the password using a token
        permissionChangeTokenPassword: async (_, args) => {
            const user = await PermissionUserModel.findOne({ resetPasswordToken: args.token })

            try {
                if (isResetPasswordTokenExpired(user.resetPasswordExpires)) {
                    throw new AuthenticationError(constants.EXPIRED)
                } else {
                    const newPassword = await encryptPassword(args.password)
                    const token = getToken({ email: user.email, password: newPassword })
                    const updateFields = {
                        password: newPassword,
                        resetPasswordExpires: null,
                        resetPasswordToken: null
                    }

                    await PermissionUserModel.findOneAndUpdate({ resetPasswordToken: args.token }, updateFields)

                    return { email: user.email, password: newPassword, token }
                }
            } catch (e) {
                throw new AuthenticationError(constants.EXPIRED)
            }
        },

        permissionChangePassword: async (parent, args, context, info) => {
            const { email, password } = await PermissionUserModel.findOne({ email: context.user.email })
            const { oldPassword, newPassword } = args.password
            const isMatch = await comparePassword(oldPassword, password)

            const newEncryptPassword = await encryptPassword(newPassword)
            if (isMatch) {
                await PermissionUserModel.findOneAndUpdate({ email: email }, { password: newEncryptPassword })
                const token = getToken({ email, newEncryptPassword })
                return { email, password, token };
            } else {
                throw new AuthenticationError(constants.WRONG_PASSWORD)
            }
        },

        permissionResetPassword: async (_, { email }) => {
            //check if a user with the email address exists in the database
            const user = await PermissionUserModel.findOne({ email: email.toLowerCase() })
            if (!user) {
                throw new AuthenticationError(constants.EMAIL_NON_EXIST)
            }

            const resetToken = crypto.randomBytes(20).toString('hex')

            //store the resetToken and expires into the database
            await PermissionUserModel.findOneAndUpdate({ email: email }, {
                resetPasswordToken: resetToken,
                //expires after 1 hour
                resetPasswordExpires: Date.now() + 3_600_000
            })


            sgMail.setApiKey(process.env.SENDGRID_API_KEY);

            const msg = {
                to: email,
                from: process.env.SENDGRID_FROM_EMAIL,
                subject: 'Password Reset',
                text: `
                You have requested assistance in resetting your password.To do so,
                you will need to click on the following link and follow the instructions given to you.

Click here to reset your password: ${process.env.BASE_URL} /reset/${resetToken}

            `,
            };

            await sgMail.send(msg);


            // let finalResponse

            // if (info.accepted.length > 0) {
            return constants.SUCCESS
            //} else {
            //    throw new AuthenticationError('failed to send email')
            // }

            // return finalResponse
        }

    }
};
