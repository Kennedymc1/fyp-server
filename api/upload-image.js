const fileUpload = require('express-fileupload');
const EntryModel = require("../models/EntryModel")





const request = (app) => {
    app.use(fileUpload());

    app.post('/upload-image', async function (req, res) {
        console.log("upload image")
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }

        const temperature = req.query.temp

        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        const imageFile = req.files.image;


        const encode_img = imageFile.data.toString('base64');

        const imageModel = {
            name: imageFile.name,
            data: encode_img
        }


        const model = new EntryModel()
        model.image = imageModel
        model.temperature = temperature

        await model.save()

        res.send('File uploaded!');
        console.log("complete")

    });
}

module.exports = request