const SettingsModel = require("../models/SettingsModel");
const { dateCreated } = require("../utils/dateUtil");

module.exports = {
    Query: {
        settings: async (_, __, context) => {
            const settings = await SettingsModel.findOne({ masterEmail: context.user.email })

            if (settings) {
                return settings
            } else {
                const model = new SettingsModel()
                model.masterEmail = context.user.email
                model.facemaskMode = false
                return await model.save()
            }
        },

    },
    Mutation: {
        setSettings: async (_, { settings }, context) => {
            const success = await SettingsModel.findOneAndUpdate({ masterEmail: context.user.email }, { ...settings })
            if (success) {
                return true
            } else {
                return false
            }
        },
    }
};
