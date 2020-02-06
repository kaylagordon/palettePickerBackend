exports.up = function(knex) {
  return knex.schema.table('palettes', table => {
    table.string('name');
  })
};

exports.down = function(knex) {
  return knex.schema.table('palettes', table => {
    table.dropColumn('name');
  })
};
