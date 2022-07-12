const SensorsModel = require("../models/SensorsModel");
const RecordsModel = require("../models/RecordsModel");
const TimeModel = require("../models/TimeModel")
const DateModel = require("../models/DateModel")
const HumidityModel = require("../models/HumidityModel")
const TemperatureModel = require("../models/TemperatureModel")

module.exports = {
    Query: {


        entries: async (_, __, context) => {
            return [{
                time: "16 April, 2022 16:30"
            },{
                time: "16 April, 2022 16:35"
            },
            {
                time: "16 April, 2022 16:38"
            },
            {
                time: "16 April, 2022 16:40"
            },
            {
                time: "16 April, 2022 16:46"
            },
            {
                time: "16 April, 2022 16:47"
            },
            {
                time: "16 April, 2022 16:49"
            },
            {
                time: "16 April, 2022 16:50"
            },
            {
                time: "16 April, 2022 16:52"
            },
            {
                time: "16 April, 2022 16:53"
            },
            {
                time: "16 April, 2022 16:55"
            },
            {
                time: "16 April, 2022 16:56"
            }]
        },
    }
};
