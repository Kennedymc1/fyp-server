const { gql } = require("apollo-server-express");

module.exports = gql`
  
   type Stat{
      peopleToday: Int,
      peopleYesterday: Int,
      people7Days: Int,
      people30Days: Int
   }

`