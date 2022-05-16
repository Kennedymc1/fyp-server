/*##########################################################
 *  place url to mongoDb database here
 ###########################################################*/

 const URL = `apaloanz.com`
const HTTP = `https://`
const baseUrl = `${HTTP}${URL}`


module.exports = {
  baseUrl,
  URL,
  HTTP,
  port: process.env.PORT || 4000 , 
}
 