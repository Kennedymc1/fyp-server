const ImageModel = require("../models/EntryModel")

module.exports = {
    Query: {


        image: async (_, __, context) => {
            console.log("start image find")
            const images = await ImageModel.find()
            return images[0]

        },
    }
};
