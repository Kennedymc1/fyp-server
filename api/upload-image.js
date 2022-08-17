const fileUpload = require('express-fileupload');





const request = (app) => {
    app.use(fileUpload());

    app.post('/upload-image', function (req, res) {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }

        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        let imageFile = req.files.image;

        // Use the mv() method to place the file somewhere on your server
        imageFile.mv('/image.jpg', function (err) {
            if (err)
                return res.status(500).send(err);

            res.send('File uploaded!');
        });
    });
}

module.exports = request