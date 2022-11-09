
const EntryModel = require("../models/EntryModel");
const { compareHours, compareDays } = require("../utils/dateUtil");

module.exports = {
    Query: {
        customRange: async (_, { fromDate, toDate }, context) => {
            const entryResponse = await EntryModel.find()
            let count = 0
            const toDateObj = new Date(toDate)
            const fromDateObj = new Date(fromDate)
            //add a day to the to date object
            toDateObj.setDate(toDateObj.getDate() + 1);

            const th = compareHours(toDateObj)
            const fh = compareHours(fromDateObj)

            console.log({ th, fh })
            entryResponse.map(entry => {
                var timestamp = entry._id.toString().substring(0, 8);
                var createdOn = new Date(parseInt(timestamp, 16) * 1000);

                if (createdOn >= fromDateObj && createdOn <= toDateObj) {
                    count++
                }
            })


            return count
        },

        stats: async (_, __, context) => {
            const entryResponse = await EntryModel.find()
            peopleToday = 0
            people7Days = 0
            people30Days = 0
            peopleYesterday = 0

            entryResponse.map(entry => {
                var timestamp = entry._id.toString().substring(0, 8);
                var createdOn = new Date(parseInt(timestamp, 16) * 1000);

                if (compareHours(createdOn) <= 24) {
                    peopleToday++
                }

                const days = compareDays(createdOn)
                console.log({ days })

                if (compareDays(createdOn) <= 7) {
                    people7Days++
                }

                if (compareDays(createdOn) <= 30) {
                    people30Days++
                }

                //check if is part of yesterday range
                if (compareHours(createdOn) <= 48) {
                    const yesterdayDateObject = new Date()
                    yesterdayDateObject.setDate(yesterdayDateObject.getDate() - 1);

                    if (createdOn < yesterdayDateObject) {
                        peopleYesterday++
                    }
                }

            })




            return {
                peopleToday,
                people7Days,
                people30Days,
                peopleYesterday
            }
        },
    }
};
