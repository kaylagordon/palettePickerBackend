exports.up = function (knex) {
  return knex.schema
    .createTable('projects', function (table) {
      table.increments('id').primary();
      table.string('name');
      table.timestamps(true, true);
    })
    .createTable('palettes', function (table) {
      table.increments('id').primary();
      table.integer('project_id').unsigned()
      table.foreign('project_id')
      .references('projects.id');
      table.string('color1');
      table.string('color2');
      table.string('color3');
      table.string('color4');
      table.string('color5');
      table.timestamps(true, true);
    })
};

exports.down = function (knex) {
  return knex.schema
    .dropTable('palettes')
    .dropTable('projects')
};
