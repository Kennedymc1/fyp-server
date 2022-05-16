const { gql } = require("apollo-server-express");

module.exports = gql`
  
   type Sensors{
      time:String
      date:String
      humidity:String
      temperature:String

   }

`