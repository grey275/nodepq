const knex = require('knex');

const settings = require('./settings');
const { formatPersonResult } = require('./lookup_people_knex');

const knexConfig = {
  client: 'pg',
  connection: settings,
};

const config = {
  table_name: 'famous_people',
  date_format: 'YYYY-MM-DD',
};

const insertPerson = async (person) => {
  await knex(knexConfig)(config.table_name)
    .insert(person)
}

const makePersonFromArgs = (args) => {
  [first_name, last_name, birthdate] = args;
  return { first_name, last_name, birthdate: new Date(birthdate) };
}

const chungus = {
  first_name: 'Big',
  last_name: 'Chungus',
  birthdate: new Date(),
};

const args = process.argv.slice(2);

const person = args ? makePersonFromArgs(args) : chungus;

(async () => {
  await insertPerson(person);
  console.log('adding ', formatPersonResult(person, 0));
})();