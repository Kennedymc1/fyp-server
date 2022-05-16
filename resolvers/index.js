

const sensorsResolvers = require('./sensorsResolvers');
const { userResolvers } = require('../libs/auth');



/*##########################################################
 * resolvers that are created should be added to this array
 ###########################################################*/
module.exports = [
    userResolvers,
    sensorsResolvers
];