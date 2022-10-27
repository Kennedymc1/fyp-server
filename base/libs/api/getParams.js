
/**
 * get an object containing all the params
 * @param {*} req 
 * @returns 
 */
const getParams = (req) => {

    const q = req.query

    if (Object.keys(q).length === 0) {
        
        console.log({ body: req.body })
        return req.body
    } else {
        return q
    }


}

module.exports = getParams