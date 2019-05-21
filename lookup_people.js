const { Client } = require('pg');
const settings =  require('./settings');

const nameToQuery = process.argv[2];

const client = new Client(settings);

const config = {
  table_name: 'famous_people',
};

const formatResult = (res) => {
  const { rows } = res;
  const rowResults = rows.map(formatPersonResult)
  const lines = [
    `Found ${rows.length} person(s) by the name '${nameToQuery}': `,
    ...rowResults,
  ];
  return lines.join('\n');
}

const formatPersonResult = (row, index) => {
  const { first_name, last_name, birthdate } = row;
  return `- ${index + 1}: ${first_name} ${last_name}, born '${birthdate}'`;
}

const query = `
  SELECT * from ${config.table_name}
    WHERE first_name = $1 OR last_name = $1;
  `;

(async () => {
  await client.connect();
  console.log('Searching ...');
  const res = await client.query(query, [nameToQuery]);
  console.log(formatResult(res));
  await client.end();
})();
