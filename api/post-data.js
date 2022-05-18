const SensorsModel = require("../models/SensorsModel")
const RecordsModel = require("../models/RecordsModel")
const { model } = require("mongoose")


const request = (app) => {
    /**
     * 
     */
    app.get('/post-data', async (req, res) => {
        const data = req.query.data

        let existingModel = await SensorsModel.findOne()

        if (!existingModel) {
            const model = new SensorsModel()
            model.date = ""
            model.time = ""
            model.temperature = ""
            model.humidity = ""

            existingModel = await model.save()

        }

        //date
        if (data.indexOf("date:") > -1) {
            const value = data.replace("date:", "")
            console.log({ d: value })

            await SensorsModel.findByIdAndUpdate(existingModel._id, { date: value })
        }

        //date
        if (data.indexOf("time:") > -1) {
            const value = data.replace("time:", "")
            console.log({ clock: value })
            await SensorsModel.findByIdAndUpdate(existingModel._id, { time: value })

        }

        //date
        if (data.indexOf("humidity:") > -1) {
            const value = data.replace("humidity:", "")
            console.log({ h: value })

            await SensorsModel.findByIdAndUpdate(existingModel._id, { humidity: value })

        }


        //date
        if (data.indexOf("temperature:") > -1) {
            const value = data.replace("temperature:", "")
            await SensorsModel.findByIdAndUpdate(existingModel._id, { temperature: value })

            console.log({ t: value })
        }

        //all
        if (data.indexOf("all:") > -1) {
            let value = data.replace("all:", "")

            while(value.indexOf("%20") >= 0){
                value = value.replace("%20"," ")
            }

            const model = new RecordsModel()
            model.data = value
            
            await model.save()
            console.log({ all: value })
        }

        res.send(true)

    })
}

module.exports = request