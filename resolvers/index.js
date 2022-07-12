

const sensorsResolvers = require('./sensorsResolvers');
const { userResolvers } = require('../libs/auth');
const statsResolvers = require('./statsResolvers');
const entryResolvers = require('./entryResolvers');




/*##########################################################
 * resolvers that are created should be added to this array
 ###########################################################*/
module.exports = [
    userResolvers,
    sensorsResolvers,
    statsResolvers,
    entryResolvers
];