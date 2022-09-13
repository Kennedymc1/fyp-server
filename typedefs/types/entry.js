const { gql } = require("apollo-server-express");

module.exports = gql`
  
   type Entry{
      _id: String
      time: String
      image: File
      temperature: String
   }

`