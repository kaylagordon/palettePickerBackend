exports.seed = async knex => {
  await knex('projects').del()
  await knex('projects').insert();
};
