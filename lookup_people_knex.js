const knex  = require('knex');
const settings =  require('./settings');
const moment = require('moment');

const knexConfig = {
  client: 'pg',
  connection: settings,
};

const config = {
  table_name: 'famous_people',
  date_format: 'YYYY-MM-DD',
};

const formatResult = (rows, name) => {
  const rowResults = rows.map(formatPersonResult)
  const lines = [
    `Found ${rows.length} person(s) by the name '${name}': `,
    ...rowResults,
  ];
  return lines.join('\n');
}


const formatDate = (date) => moment(date).format(config.date_format);

const formatPersonResult = (row, index) => {
  const { first_name, last_name, birthdate } = row;
  return `- ${index + 1}: ${first_name} ${last_name}, born '${formatDate(birthdate)}'`;
}

// knex.select().from('')
const getRowsWithName = (tableName, name) => {
  console.log('name: ', name);
  return knex(knexConfig)(tableName)
    .select()
    // .then(rows => { console.log('rows: ', rows); })
    .where({ first_name: name })
    // .orWhere({ last_name: name })
    .catch(error => { throw error; });
};

const lookupPerson = async (name) => {
  const rows = await getRowsWithName(config.table_name, name);
  console.log(formatResult(rows, name));
};

/* If command line argument is given, look up that name.
   Else export as module. */
const nameToQuery = process.argv[2];
if (nameToQuery) {
  lookupPerson(nameToQuery)
} else {
  module.exports = { lookupPerson };
}

