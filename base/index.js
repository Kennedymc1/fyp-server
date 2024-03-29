const { ApolloServer } = require('apollo-server');
const typeDefs = require('./typedefs');
const resolvers = require('./resolvers');
const db = require('./db')
const config = require('./config')
const dotenv = require('dotenv');

const { context } = require('./libs/auth');


dotenv.config();




/*##########################################################
 * to install all the needed dependencies,in cmd run npm install
 ###########################################################*/

process.env.PWD = process.cwd()

db.connect()

/**
 * SETTING UP APOLLO SERVER
 */
const server = new ApolloServer({
  cors: true,
  typeDefs,
  resolvers,
  context: context,

  playground: process.env.SERVER_PLAYGROUND,
});

 


server.listen(config.port, () => console.log(`🚀  Server ready at ${config.port}`))


