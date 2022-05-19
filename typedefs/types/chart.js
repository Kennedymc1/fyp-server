const { gql } = require("apollo-server-express");

module.exports = gql`
  
   type Chart{
      time:[String]
      date:[String]
      humidity:[String]
      temperature:[String]

   }

`