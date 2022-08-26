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
                time,
                image: entryResponse.image
            }
        },

        entries: async (_, __, context) => {
            const entryResponse = await EntryModel.find()

            return entryResponse.map(entry => {
                const time = dateCreated(entry)

                return {
                    time,
                    image: entry.image
                }
            })
        },
    }
};
