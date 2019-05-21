
const table_name = 'famous_people'
exports.up = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists(table_name)
    .createTable(table_name, (table) => {
      table.increments('id').primary();
      table.string('first_name').notNull();
      table.string('last_name').notNull();
      table.date('birthdate').notNull();
    });
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable(table_name);
};
