const { gql } = require("apollo-server-express");

module.exports = gql`

type PermissionUser {
  _id: ID
  email:String
  viewOnly : Boolean
  emailSent: Boolean
}


input PermissionUserInput{
  _id: String
  email:String
  viewOnly : Boolean
}
`

