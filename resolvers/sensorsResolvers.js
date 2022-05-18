const SensorsModel = require("../models/SensorsModel");
const RecordsModel = require("../models/RecordsModel");


module.exports = {
    Query: {


        sensorData: async (_, __, context) => {
            return await SensorsModel.findOne()
        },

        records: async (_, __, context) => {
            return await RecordsModel.find().sort({ _id: "desc" }).limit(20)
        }
    }
};
