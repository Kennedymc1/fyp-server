const { gql } = require("apollo-server");

module.exports = gql`
  type Query {
    user: User
    isPasswordResetValid(token: String): Boolean
    isLoggedIn:Boolean
    sensorData: Sensors
    records: [Record]
    charts: Chart
    stats: Stat
    entries: [Entry]
    time: [Record]
    image: File
    entry(id: String): Entry
  }
`;

