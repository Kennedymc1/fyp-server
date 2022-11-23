const SensorsModel = require("../models/SensorsModel");
const RecordsModel = require("../models/RecordsModel");
const TimeModel = require("../models/TimeModel")
const DateModel = require("../models/DateModel")
const HumidityModel = require("../models/HumidityModel")
const EntryModel = require("../models/EntryModel");
const { dateCreated, compareHours } = require("../utils/dateUtil");

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

        entries: async (_, { fromDate, toDate }, context) => {
            let entryResponse = await EntryModel.find().sort({ _id: "desc" });

            if (fromDate && toDate) {
                const toDateObj = new Date(toDate)
                const fromDateObj = new Date(fromDate)
                //add a day to the to date object
                toDateObj.setDate(toDateObj.getDate() + 1);

                const th = compareHours(toDateObj)
                const fh = compareHours(fromDateObj)

                const newEntries = []

                entryResponse.map(entry => {
                    var timestamp = entry._id.toString().substring(0, 8);
                    var createdOn = new Date(parseInt(timestamp, 16) * 1000);

                    if (createdOn >= fromDateObj && createdOn <= toDateObj) {
                        newEntries.push(entry)
                    }
                })

                entryResponse = newEntries
            }

            return entryResponse.map(entry => {
                const time = dateCreated(entry)

                return {
                    _id: entry._id,
                    time,
                    image: entry.image,
                    banned: entry.banned,
                    age: entry.age,
                    gender: entry.gender
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
