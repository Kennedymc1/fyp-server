const SensorsModel = require("../models/SensorsModel");


module.exports = {
    Query: {


        sensorData: async (_, __, context) => {
            return await SensorsModel.findOne()
        }
    }
};
