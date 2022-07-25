const SensorsModel = require("../models/SensorsModel");
const RecordsModel = require("../models/RecordsModel");
const TimeModel = require("../models/TimeModel")
const DateModel = require("../models/DateModel")
const HumidityModel = require("../models/HumidityModel")
const TemperatureModel = require("../models/TemperatureModel")

module.exports = {
    Query: {


        sensorData: async (_, __, context) => {
            return await SensorsModel.findOne()
        },

        records: async (_, __, context) => {
            return await RecordsModel.find().sort({ _id: "desc" }).limit(20)
        },
        time: async (_, __, context) => {
            return await TimeModel.find().sort({ _id: "desc" }).limit(1)
        },

        charts: async (_, __, context) => {
            let time = [], humidity = [], temperature = [], date = []

            const timeResponse = await TimeModel.find().sort({ _id: "desc" }).limit(20)
            const humidityResponse = await HumidityModel.find().sort({ _id: "desc" }).limit(20)
            const temperatureResponse = await TemperatureModel.find().sort({ _id: "desc" }).limit(20)
            //  const dateResponse = await DateModel.find().sort({ _id: "desc" }).limit(20)

            timeResponse.map(({ data }) => {
                time.push(data)
            })

            humidityResponse.map(({ data }) => {
                humidity.push(data)
            })

            temperatureResponse.map(({ data }) => {
                temperature.push(data)
            })

            return { time, humidity, temperature, date }
        }
    }
};
