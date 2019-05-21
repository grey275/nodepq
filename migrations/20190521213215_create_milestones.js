
const table_name = 'milestones'
exports.up = function(knex, Promise) {
  return knex.schema.createTable(table_name, (table) => {
    table.increments('id').primary();
    table.string('description').notNull();
    table.string('date_achieved').notNull();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(table_name);
};
