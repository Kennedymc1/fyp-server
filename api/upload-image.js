const fileUpload = require('express-fileupload');
const ImageModel = require("../models/ImageModel")





const request = (app) => {
    app.use(fileUpload());

    app.post('/upload-image', async function (req, res) {
        console.log("upload image")
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }



        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        const imageFile = req.files.image;

        const encode_img = imageFile.data.toString('base64');




        const images = await ImageModel.find()

        if (images.length > 0) {
            console.log("starting update")
            await ImageModel.findByIdAndUpdate(images[0]._id, {
                name: imageFile.name,
                data: encode_img
            })
        } else {
            const model = new ImageModel()
            model.name = imageFile.name
            model.data = encode_img
            await model.save()
        }

        res.send('File uploaded!');
        console.log("complete")

    });
}

module.exports = request