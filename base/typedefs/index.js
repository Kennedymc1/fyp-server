const query = require("./query");
const mutation = require("./mutation");
const sensors = require("./types/sensors");
const record = require("./types/record");
const chart = require("./types/chart");
const stat = require("./types/stat");
const entry = require("./types/entry");
const file = require("./types/file");

const settings = require("./types/settings");





const { userTypeDef } = require("../libs/auth");





/*##########################################################
 * types that are created should be added to this array
 ###########################################################*/
module.exports = [
   query,
   mutation,
   userTypeDef,
   sensors,
   record,
   chart,
   stat,
   entry,
   file,
   settings
];
