

/**
 * ensures that the param is required
 * 
 * @param {*} res 
 * @param {Array} params array of the required params
 * @param {String} message a custom message to send if the params is not included
 * @returns 
 */
const validateParams = ({res, params,message}) => {
    let paramsValid = true

    params.map((queryParam) => {
        if (!queryParam) {
            paramsValid = false
        }
    })

    if (!paramsValid) {
        res.status(400).send({
            message: message ? message :`argument is Required`
        })
    }

    return paramsValid
}

module.exports = validateParams
