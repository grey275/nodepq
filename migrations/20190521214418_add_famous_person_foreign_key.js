table_name = 'milestones';
foreign_id = 'famous_person_id';
exports.up = function(knex, Promise) {
  return knex.schema.table(table_name, (table) => {
    table.integer(foreign_id)
    table
      .foreign(foreign_id)
      .references('famous_people.id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable(table_name);
};
