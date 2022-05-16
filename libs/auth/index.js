const context = require("./context");
const userResolvers = require("./resolvers/userResolvers");
const secondaryUserResolvers = require("./resolvers/secondaryUserResolver");
const userTypeDef = require("./typedefs/user");



/**
 * to use this library do the following
 */

//define the following variables in the env file
/**
 
SENDGRID_API_KEY=
//the email address that password reset emails are sent from
SENDGRID_FROM_EMAIL=
//the url of the site
BASE_URL=

////////
//Add to the mutations type def the following

    register(user: UserInput): User
    login(user: UserInput): User
    changePassword(oldPassword: String,newPassword: String): User
    resetPassword(email: String):Int
    changeTokenPassword(token: String,password: String): User
    logout: Boolean 

//Add to the query type def the following

    user: User
    isPasswordResetValid(token: String): Boolean
    isLoggedIn:Boolean
 */

    

module.exports = {
    //1. add the context object to ApolloServer object
    context,
    //2. add the userResolver to the resolvers index
    userResolvers,
    //3. add the userTypeDef to the typedefs index
    userTypeDef,
    //4.[optional] add the secondaryUserResolver to the resolvers index if using secondary logins
    secondaryUserResolvers,
    
}