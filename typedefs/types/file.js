const { gql } = require("apollo-server-express");

module.exports = gql`
  
   type File{
      name: String,
      data: String,
      contentType: String,
   }

`