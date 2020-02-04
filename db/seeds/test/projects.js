const projectsTestData = [
  { name: 'Natural' },
  { name: 'Primary' },
  { name: 'Bright' }
]

exports.seed = async knex => {
  await knex('projects').del()
  await knex('projects').insert(projectsTestData);
};
