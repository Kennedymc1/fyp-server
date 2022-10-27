
const EntryModel = require("../models/EntryModel")

module.exports = {
    Query: {


        stats: async (_, __, context) => {
            const entryResponse = await EntryModel.find()

            return {
                peopleToday: entryResponse.length,
                peopleYesterday: 0,
                people7Days: 0,
                people30Days: 0
             }
        },
    }
};
