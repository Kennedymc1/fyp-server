const { gql } = require("apollo-server-express");

module.exports = gql`
  
   type Entry{
      _id: String
      time: String
      image: String
      temperature: String
      banned: Boolean
      age: String
      gender: String
   }

`