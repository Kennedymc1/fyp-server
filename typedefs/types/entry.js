const { gql } = require("apollo-server-express");

module.exports = gql`
  
   type Entry{
      time: String
      image: File
   }

`