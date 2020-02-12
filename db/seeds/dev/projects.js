const projectsTestData = [
  { name: 'Natural', palettes: [
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
  ]
  },
  { name: 'Primary', palettes: [
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
  ] 
  },
  { name: 'Bright', palettes: [
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
  ] 
  }
];

const createProject = async (knex, project) => {
  const projectId = await knex('projects').insert({
    name: project.name
  }, 'id');

  let palettePromises = project.palettes.map(palette => {
    return createPalette(knex, {
      color1: palette.color1,
      color2: palette.color2,
      color3: palette.color3,
      color4: palette.color4,
      color5: palette.color5,
      project_id: projectId[0]
    });
  });
  return Promise.all(palettePromises);
};

const createPalette = (knex, palette) => {
  return knex('palettes').insert(palette);
}

exports.seed = async knex => {
  try {
    await knex('palettes').del();
    await knex('projects').del();
    let projectPromises = projectsTestData.map(project => {
      return createProject(knex, project);
    });
    return Promise.all(projectPromises);
  } catch (error) {
    console.log(error)
  }
};