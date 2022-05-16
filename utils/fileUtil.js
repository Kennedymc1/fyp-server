
/**
 * get the data of a file as a string in utf8 format
 */
const getFileData = async (file) => {
    let filedata, fileName
    const response = await file;

    if (response && response.createReadStream) {

        function streamToString() {
            fileName = response.filename
            const stream = response.createReadStream()
            const chunks = [];
            return new Promise((resolve, reject) => {
                stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
                stream.on('error', (err) => reject(err));
                stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
            })
        }

        filedata = await streamToString()

        console.log({ filedata })
    } else {
        if (response !== null) {
            filedata = file
        }
    }

    return { fileName, data: filedata }
}

module.exports = {
    getFileData
}