
const jwt = require("jsonwebtoken");

/**
 * get the user email address from the authorization token
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getEmail = ({req, res}) => {
    const token = req.header('Authorization')

    try {
        const { email } = jwt.verify(token, 'secret');
        return email
    } catch (e) {
        res.status(401).send({
            message: "INVALID ACCESS TOKEN"
        })
    }
}




module.exports = getEmail
