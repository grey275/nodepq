const knex  = require('knex');
const settings =  require('./settings');
const moment = require('moment');

const knexConfig = {
  client: 'pg',
  connection: settings,
};

const nameToQuery = process.argv[2]

const config = {
  table_name: 'famous_people',
  date_format: 'YYYY-MM-DD',
};

const formatResult = (rows) => {
  const rowResults = rows.map(formatPersonResult)
  const lines = [
    `Found ${rows.length} person(s) by the name '${nameToQuery}': `,
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

(async () => {
  const rows = await getRowsWithName(config.table_name, nameToQuery)
  console.log(formatResult(rows));
})();
