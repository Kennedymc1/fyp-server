const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    primaryUserEmail: String
    email: String!
    password: String!
    token: String
    isLoggedIn: Boolean!
  }

  input UserInput {
    email: String!
    password: String!
    platform: String
  }

  input ChangePasswordInput {
    oldPassword: String!
    newPassword: String!
  }
  
`

