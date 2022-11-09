const { gql } = require('apollo-server');

//todo on reset password send email with confirmation code

module.exports = gql`
  type Mutation {
    register(user: UserInput): User
    login(user: UserInput): User
    changePassword(password: ChangePasswordInput): User
    resetPassword(email: String): Int
    changeTokenPassword(token: String, password: String): User
    logout: Boolean
    
    banEntry(id: String,banned: Boolean): Boolean
    setSettings(settings: SettingsInput): Boolean
  }
`;
