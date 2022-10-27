const SensorsModel = require("../models/SensorsModel");
const RecordsModel = require("../models/RecordsModel");
const TimeModel = require("../models/TimeModel")
const DateModel = require("../models/DateModel")
const HumidityModel = require("../models/HumidityModel")
const TemperatureModel = require("../models/TemperatureModel")

module.exports = {
    Query: {


        stats: async (_, __, context) => {
            return {
                peopleToday: 30,
                peopleYesterday: 60,
                people7Days: 325,
                people30Days: 879
             }
        },
    }
};
