const { gql } = require("apollo-server-express");

module.exports = gql`
  
   type Settings{
      facemaskMode: Boolean

   }

   input SettingsInput {
      facemaskMode: Boolean

   }

`