const palettesTestData = [
  {
    color1: '11111',
    color2: '222222',
    color3: '333333',
    color4: '444444',
    color5: '555555',
  },
  {
    color1: '1111a',
    color2: '22222a',
    color3: '33333a',
    color4: '44444a',
    color5: '55555a',
  },
  {
    color1: '1111b',
    color2: '22222b',
    color3: '33333b',
    color4: '44444b',
    color5: '55555b',
  }
];

exports.seed = async knex => {
  await knex('palettes').del()
  await knex('palettes').insert(palettesTestData);
};
