const SensorsModel = require("../models/SensorsModel");
const RecordsModel = require("../models/RecordsModel");
const TimeModel = require("../models/TimeModel")
const DateModel = require("../models/DateModel")
const HumidityModel = require("../models/HumidityModel")
const EntryModel = require("../models/EntryModel");
const { dateCreated } = require("../utils/dateUtil");

module.exports = {
    Query: {
        entry: async (_, { id }, context) => {
            const entryResponse = await EntryModel.findById(id)

            const time = dateCreated(entryResponse)

            return {
                _id: entryResponse._id,
                time,
                image: entryResponse.image,
                temperature: entryResponse.temperature,
                banned: entryResponse.banned,
                age: entryResponse.age,
                gender: entryResponse.gender



            }
        },

        entries: async (_, __, context) => {
            const entryResponse = await EntryModel.find().sort({ _id: "desc" });

            return entryResponse.map(entry => {
                const time = dateCreated(entry)

                return {
                    _id: entry._id,
                    time,
                    image: entry.image,
                    banned: entry.banned
                }
            })
        },
    },
    Mutation: {
        banEntry: async (_, { id, banned }, context) => {
            const success = await EntryModel.findByIdAndUpdate(id, { banned })
            if (success) {
                return true
            } else {
                return false
            }
        },
    }
};
